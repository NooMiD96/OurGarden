import React from "react";

import Button from "@src/core/antd/Button";
import NumberInput from "@src/core/components/NumberInput";

import { IAddToCardButton } from "./interfaces/IAddToCardButton";

import "./style/AddToCardButton.style.scss";

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
            className="custom-styled-btn second"
            type="primary"
            onClick={addToCard}
          >
            В корзину
          </Button>
        )}
        onPressEnter={addToCard}
      />
    </div>
  );
};

export default AddToCardButton;
