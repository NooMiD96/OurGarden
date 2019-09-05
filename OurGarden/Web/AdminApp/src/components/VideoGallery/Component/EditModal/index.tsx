import * as React from "react";

import Modal from "@core/antd/Modal";
import { IVideo } from "../../State";

import EditModalContent from "./EditModalContent";

interface IEditModalProps {
  isShow: boolean;
  item: IVideo | null;
  handleCreateSubmit: Function;
  handleClose: Function;
}

export class EditModal extends React.PureComponent<IEditModalProps, {}> {
  render() {
    const {
      isShow,
      item,
      handleCreateSubmit: handleCreateSubmit,
      handleClose: handleClose
    } = this.props;

    return (
      <Modal
        title={<span>{item ? "Редактирование" : "Создание"}</span>}
        visible={isShow}
        closable={false}
        destroyOnClose
        footer={null}
      >
        <EditModalContent
          loading={false}
          item={item}
          handleCreateSubmit={handleCreateSubmit}
          handleClose={handleClose}
        />
      </Modal>
    );
  }
}
