import React from "react";

import Button from "@src/core/antd/Button";
import NumberInput from "@src/core/components/NumberInput";

import { IMouseClickEvent } from "@core/interfaces/IEvents";

import "./style/AddToCardButton.style.scss";

export interface IAddToCardButton {
  itemCount: string;
  setItemCount: (value: string) => void;
  addToCard: (e: IMouseClickEvent) => void;
}

const AddToCardButton = (props: IAddToCardButton) => {
  const { itemCount, setItemCount, addToCard } = props;

  return (
    <div className="add-to-card-button-wrapper card-add-button">
      <NumberInput
        value={itemCount}
        onValueChange={setItemCount}
        // prettier-ignore
        addonAfter={(
          <Button
            block
            className="custome-styled-btn second"
            type="primary"
            onClick={addToCard}
          >
            В корзину
          </Button>
        )}
      />
    </div>
  );
};

export default AddToCardButton;
