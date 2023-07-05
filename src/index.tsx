import ReactDOM from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
//import CodeCell from './components/code-cell';
//import TextEditor from './components/text-editor';
import { store } from './state';
import { Provider } from 'react-redux';
import CellList from './components/cell-list';
//import CellListItem from './components/cell-list-item';

const App = () => {
  
  return (
    <Provider store = {store}>
      <div>
       {/* <CodeCell/> 
      <TextEditor/>     */}
      <CellList />   
    </div>
    </Provider>    
  );
};



ReactDOM.render(<App />, document.querySelector('#root'));
