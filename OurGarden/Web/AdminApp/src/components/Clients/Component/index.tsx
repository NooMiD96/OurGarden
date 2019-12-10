import React, { createRef } from "react";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import GridButtonsControl from "@core/components/GridButtonsControl";
import { EditModal } from "./EditModal";
import Spin from "@core/antd/Spin";

import { ColDef } from "ag-grid-community";
import { TState, TComponentState } from "../TState";
import { IClient, IClientDTO } from "../State";

class Clients extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    editItem: null,
    showModal: false
  };
  gridRef: React.RefObject<AgGrid<IClient>> = createRef();

  columns: ColDef[] = [
    {
      headerName: "ФИО клиента",
      field: "fio"
    },
    {
      headerName: "Телефон",
      field: "phone"
    },
    {
      headerName: "Включен в рассылку",
      field: "isIncludeInMailing",
      type: ["bool"]
    },
    {
      headerName: "Почта",
      field: "email"
    }
  ];

  componentDidMount() {
    this.getClientList();
  }

  getClientList = () => {
    this.props.getClientList();
  };

  onDoubleClickHandler = (data: IClient) => {
    this.setState({
      editItem: data,
      showModal: true
    });
  };

  onRemoveClickHandler = (data: IClient[]) => {
    this.props.removeClient(data[0].clientId);
  };

  onAddNewItemClickHandler = () => {
    this.setState({
      editItem: null,
      showModal: true
    });
  };

  handleCreateSubmit = (data: IClientDTO) => {
    this.props.addOrUpdateClient(data);
    this.setState({
      editItem: null,
      showModal: false
    });
  };

  handleClose = () => {
    this.setState({
      editItem: null,
      showModal: false
    });
  };

  render() {
    const { errorInner, cleanErrorInner, clientList, pending } = this.props;
    const { showModal, editItem } = this.state;

    return (
      <Spin spinning={pending}>
        {errorInner && (
          <Alert
            message="Ошибка"
            description={errorInner}
            type="error"
            closable
            style={{ marginBottom: 10 }}
            onClose={cleanErrorInner}
          />
        )}
        <GridButtonsControl
          onAdd={this.onAddNewItemClickHandler}
          gridRef={this.gridRef}
          removeTitle="выбранных клиентов"
          onRefresh={this.getClientList}
          onRemove={this.onRemoveClickHandler}
        />
        <AgGrid
          ref={this.gridRef}
          columns={this.columns}
          rowData={clientList}
          onDoubleClickHandler={this.onDoubleClickHandler}
        />
        <EditModal
          item={editItem}
          isShow={showModal}
          handleCreateSubmit={this.handleCreateSubmit}
          handleClose={this.handleClose}
        />
      </Spin>
    );
  }
}

export default Clients;
