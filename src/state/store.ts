//import { code } from '@uiw/react-md-editor/lib/cjs/commands';
import  {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { ActionType } from './action-types';
import reducers from './reducers';
import { persistMiddleware} from './middlewares/persist-middleware';
import { createStore } from 'redux';

export const store = createStore(reducers , {} , applyMiddleware(persistMiddleware, thunk));


//console.log(store.getState());