import * as React from "react";

import Modal from "@core/antd/Modal";
import { ISubcategory, ISubcategoryDTO } from "../../State";

import EditModalContent from "./EditModalContent";
import { ICategory } from "@src/components/Category/State";

interface IEditModalProps {
  isShow: boolean;
  item: ISubcategory | null;
  dropdownData: ICategory[];
  handleCreateSubmit: (data: ISubcategoryDTO) => void;
  handleClose: Function;
}

export class EditModal extends React.PureComponent<IEditModalProps, {}> {
  render() {
    const {
      isShow,
      item,
      dropdownData,
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
          dropdownData={dropdownData}
          handleCreateSubmit={handleCreateSubmit}
          handleClose={handleClose}
        />
      </Modal>
    );
  }
}
