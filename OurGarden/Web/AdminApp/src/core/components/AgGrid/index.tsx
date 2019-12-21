import React from "react";

import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";

import { columnTypesDef, defaultColDef } from "./columnTypesDef";
import { IAgGridProps, IAgGridState } from "./IAgGrid";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export class AgGrid<T> extends React.PureComponent<
  IAgGridProps<T>,
  IAgGridState
> {
  state: IAgGridState = {
    columns: [],
    gridApi: {} as GridApi
  };

  componentDidMount() {
    const columns = [...this.props.columns];

    if (!this.props.readOnly) {
      columns.unshift({
        headerName: "Выбор",
        field: "select",
        type: ["selectColumn"],
        width: 65,
        checkboxSelection: true,
        suppressSizeToFit: true,
        pinned: "left"
      });
      columns.push({
        headerName: "Действие",
        field: "action",
        type: ["actionColumn"],
        width: 80,
        checkboxSelection: false,
        suppressSizeToFit: true,
        pinned: "right"
      });
    }

    this.setState({ columns });
  }

  onGridReady = (params: GridReadyEvent) => {
    this.setState({
      gridApi: params.api
    });
    params.api.sizeColumnsToFit();
  };

  render() {
    const { rowData, onDoubleClickHandler } = this.props;
    const { columns = [] } = this.state;

    return (
      <div className="ag-theme-balham">
        <AgGridReact
          columnDefs={columns}
          onRowDataUpdated={() => {
            this.state.gridApi.sizeColumnsToFit();
          }}
          rowData={rowData}
          onGridReady={this.onGridReady}
          columnTypes={columnTypesDef}
          defaultColDef={defaultColDef}
          onRowDoubleClicked={params =>
            onDoubleClickHandler && onDoubleClickHandler(params.data)
          }
          context={{
            parentComponent: this
          }}
          suppressScrollOnNewData
        />
      </div>
    );
  }
}

export default AgGrid;
