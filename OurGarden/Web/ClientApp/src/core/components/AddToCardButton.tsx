import React from "react";

import Button from "@src/core/antd/Button";
import NumberInput from "@src/core/components/NumberInput";

import AddToCardButtonWrapper from "./style/AddToCardButton.style";

export interface IAddToCardButton {
  itemCount: string;
  setItemCount: (value: string) => void;
}

const AddToCardButton = (props: IAddToCardButton) => {
  const { itemCount, setItemCount } = props;

  return (
    <AddToCardButtonWrapper className="card-add-button">
      <NumberInput
        value={itemCount}
        onValueChange={setItemCount}
        addonAfter={<Button type="default" block>В корзину</Button>}
      />
    </AddToCardButtonWrapper>
  )
}

export default AddToCardButton;
