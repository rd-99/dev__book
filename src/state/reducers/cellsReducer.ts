import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import produce from "immer";


interface CellsState {
    loading: boolean;
    error: string | null ;
    order: string[];
    data: {
        [key: string] : Cell;
    };
    isOn: boolean
}

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {},
    isOn: true
};

const reducer = produce(
    (
    state: CellsState = initialState,action: Action
    ): CellsState | void => {    ////////////Doubt   
               
        switch (action.type) {
        
        case ActionType.SAVE_CELLS_ERROR:
            state.error = action.payload;
            return state;

        case ActionType.FETCH_CELLS:
            state.loading = true;
            state.error = null;
            return state;

        case ActionType.FETCH_CELLS_COMPLETE:
            state.order = action.payload.map(cell => cell.id);
            state.data = action.payload.reduce((acc, cell) => {
                acc[cell.id] = cell;
                return acc;
            } , {} as CellsState['data'])
            return state;

        case ActionType.FETCH_CELLS_ERROR:
            state.loading = false;
            state.error = action.payload;
            return state;

        case ActionType.UPDATE_CELL:
            const { id, content} = action.payload;
            state.data[id].content = content;
            
            return state;
            // return {
            //     ...state,
            //     data: {
            //         ...state.data,
            //         [action.payload.id]: {
            //             ...state.data[action.payload.id],
            //             content: action.payload.content
            //         }
            //-----------------------------------------------------------------------------
            // const { id, content} = action.payload;
            // return {
            //     ...state,
            //     data: {
            //         ...state.data,
            //         [id]: {
            //             ...state.data[id],
            //             content,
            //         },
            //     },                          
            // };

        case ActionType.DELETE_CELL:
            delete state.data[action.payload];
            state.order = state.order.filter((id) => id !== action.payload)
            return state ;

        case ActionType.INCLUDE_CELL_GLOBAL:
            
            return state;

        case ActionType.MOVE_CELL:
            const {direction} = action.payload;
            const index = state.order.findIndex((id) => id === action.payload.id);
            const targetindex = direction === 'up' ? index - 1 : index + 1 ;
            if ( targetindex < 0 || targetindex > state.order.length - 1 ){
                return state;
            } 
            state.order[index] = state.order[targetindex];
            state.order[targetindex] = action.payload.id
            return state;
        
        case ActionType.INSERT_CELL_AFTER:
            const cell: Cell = {
                content: '',
                type: action.payload.type,
                id:randomID(),
            };
            state.data[cell.id] = cell;
            const foundIndex = state.order.findIndex(id => id===action.payload.id);
            

            if(foundIndex < 0){
                state.order.unshift(cell.id);
            }else{
                state.order.splice(foundIndex + 1, 0,cell.id);
            }

            return state;
            
            default:
            return state; 
                 
    };   
}, initialState);

const randomID = () => {
    return Math.random().toString(36).substr(2,5);
}

export default reducer;