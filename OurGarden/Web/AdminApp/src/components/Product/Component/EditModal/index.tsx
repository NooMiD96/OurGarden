import * as React from "react";

import Modal from "@core/antd/Modal";
import { IProduct, ICategoryDictionary, IProductDTO } from "../../State";

import EditModalContent from "./EditModalContent";

interface IEditModalProps {
  item: IProduct | null;
  categoryList: ICategoryDictionary[];
  isShow: boolean;
  handleCreateSubmit: (data: IProductDTO) => void;
  handleClose: () => void;
}

export class EditModal extends React.PureComponent<IEditModalProps, {}> {
  render() {
    const {
      item,
      categoryList,
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
        width="80%"
      >
        <EditModalContent
          item={item}
          categoryList={categoryList}
          loading={false}
          handleCreateSubmit={handleCreateSubmit}
          handleClose={handleClose}
        />
      </Modal>
    );
  }
}
