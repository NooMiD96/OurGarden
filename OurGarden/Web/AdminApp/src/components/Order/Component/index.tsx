import React, { createRef } from "react";

import { TState, TComponentState } from "../TState";
import { IOrder, IOrderDTO } from "../State";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import Button from "@src/core/antd/Button";
import { confirm } from "@src/core/antd/Modal";
import { EditModal } from "./EditModal";
import Spin from "@core/antd/Spin";

export class Order extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    editItem: null,
    showModal: false
  };
  gridRef: React.RefObject<AgGrid<IOrder>> = createRef();

  columns = [
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
      field: "date"
    },
    {
      headerName: "Стоимость",
      field: "totalprice"
    },
    {
      headerName: "Статус",
      field: "status"
    }
  ];

  componentDidMount() {
    this.props.getOrderList();
  }

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

  onAddNewItemClickHandler = () => {
    this.setState({
      editItem: null,
      showModal: true
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
    const { errorInner, cleanErrorInner, listItem, pending } = this.props;
    const { showModal, editItem } = this.state;
    debugger;

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
        <div className="buttons-control">
          <Button type="danger" onClick={this.onRemoveClickHandler}>
            Удалить
          </Button>
        </div>
        <AgGrid
          ref={this.gridRef}
          columns={this.columns}
          rowData={listItem}
          onDoubleClickHandler={this.onDoubleClickHandler}
        />
        <EditModal
          isShow={showModal}
          item={editItem as IOrder}
          handleCreateSubmit={this.handleCreateSubmit}
          handleClose={this.handleClose}
        />
      </Spin>
    );
  }
}
