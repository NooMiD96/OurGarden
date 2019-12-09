import React, { createRef } from "react";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";
import GridButtonsControl from "@core/components/GridButtonsControl";
import Spin from "@core/antd/Spin";

import { EditModal } from "./EditModal";

import { ColDef } from "ag-grid-community";
import { TState, TComponentState } from "../TState";
import { IGallery, IGalleryDTO } from "../State";

export class Gallery extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    editItem: null,
    showModal: false
  };
  gridRef: React.RefObject<AgGrid<IGallery>> = createRef();

  columns: ColDef[] = [
    {
      headerName: "Название",
      field: "name"
    }
  ];

  componentDidMount() {
    this.getGalleryList();
  }

  getGalleryList = () => {
    this.props.getGalleryList();
  };

  onDoubleClickHandler = (data: IGallery) => {
    this.setState({
      editItem: data,
      showModal: true
    });
  };

  onRemoveClickHandler = (data: IGallery[]) => {
    this.props.removeGallery(data[0].galleryId);
  };

  onAddNewItemClickHandler = () => {
    this.setState({
      editItem: null,
      showModal: true
    });
  };

  handleCreateSubmit = (data: IGalleryDTO) => {
    this.props.addOrUpdateGallery(data);
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
          gridRef={this.gridRef}
          removeTitle="выбранные галереи"
          onRefresh={this.getGalleryList}
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
