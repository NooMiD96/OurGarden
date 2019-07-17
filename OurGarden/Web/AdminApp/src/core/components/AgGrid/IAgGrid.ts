import { GridApi, ColDef } from "ag-grid-community";

export interface IAgGridProps<T> {
  columns: ColDef[];
  rowData: T[];
  onDoubleClickHandler: (data: T) => void;
}

export interface IAgGridState {
  gridApi: GridApi;
  columns: ColDef[];
}
