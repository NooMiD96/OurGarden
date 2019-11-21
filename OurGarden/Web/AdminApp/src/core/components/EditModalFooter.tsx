import React from "react";

import Button from "@core/antd/Button";

export interface IEditModalFooter {
  onSubmit: () => void;
  onClose: () => void;
}

const EditModalFooter = ({ onSubmit, onClose }: IEditModalFooter) => (
  <div className="ant-modal-footer">
    <Button type="primary" onClick={onSubmit}>
      Сохранить
    </Button>
    <Button type="danger" onClick={onClose}>
      Отмена
    </Button>
  </div>
);

export default EditModalFooter;
