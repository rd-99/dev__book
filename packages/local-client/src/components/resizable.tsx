import { ResizableBox ,ResizableBoxProps} from "react-resizable";
import { useEffect,useState } from "react";
interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
  }
  
const Resizable:React.FC<ResizableProps> = ({direction,children}) => {
    let resizeableProps: ResizableBoxProps ;
    const [innerHeight,  setInnerHeight] = useState(window.innerHeight);
    const [innerWidth,  setInnerWidth] = useState(window.innerWidth);
    const [width, setwidth]  = useState(window.innerWidth * 0.75);

    useEffect( () => {
        let timer:any ;
        const listener = () => {
            if(timer){
             clearTimeout(timer);   
            }

            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight) ;
                setInnerWidth(window.innerWidth);  
                if (window.innerWidth *0.75 < width){
                    setwidth(window.innerWidth * 0.75);
                }
            }, 100);
                      
        };
        window.addEventListener('resize' , listener);

        return () => {
            window.removeEventListener('resize' , listener);
        };
    } , [width]);

    
    if(direction === 'horizontal'){
        resizeableProps = {
            className: 'resize-horizontal',
            minConstraints: [innerWidth*0.2 , Infinity],
            maxConstraints: [innerWidth*0.75, Infinity],
            height :Infinity ,
            width , //  === width: width
            resizeHandles : ['e'],
            onResizeStop: (event, data) => {
                setwidth(data.size.width)
            }
        };
    }
    else{
        resizeableProps = {
            minConstraints: [Infinity , 48],
            maxConstraints: [Infinity, innerHeight*0.9],
            height :300 ,
            width :Infinity,
            resizeHandles : ['s'],
        };
    }

        return <ResizableBox
        {...resizeableProps}        
         >{children}
         </ResizableBox>
};

export default Resizable;