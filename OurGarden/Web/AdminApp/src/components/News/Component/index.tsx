import React, { createRef } from "react";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import GridButtonsControl from "@core/components/GridButtonsControl";
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
      field: "alias"
    },
    {
      headerName: "Дата",
      field: "date",
      type: ["date"]
    }
  ];

  componentDidMount() {
    this.getNewsList();
  }

  getNewsList = () => {
    this.props.getNewsList();
  };

  onDoubleClickHandler = (data: INews) => {
    this.setState({
      editItem: data,
      showModal: true
    });
  };

  onRemoveClickHandler = (data: INews[]) => {
    this.props.removeNews(data[0].newsId);
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
    const {
      errorInner, cleanErrorInner, listItem, pending
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
          removeTitle="выбранные новости"
          onRefresh={this.getNewsList}
          onRemove={this.onRemoveClickHandler}
        />
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
