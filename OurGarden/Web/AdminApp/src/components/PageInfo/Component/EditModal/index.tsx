import * as React from "react";

import Modal from "@core/antd/Modal";
import { IPageInfo, IPageInfoDTO } from "../../State";

import EditModalContent from "./EditModalContent";

interface IEditModalProps {
  isShow: boolean;
  item: IPageInfo | null;
  handleCreateSubmit: (data: IPageInfoDTO) => void;
  handleClose: Function;
}

export class EditModal extends React.PureComponent<IEditModalProps, {}> {
  render() {
    // prettier-ignore
    const {
      isShow,
      item,
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
          loading={false}
          item={item}
          handleCreateSubmit={handleCreateSubmit}
          handleClose={handleClose}
        />
      </Modal>
    );
  }
}
