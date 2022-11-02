export interface IUniversity{
   domains: string[];
   alpha_two_code: string;
   web_pages: string[];
   country: string;
   name: string;
   state_province?: string;
}

export interface ITableState{
   rows: IUniversity[];
}