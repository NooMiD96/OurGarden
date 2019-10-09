import { GridApi, ColDef } from "ag-grid-community";

import { ICategoryDictionary } from "@components/Category/State";

export interface IAgGridProps<T> {
  columns: ColDef[];
  rowData: T[];
  onDoubleClickHandler?: (data: T) => void;
  readOnly?: boolean;
  categoryList?: ICategoryDictionary[];
}

export interface IAgGridState {
  gridApi: GridApi;
  columns: ColDef[];
}
