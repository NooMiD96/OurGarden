import * as React from "react";

import Modal from "@core/antd/Modal";
import { ICategory } from "../../State";

import EditModalContent from "./EditModalContent";

interface IEditModalProps {
  isShow: boolean;
  item: ICategory | null;
  handleSubmit: Function;
  handleClose: Function;
}

export class EditModal extends React.PureComponent<IEditModalProps, {}> {
  render() {
    const {
      isShow,
      item,
      handleSubmit: handleSubmit,
      handleClose: handleClose
    } = this.props;

    return (
      <Modal
        title={<span>{item ? "Редактирование" : "Создание"}</span>}
        visible={isShow}
        closable={false}
        footer={null}
      >
        <EditModalContent
          loading={false}
          url={item ? item.photo.url : ""}
          name={item ? item.alias : ""}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        />
      </Modal>
    );
  }
}
