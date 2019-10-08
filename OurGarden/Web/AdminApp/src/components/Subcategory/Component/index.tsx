import React, { createRef } from "react";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import Button from "@src/core/antd/Button";
import { confirm } from "@src/core/antd/Modal";
import { EditModal } from "./EditModal";
import Spin from "@core/antd/Spin";

import { ColDef } from "ag-grid-community";
import { TState, TComponentState } from "../TState";
import { ISubcategory, ISubcategoryDTO } from "../State";

export class Subcategory extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    editItem: null,
    showModal: false
  };
  gridRef: React.RefObject<AgGrid<ISubcategory>> = createRef();

  columns: ColDef[] = [
    {
      headerName: "Категория",
      field: "categoryId",
      type: ["idField"]
    },
    {
      headerName: "Подкатегория",
      field: "alias"
    },
    {
      headerName: "Видна пользователю",
      field: "isVisible",
      type: ["bool"]
    }
  ];

  componentDidMount() {
    this.props.getSubcategoryList();
  }

  onDoubleClickHandler = (data: ISubcategory) => {
    this.setState({
      editItem: data,
      showModal: true
    });
  };

  onRemoveClickHandler = () => {
    confirm({
      title: "Удалить выбранные подкатегории?",
      content:
        "После удаления востановить их уже не удастся. Вы уверены что хотите удалить выбранные подкатегории?",
      okText: "Да",
      okType: "danger",
      cancelText: "Отмена",
      type: "confirm",
      onOk: () => {
        let data = this.gridRef.current!.state.gridApi.getSelectedRows() as ISubcategory[];
        this.props.RemoveSubcategory(data[0].categoryId, data[0].subcategoryId);
      }
    });
  };

  onAddNewItemClickHandler = () => {
    this.setState({
      editItem: null,
      showModal: true
    });
  };

  handleCreateSubmit = (data: ISubcategoryDTO) => {
    this.props.AddOrUpdateSubcategory(data);
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
      subcategoriesList: subcategoriesList,
      categoriesList: categoriesList,
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
          rowData={subcategoriesList}
          onDoubleClickHandler={this.onDoubleClickHandler}
        />
        <EditModal
          isShow={showModal}
          item={editItem}
          dropdownData={categoriesList}
          handleCreateSubmit={this.handleCreateSubmit}
          handleClose={this.handleClose}
        />
      </Spin>
    );
  }
}
