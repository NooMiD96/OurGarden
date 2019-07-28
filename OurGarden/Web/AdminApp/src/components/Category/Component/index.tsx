import React, { createRef } from "react";

import { TState, TComponentState } from "../TState";
import { ICategory, ICategoryDTO } from "../State";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import Button from "@src/core/antd/Button";
import { confirm } from "@src/core/antd/Modal";
import { EditModal } from "./EditModal";

export class Category extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    editItem: null,
    showModal: false
  };
  gridRef: React.RefObject<AgGrid<ICategory>> | null = createRef();

  columns = [
    {
      headerName: "Категория",
      field: "alias"
    }
  ];

  componentDidMount() {
    this.props.getCategoryList();
  }

  onDoubleClickHandler = (data: ICategory) => {
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

  handleSubmit = (data: ICategoryDTO) => {
    debugger;
    this.props.AddCategory(data);
    console.log(data.alias + data.url);
  };

  handleClose = () => {
    debugger;
    this.setState({
      editItem: null,
      showModal: false
    });
  };

  render() {
    const { errorInner, cleanErrorInner, listItem } = this.props;
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
          rowData={listItem}
          onDoubleClickHandler={this.onDoubleClickHandler}
        />
        <EditModal
          isShow={showModal}
          item={editItem}
          handleSubmit={this.handleSubmit}
          handleClose={this.handleClose}
        />
      </React.Fragment>
    );
  }
}
