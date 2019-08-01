import React, { createRef } from "react";

import { TState, TComponentState } from "../TState";
import { ICategory, ICategoryDTO } from "../State";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import Button from "@src/core/antd/Button";
import { confirm } from "@src/core/antd/Modal";
import { EditModal } from "./EditModal";
import message from "@src/core/antd/message";

export class Category extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    editItem: null,
    showModal: false
  };
  gridRef: React.RefObject<AgGrid<ICategory>> = createRef();

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
        let data = this.gridRef.current!.state.gridApi.getSelectedRows() as ICategory[];
        this.props.RemoveCategory(data[0].categoryId, this.onSubmitError);
      }
    });
  };

  onAddNewItemClickHandler = () => {
    this.setState({
      editItem: null,
      showModal: true
    });
  };

  onSubmitError = () => message.error("Ошибка!");
  onSubmitSuccess = () => message.success("Успешно сохранено!");

  handleCreateSubmit = (data: ICategoryDTO) => {
    this.props.AddOrUpdateCategory(
      data,
      this.onSubmitSuccess,
      this.onSubmitError
    );
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
          handleCreateSubmit={this.handleCreateSubmit}
          handleClose={this.handleClose}
        />
      </React.Fragment>
    );
  }
}
