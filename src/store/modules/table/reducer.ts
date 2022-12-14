import { ITableState } from "./types";
import { Reducer } from 'redux';
import produce from "immer";

export const table: Reducer<ITableState> = (state = { rows: [] }, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'ADD_UNIVERSITY_TO_TABLE': {
                console.log(state);
                if (state.rows.length !== 0) {
                    draft.rows.push(draft.rows[0]);
                } else {
                    draft.rows = [];
                }
                break;
            }
            case 'GET_UNIVERSITIES_FROM_API':
                console.log(action.payload.universities);
                draft.rows = action.payload.universities;
                break;
            case 'DELETE_UNIVERSITY_FROM_TABLE': {
                console.log(state);
                if (state.rows.length !== 0) {
                    draft.rows.pop();
                } else {
                    draft.rows = [];
                }
                break;
            }
            default:
                draft.rows = [];
        }
    });
}