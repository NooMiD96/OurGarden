import React, { createRef } from "react";

import { TState, TComponentState } from "../TState";
import { ICategoryItem } from "../State";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import Button from "@src/core/antd/Button";
import { confirm } from "@src/core/antd/Modal";
import { EditModal } from "./EditModal";

export class Category extends React.PureComponent<TState, TComponentState> {
  gridRef: React.RefObject<AgGrid<ICategoryItem>> | null = createRef();
  columns = [
    {
      headerName: "Заголовок",
      field: "field"
    }
  ];
  rowData: ICategoryItem[] = [{} as ICategoryItem];

  state: TComponentState = {
    editItem: null,
    showModal: false
  };

  onDoubleClickHandler = (data: ICategoryItem) => {
    this.setState({
      editItem: data,
      showModal: true
    });
  };

  onRemoveClickHandler = () => {
    confirm({
      title: "Удалить выбранные категории?",
      content:
        "После удаления востановить их уже не удастся. Вы уверены что хотите удалить выбранные категории?",
      okText: "Да",
      okType: "danger",
      cancelText: "Отмена",
      type: "confirm",
      onOk: () => {
        // Через state.gridApi получить selectedItems
        this.gridRef;
      }
    });
  };

  onAddNewItemClickHandler = () => {
    this.setState({
      editItem: null,
      showModal: true
    });
  };

  render() {
    const { errorInner, cleanErrorInner } = this.props;
    const { showModal, editItem } = this.state;

    return (
      <React.Fragment>
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
          <Button type="primary" onClick={this.onAddNewItemClickHandler}>
            Добавить
          </Button>
          <Button type="danger" onClick={this.onRemoveClickHandler}>
            Удалить
          </Button>
        </div>
        <AgGrid
          ref={this.gridRef}
          columns={this.columns}
          rowData={this.rowData}
          onDoubleClickHandler={this.onDoubleClickHandler}
        />
        <EditModal isShow={showModal} item={editItem} />
      </React.Fragment>
    );
  }
}
