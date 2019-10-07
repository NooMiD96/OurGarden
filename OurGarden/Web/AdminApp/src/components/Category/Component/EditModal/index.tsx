import * as React from "react";

import Modal from "@core/antd/Modal";

import EditModalContent from "./EditModalContent";

import { ICategory, ICategoryDTO } from "../../State";

interface IEditModalProps {
  isShow: boolean;
  item: ICategory | null;
  handleCreateSubmit: (data: ICategoryDTO) => void;
  handleClose: Function;
}

export class EditModal extends React.PureComponent<IEditModalProps, {}> {
  render() {
    const { isShow, item, handleCreateSubmit, handleClose } = this.props;

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
