import React from "react";

import Button from "@src/core/antd/Button";
import NumberInput from "@src/core/components/NumberInput";

import AddToCardButtonWrapper from "./style/AddToCardButton.style";

import { IMouseClickEvent } from "../IEvents";

export interface IAddToCardButton {
  itemCount: string;
  setItemCount: (value: string) => void;
  addToCard: (e: IMouseClickEvent) => void;
}

const AddToCardButton = (props: IAddToCardButton) => {
  const { itemCount, setItemCount, addToCard } = props;

  return (
    <AddToCardButtonWrapper className="card-add-button">
      <NumberInput
        value={itemCount}
        onValueChange={setItemCount}
        addonAfter={(
          <Button block onClick={addToCard}>
            В корзину
          </Button>
        )}
      />
    </AddToCardButtonWrapper>
  );
};

export default AddToCardButton;
