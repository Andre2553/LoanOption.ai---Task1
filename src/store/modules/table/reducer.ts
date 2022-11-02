import { ITableState } from "./types";
import { Reducer } from 'redux';

export const table: Reducer<ITableState> = (state = { rows: [] }, action) => {
    switch (action.type) {
        case 'ADD_UNIVERSITY_TO_TABLE':
            return state
         case 'GET_UNIVERSITIES_FROM_API':
            return state;
            case 'DELETE_UNIVERSITY_FROM_TABLE': {
            }
        default:
            return state;
    }
}