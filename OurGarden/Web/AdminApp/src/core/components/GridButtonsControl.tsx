import React from "react";

import Button from "@src/core/antd/Button";

export interface IGridButtonsControl {
  onRefresh?: () => void;
  onRemove?: () => void;
  onAdd?: () => void;
}

const GridButtonsControl = ({
  onRefresh,
  onRemove,
  onAdd
}: IGridButtonsControl) => {
  const refreshBtn = onRefresh && (
    <Button type="primary" className="refresh-btn" onClick={onRefresh}>
      Обновить
    </Button>
  );

  const removeBtn = onRemove && (
    <Button type="danger" className="delete-btn" onClick={onRemove}>
      Удалить
    </Button>
  );

  const addBtn = onAdd && (
    <Button type="primary" className="add-btn" onClick={onAdd}>
      Добавить
    </Button>
  );

  return (
    <div className="buttons-control">
      {refreshBtn}
      {removeBtn}
      {addBtn}
    </div>
  );
};

export default GridButtonsControl;
