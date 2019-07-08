import React, { useState } from "react";

import { AgGridReact } from 'ag-grid-react';
import { GridApi, ColDef, GridReadyEvent } from "ag-grid-community";
import columnTypesDef from "./columnTypesDef";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

interface IAgGridProps<T> {
  columns: ColDef[];
  rowData: T[];
  onDoubleClickHandler: (data: T) => void;
}

const AgGrid: <T>(props: IAgGridProps<T>) => JSX.Element = (props) => {
  const [gridApi, setGridApi] = useState(null as null | GridApi);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    params.columnApi.autoSizeAllColumns();
  }

  const columns: ColDef[] = [
    { headerName: "Выбор", field: "select", type: ['selectColumn'], width: 65, },
    ...props.columns,
    { headerName: "Действие", field: "action", type: ['actionColumn'], width: 150, }
  ];

  return (
    <div
      className="ag-theme-balham"
      style={{
        height: '100%',
        width: '100%'
      }}
    >
      <AgGridReact
        columnDefs={columns}
        rowData={props.rowData}
        onGridReady={onGridReady}
        columnTypes={columnTypesDef}
        context={{
          componentProps: props
        }}
        onRowDoubleClicked={params => props.onDoubleClickHandler(params.data)}
      />
    </div>
  )
};

export default AgGrid;
