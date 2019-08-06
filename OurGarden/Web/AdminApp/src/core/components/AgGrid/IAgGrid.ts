import { GridApi, ColDef } from "ag-grid-community";

export interface IAgGridProps<T> {
  columns: ColDef[];
  rowData: T[];
  onDoubleClickHandler?: (data: T) => void;
  readOnly?: boolean;
}

export interface IAgGridState {
  gridApi: GridApi;
  columns: ColDef[];
}
