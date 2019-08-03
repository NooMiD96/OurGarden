import { ColDef } from "ag-grid-community";
import ActionRenderer from "./cellRenderers/ActionRenderer";

const columnTypesDef: { [key: string]: ColDef } = {
  selectColumn: {
    checkboxSelection: true,
    editable: false,
    sortable: false,
    filter: false,
    resizable: false,
    suppressMenu: true,
    suppressSizeToFit: true,
    suppressMovable: true,
    suppressNavigable: true,
    suppressToolPanel: true,
  },
  actionColumn: {
    cellRendererFramework: ActionRenderer,
    editable: false,
    sortable: false,
    filter: false,
    resizable: false,
    suppressMenu: true,
    suppressSizeToFit: true,
    suppressMovable: true,
    suppressNavigable: true,
    suppressToolPanel: true,
  },
  idField: {
    valueGetter: params => {
      const { colDef: { field }, data } = params;
      const idValue = data[field!];
      const value = idValue.replace(/-/g, " ");
      return `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`;
    }
  }
};

const defaultColDef: ColDef = {
  sortable: true,
  resizable: true,
  filter: true,
}

export {
  columnTypesDef,
  defaultColDef
};
