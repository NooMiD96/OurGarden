import React, { createRef } from "react";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import GridButtonsControl from "@core/components/GridButtonsControl";
import Spin from "@core/antd/Spin";

import { EditModal } from "./EditModal";

import { ColDef } from "ag-grid-community";
import { TState, TComponentState } from "../TState";
import { IProduct, IProductDTO } from "../State";

class Product extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    editItem: null,
    showModal: false
  };
  gridRef: React.RefObject<AgGrid<IProduct>> = createRef();

  columns: ColDef[] = [
    {
      headerName: "Категория",
      field: "categoryId",
      type: ["categoryId"]
    },
    {
      headerName: "Подкатегория",
      field: "subcategoryId",
      type: ["subcategoryId"]
    },
    {
      headerName: "Товар",
      field: "alias"
    },
    {
      headerName: "Цена",
      field: "price"
    },
    {
      headerName: "Видна пользователю",
      field: "isVisible",
      type: ["bool"]
    }
  ];

  componentDidMount() {
    this.getProductList();
  }

  getProductList = () => {
    this.props.getProductList();
    this.props.getCategoryDictionary();
  };

  onDoubleClickHandler = (data: IProduct) => {
    this.setState({
      editItem: data,
      showModal: true
    });
  };

  onRemoveClickHandler = (data: IProduct[]) => {
    const { categoryId, subcategoryId, productId } = data[0];
    this.props.removeProduct(categoryId, subcategoryId, productId);
  };

  onAddNewItemClickHandler = () => {
    this.setState({
      editItem: null,
      showModal: true
    });
  };

  handleCreateSubmit = (data: IProductDTO) => {
    this.props.addOrUpdateProduct(data);
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
      categoryList,
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
          removeTitle="выбранные товары"
          onRefresh={this.getProductList}
          onRemove={this.onRemoveClickHandler}
        />
        <AgGrid
          ref={this.gridRef}
          columns={this.columns}
          rowData={listItem}
          onDoubleClickHandler={this.onDoubleClickHandler}
          categoryList={categoryList}
        />
        <EditModal
          item={editItem}
          categoryList={categoryList}
          isShow={showModal}
          handleCreateSubmit={this.handleCreateSubmit}
          handleClose={this.handleClose}
        />
      </Spin>
    );
  }
}

export default Product;
