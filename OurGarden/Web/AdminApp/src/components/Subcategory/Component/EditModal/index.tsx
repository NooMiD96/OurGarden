import * as React from "react";

import Modal from "@core/antd/Modal";
import { ISubcategory, ISubcategoryDTO } from "../../State";

import EditModalContent from "./EditModalContent";
import { ICategoryDictionary } from "@src/components/Category/State";

interface IEditModalProps {
  isShow: boolean;
  item: ISubcategory | null;
  dropdownData: ICategoryDictionary[];
  handleCreateSubmit: (data: ISubcategoryDTO) => void;
  handleClose: () => void;
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
