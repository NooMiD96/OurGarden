import React, { createRef } from "react";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import Button from "@src/core/antd/Button";
import { confirm } from "@src/core/antd/Modal";
import { EditModal } from "./EditModal";
import Spin from "@core/antd/Spin";

import { ColDef } from "ag-grid-community";
import { TState, TComponentState } from "../TState";
import { INews, INewsDTO } from "../State";

class News extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    editItem: null,
    showModal: false
  };
  gridRef: React.RefObject<AgGrid<INews>> = createRef();

  columns: ColDef[] = [
    {
      headerName: "Заголовок",
      field: "title"
    },
    {
      headerName: "Дата",
      field: "date",
      type: ["date"],
    }
  ];

  componentDidMount() {
    this.props.getNewsList();
  }

  onDoubleClickHandler = (data: INews) => {
    this.setState({
      editItem: data,
      showModal: true
    });
  };

  onRemoveClickHandler = () => {
    confirm({
      title: "Удалить выбранные новости?",
      content:
        "После удаления востановить их уже не удастся. Вы уверены, что хотите удалить выбранные новости?",
      okText: "Да",
      okType: "danger",
      cancelText: "Отмена",
      type: "confirm",
      onOk: () => {
        let data = this.gridRef.current!.state.gridApi.getSelectedRows() as INews[];
        const { newsId } = data[0];

        this.props.removeNews(newsId);
      }
    });
  };

  onAddNewItemClickHandler = () => {
    this.setState({
      editItem: null,
      showModal: true
    });
  };

  handleCreateSubmit = (data: INewsDTO) => {
    this.props.addOrUpdateNews(data);
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
          item={editItem}
          isShow={showModal}
          handleCreateSubmit={this.handleCreateSubmit}
          handleClose={this.handleClose}
        />
      </Spin>
    );
  }
}

export default News;
