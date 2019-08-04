import * as React from "react";

import Modal from "@core/antd/Modal";
import { IOrderDTO, IOrder } from "../../State";

import EditModalContent from "./EditModalContent";

interface IEditModalProps {
  isShow: boolean;
  item: IOrder;
  handleCreateSubmit: (data: IOrderDTO) => void;
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
