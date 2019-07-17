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
    cellRendererFramework: ActionRenderer
  }
};

const defaultColDef: { [key: string]: ColDef } = {

}

export {
  columnTypesDef,
  defaultColDef
};
