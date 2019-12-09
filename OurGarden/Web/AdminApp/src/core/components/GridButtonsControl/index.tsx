import React from "react";

import Button from "@src/core/antd/Button";
import { confirm } from "@src/core/antd/Modal";

import { IGridButtonsControl } from "./IGridButtonsControl";

const GridButtonsControl: <T>(props: IGridButtonsControl<T>) => JSX.Element = ({
  onRefresh,
  gridRef,
  removeTitle,
  onRemove,
  onAdd
}) => {
  const refreshBtn = onRefresh && (
    <Button type="primary" className="refresh-btn" onClick={onRefresh}>
      Обновить
    </Button>
  );

  const removeBtn = onRemove && (
    <Button
      type="danger"
      className="delete-btn"
      onClick={() => {
        if (!gridRef || !gridRef.current) {
          return;
        }

        const sourceData = gridRef.current.state.gridApi.getSelectedRows();
        if (!sourceData.length) {
          return;
        }

        confirm({
          title: `Удалить ${removeTitle || "выбранные"}?`,
          // prettier-ignore
          content: `После удаления востановить их уже не удастся. Вы уверены что хотите удалить ${removeTitle || "выбранные"}?`,
          okText: "Да",
          okType: "danger",
          cancelText: "Отмена",
          type: "confirm",
          onOk: () => {
            onRemove(sourceData);
          }
        });
      }}
    >
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
