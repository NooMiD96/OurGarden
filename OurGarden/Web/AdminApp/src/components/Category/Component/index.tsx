import React, { createRef } from "react";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import GridButtonsControl from "@core/components/GridButtonsControl";
import { confirm } from "@src/core/antd/Modal";
import { EditModal } from "./EditModal";
import Spin from "@core/antd/Spin";

import { ColDef } from "ag-grid-community";
import { TState, TComponentState } from "../TState";
import { ICategory, ICategoryDTO } from "../State";

export class Category extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    editItem: null,
    showModal: false
  };
  gridRef: React.RefObject<AgGrid<ICategory>> = createRef();

  columns: ColDef[] = [
    {
      headerName: "Категория",
      field: "alias"
    },
    {
      headerName: "Видна пользователю",
      field: "isVisible",
      type: ["bool"]
    }
  ];

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList = () => {
    this.props.getCategoryList();
  };

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
        this.props.removeCategory(data[0].categoryId);
      }
    });
  };

  onAddNewItemClickHandler = () => {
    this.setState({
      editItem: null,
      showModal: true
    });
  };

  handleCreateSubmit = (data: ICategoryDTO) => {
    this.props.AddOrUpdateCategory(data);
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
          onRefresh={this.getCategoryList}
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
          item={editItem}
          handleCreateSubmit={this.handleCreateSubmit}
          handleClose={this.handleClose}
        />
      </Spin>
    );
  }
}
