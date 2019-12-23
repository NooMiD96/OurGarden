import moment from "moment";

import ActionRenderer from "./cellRenderers/ActionRenderer";

import { dateComparator } from "@src/core/helpers/AgGrid";
import {
  parseIdField,
  parseCategoryIdField,
  parseSubcategoryIdField
} from "./utils";

import { ColDef } from "ag-grid-community";
import { IOrderStatus } from "@src/components/Order/State";
import { IAgGridProps } from "./IAgGrid";

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
      browserDatePicker: true,
      newRowsAction: "keep"
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

  categoryId: {
    valueGetter: params => {
      const {
        colDef: { field },
        data,
        context: { parentComponent }
      } = params;

      return parseCategoryIdField(
        field!,
        data,
        (parentComponent.props as IAgGridProps<any>).categoryList
      );
    }
  },

  subcategoryId: {
    valueGetter: params => {
      const {
        colDef: { field },
        data,
        context: { parentComponent }
      } = params;

      return parseSubcategoryIdField(
        field!,
        data,
        (parentComponent.props as IAgGridProps<any>).categoryList
      );
    }
  },

  idField: {
    valueGetter: params => {
      const {
        colDef: { field },
        data
      } = params;

      return parseIdField(field!, data);
    }
  }
};

const defaultColDef: ColDef = {
  sortable: true,
  resizable: true,
  filter: true,
  filterParams: { newRowsAction: "keep" }
};

export { columnTypesDef, defaultColDef };
