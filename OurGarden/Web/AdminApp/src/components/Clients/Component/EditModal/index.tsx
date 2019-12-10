import * as React from "react";

import Modal from "@core/antd/Modal";
import EditModalContent from "./EditModalContent";

import { IEditModalProps } from "./IEditModal";

export class EditModal extends React.PureComponent<IEditModalProps, {}> {
  render() {
    const { item, isShow, handleCreateSubmit, handleClose } = this.props;

    return (
      <Modal
        title={<span>{item ? "Редактирование" : "Создание"}</span>}
        visible={isShow}
        closable={false}
        destroyOnClose
        footer={null}
        width="50%"
      >
        <EditModalContent
          item={item}
          loading={false}
          handleCreateSubmit={handleCreateSubmit}
          handleClose={handleClose}
        />
      </Modal>
    );
  }
}
