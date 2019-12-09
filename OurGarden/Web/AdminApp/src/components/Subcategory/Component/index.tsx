import React, { createRef } from "react";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import GridButtonsControl from "@core/components/GridButtonsControl";
import Spin from "@core/antd/Spin";

import { EditModal } from "./EditModal";

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
      type: ["categoryId"]
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
    this.getSubcategoryList();
  }

  getSubcategoryList = () => {
    this.props.getSubcategoryList();
  };

  onDoubleClickHandler = (data: ISubcategory) => {
    this.setState({
      editItem: data,
      showModal: true
    });
  };

  onRemoveClickHandler = (data: ISubcategory[]) => {
    const { categoryId, subcategoryId } = data[0];
    this.props.removeSubcategory(categoryId, subcategoryId);
  };

  onAddNewItemClickHandler = () => {
    this.setState({
      editItem: null,
      showModal: true
    });
  };

  handleCreateSubmit = (data: ISubcategoryDTO) => {
    this.props.addOrUpdateSubcategory(data);
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
      subcategoriesList,
      categoriesList,
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
          onAdd={this.onAddNewItemClickHandler}
          gridRef={this.gridRef}
          removeTitle="выбранные подкатегории"
          onRefresh={this.getSubcategoryList}
          onRemove={this.onRemoveClickHandler}
        />
        <AgGrid
          ref={this.gridRef}
          columns={this.columns}
          rowData={subcategoriesList}
          onDoubleClickHandler={this.onDoubleClickHandler}
          categoryList={categoriesList}
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
