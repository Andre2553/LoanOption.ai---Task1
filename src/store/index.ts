import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules/rootReducer";
import { ITableState } from "./modules/table/types";

export interface IState{
   table: ITableState
}

export const store = configureStore({reducer:rootReducer});