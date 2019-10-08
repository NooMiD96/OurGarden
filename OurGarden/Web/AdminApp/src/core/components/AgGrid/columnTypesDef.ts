import moment from "moment";
import { ColDef } from "ag-grid-community";

import ActionRenderer from "./cellRenderers/ActionRenderer";

import { dateComparator } from "@src/core/helpers/AgGrid";
import { IOrderStatus } from "@src/components/Order/State";

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
    suppressToolPanel: true
  },
  actionColumn: {
    cellRendererFramework: ActionRenderer,
    checkboxSelection: false,
    editable: false,
    sortable: false,
    filter: false,
    resizable: false,
    suppressMenu: true,
    suppressSizeToFit: true,
    suppressMovable: true,
    suppressNavigable: true,
    suppressToolPanel: true
  },
  number: {
    filter: "agNumberColumnFilter"
  },
  date: {
    filter: "agDateColumnFilter",
    valueGetter: params => {
      const value = params.data[params.colDef.field!] as string;
      return moment(value).format("DD.MM.YYYY HH:mm:ss");
    },
    filterParams: {
      browserDatePicker: true
    },
    comparator: dateComparator
  },
  bool: {
    filter: false,
    valueGetter: params => {
      const value = params.data[params.colDef.field!] as boolean;
      return value ? "Да" : "Нет";
    }
  },
  orderStatus: {
    valueGetter: params => {
      const value = params.data[params.colDef.field!] as IOrderStatus;
      return value.name;
    }
  },
  idField: {
    valueGetter: params => {
      const {
        colDef: { field },
        data
      } = params;
      const idValue = data[field!];
      const value = idValue.replace(/-/g, " ");
      return `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`;
    }
  }
};

const defaultColDef: ColDef = {
  sortable: true,
  resizable: true,
  filter: true
};

export { columnTypesDef, defaultColDef };
