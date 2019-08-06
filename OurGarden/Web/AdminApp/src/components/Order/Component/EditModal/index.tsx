import * as React from "react";

import Modal from "@core/antd/Modal";

import EditModalContent from "./EditModalContent";

import { IOrderDTO, IOrder, IOrderStatus } from "../../State";

interface IEditModalProps {
  isShow: boolean;
  item: IOrder;
  statusList: IOrderStatus[];
  handleCreateSubmit: (data: IOrderDTO) => void;
  handleClose: Function;
}

export class EditModal extends React.PureComponent<IEditModalProps, {}> {
  render() {
    const {
      isShow,
      item,
      statusList,
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
        width="75%"
      >
        <EditModalContent
          loading={false}
          item={item}
          statusList={statusList}
          handleCreateSubmit={handleCreateSubmit}
          handleClose={handleClose}
        />
      </Modal>
    );
  }
}
