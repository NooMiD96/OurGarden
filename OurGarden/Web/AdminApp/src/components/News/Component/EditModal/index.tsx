import * as React from "react";

import Modal from "@core/antd/Modal";
import { INews, INewsDTO } from "../../State";

import EditModalContent from "./EditModalContent";

interface IEditModalProps {
  item: INews | null;
  isShow: boolean;
  handleCreateSubmit: (data: INewsDTO) => void;
  handleClose: () => void;
}

export class EditModal extends React.PureComponent<IEditModalProps, {}> {
  render() {
    const {
      item,
      isShow,
      handleCreateSubmit,
      handleClose
    } = this.props;

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
