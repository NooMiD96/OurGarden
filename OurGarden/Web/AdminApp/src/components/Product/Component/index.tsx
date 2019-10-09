import React, { createRef } from "react";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import Button from "@src/core/antd/Button";
import { confirm } from "@src/core/antd/Modal";
import { EditModal } from "./EditModal";
import Spin from "@core/antd/Spin";

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
      headerName: "Продукт",
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
    this.props.getProductList();
    this.props.getCategoryDictionary();
  }

  onDoubleClickHandler = (data: IProduct) => {
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
        let data = this.gridRef.current!.state.gridApi.getSelectedRows() as IProduct[];
        const { categoryId, subcategoryId, productId } = data[0];

        this.props.removeProduct(categoryId, subcategoryId, productId);
      }
    });
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
