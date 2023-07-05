import { useEffect,} from 'react';
//import bundle from '../bundler';
import CodeEditor from './code-editor';
//import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from './preview';
import Resizable from './resizable';
import './resizeable.css';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-cell.css';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps{
  cell: Cell
}
const CodeCell:React.FC<CodeCellProps> = ({ cell }) => { 
  //const [input, setInput] = useState('');
  // const [code, setCode] = useState(''); 
  // const [err, setErr] = useState('');
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles && state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
          if(!bundle){
            createBundle(cell.id , cumulativeCode);
          return ;
          }


    const timer = setTimeout(async () => {
        //const output = await bundle(cell.content);
        // setCode(output.code);
        // setErr(output.err);      
        createBundle(cell.id, cumulativeCode)
    },1000);
    
    return () => {
        clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode , cell.id , createBundle]);

//   const onClick = async () => {
//     const output = await bundle(input);
//     //console.log(output,input);
//     setCode(output);
//   };

  return (
    <Resizable direction = 'vertical'>
        <div style={{height:'calc(100% - 10px)',
                     display: 'flex',
                      flexDirection: 'row' }}>
                        
            <Resizable direction = 'horizontal'>
                <CodeEditor 
                initialValue= {`//@include`} //{cell.content}
                onChange={(value) => updateCell(cell.id, value)}
                />      
      {/* <div><button onClick={onClick}>Submit</button></div> */}
            </Resizable>
            <div className='progress-wrapper'>
            {
              !bundle || bundle.loading
              ? (<div className='progress-cover'>
                <progress className= 'progress is-small is-primary' max="100">
                Loading
                </progress>             
              </div>)
              : (<Preview code={bundle.code} err = {bundle.err} />)
            }
            </div>               
        </div>
    </Resizable>
    
  );
};

export default CodeCell;