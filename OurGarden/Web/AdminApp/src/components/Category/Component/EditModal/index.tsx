import * as React from "react";

import Modal from "@core/antd/Modal";
import { ICategoryItem } from "../../State";

import EditModalContent from "./EditModalContent";

interface IEditModalProps {
  isShow: boolean;
  item: ICategoryItem | null;
}

export class EditModal extends React.PureComponent<IEditModalProps, {}> {
  render() {
    const { isShow, item } = this.props;

    return (
      <Modal
        title={<span>{item ? "Редактирование" : "Создание"}</span>}
        visible={isShow}
        closable={false}
        footer={null}
      >
        <EditModalContent loading={false} />
      </Modal>
    );
  }
}
