import React, { createRef } from "react";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import GridButtonsControl from "@core/components/GridButtonsControl";
import { confirm } from "@src/core/antd/Modal";
import Spin from "@core/antd/Spin";

import { EditModal } from "./EditModal";

import { ColDef } from "ag-grid-community";

import { TState, TComponentState } from "../TState";
import { IOrder, IOrderDTO } from "../State";

export class Order extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    editItem: null,
    showModal: false
  };
  gridRef: React.RefObject<AgGrid<IOrder>> = createRef();

  columns: ColDef[] = [
    {
      headerName: "Номер заказа",
      field: "orderId",
      type: ["number"]
    },
    {
      headerName: "ФИО",
      field: "fio"
    },
    {
      headerName: "Телефон",
      field: "phone"
    },
    {
      headerName: "E-mail",
      field: "email"
    },
    {
      headerName: "Дата",
      field: "date",
      type: ["date"]
    },
    {
      headerName: "Стоимость",
      field: "totalPrice",
      type: ["number"]
    },
    {
      headerName: "Статус",
      field: "status",
      type: ["orderStatus"]
    }
  ];

  componentDidMount() {
    this.getOrderList();
  }

  getOrderList = () => {
    this.props.getOrderList();
  };

  onDoubleClickHandler = (data: IOrder) => {
    this.setState({
      editItem: data,
      showModal: true
    });
  };

  onRemoveClickHandler = () => {
    confirm({
      title: "Удалить выбранный заказ?",
      content:
        "После удаления востановить его уже не удастся. Вы уверены что хотите удалить выбранный заказ?",
      okText: "Да",
      okType: "danger",
      cancelText: "Отмена",
      type: "confirm",
      onOk: () => {
        let data = this.gridRef.current!.state.gridApi.getSelectedRows() as IOrder[];
        this.props.RemoveOrder(data[0].orderId);
      }
    });
  };

  handleCreateSubmit = (data: IOrderDTO) => {
    this.props.UpdateOrder(data);
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
    const {
      errorInner,
      cleanErrorInner,
      listItem,
      statusList,
      pending
    } = this.props;
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
          onRefresh={this.getOrderList}
          onRemove={this.onRemoveClickHandler}
        />
        <AgGrid
          ref={this.gridRef}
          columns={this.columns}
          rowData={listItem}
          onDoubleClickHandler={this.onDoubleClickHandler}
        />
        <EditModal
          isShow={showModal}
          item={editItem as IOrder}
          statusList={statusList}
          handleCreateSubmit={this.handleCreateSubmit}
          handleClose={this.handleClose}
        />
      </Spin>
    );
  }
}
