import { GridApi, ColDef } from "ag-grid-community";

import { IItemDictionary } from "@components/Category/State";

export interface IAgGridProps<T> {
  columns: ColDef[];
  rowData: T[];
  onDoubleClickHandler?: (data: T) => void;
  readOnly?: boolean;
  categoryList?: IItemDictionary[];
}

export interface IAgGridState {
  gridApi: GridApi;
  columns: ColDef[];
}
