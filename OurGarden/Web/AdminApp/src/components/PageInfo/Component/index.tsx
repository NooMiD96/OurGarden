import React, { createRef } from "react";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import GridButtonsControl from "@core/components/GridButtonsControl";
import Spin from "@core/antd/Spin";

import { EditModal } from "./EditModal";

import { ColDef } from "ag-grid-community";
import { TState, TComponentState } from "../TState";
import { IPageInfo, IPageInfoDTO } from "../State";

export class PageInfo extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    editItem: null,
    showModal: false,
  };

  gridRef: React.RefObject<AgGrid<IPageInfo>> = createRef();

  columns: ColDef[] = [
    {
      headerName: "Название",
      field: "alias",
    },
  ];

  componentDidMount() {
    this.getPageInfoList();
  }

  getPageInfoList = () => {
    this.props.getPageInfoList();
  };

  onDoubleClickHandler = (data: IPageInfo) => {
    this.setState({
      editItem: data,
      showModal: true,
    });
  };

  onRemoveClickHandler = (data: IPageInfo[]) => {
    this.props.removePageInfo(data[0].pageInfoId);
  };

  onAddNewItemClickHandler = () => {
    this.setState({
      editItem: null,
      showModal: true,
    });
  };

  handleCreateSubmit = (data: IPageInfoDTO) => {
    this.props.addOrUpdatePageInfo(data);
    this.setState({
      editItem: null,
      showModal: false,
    });
  };

  handleClose = () => {
    this.setState({
      editItem: null,
      showModal: false,
    });
  };

  render() {
    // prettier-ignore
    const {
      errorInner,
      cleanErrorInner,
      listItem,
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
          removeTitle="выбранные галереи"
          onRefresh={this.getPageInfoList}
          onRemove={this.onRemoveClickHandler}
        />
        <AgGrid
          ref={this.gridRef}
          columns={this.columns}
          rowData={listItem}
          onDoubleClickHandler={this.onDoubleClickHandler}
          rowSelectEnableField="isAliasCanBeEdited"
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
