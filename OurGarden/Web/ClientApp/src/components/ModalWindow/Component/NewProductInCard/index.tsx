import React from "react";
import { Link } from "react-router-dom";

import Button from "@core/antd/Button";
import { DialogContent } from "@core/materialUI/modal";
import {
  StyledModal,
  StyledDialogActions,
  StyledDialogContentText,
} from "./StyledModal";
import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";

import { GetLinkToProduct } from "@src/core/helpers/linkGenerator";

import { CARD_PATH } from "@src/core/constants";

import { INewProductInCard } from "./INewProductInCard";

export const NewProductInCard = ({
  product,
  closeModal,
  isModalOpen,
  onEnter,
  push,
}: TWithRouter<INewProductInCard>) => {
  const onToCardClickHanlder = () => {
    push(CARD_PATH);
    closeModal();
  };
  const onContinueClickHandler = () => {
    closeModal();
  };

  return (
    <StyledModal
      classes={{ root: "new-product-in-card" }}
      open={isModalOpen}
      hideBackdrop
      onEntering={onEnter}
    >
      <DialogContent dividers>
        <StyledDialogContentText classes={{ root: "modal-content" }}>
          <Link to={GetLinkToProduct(product || {})}>
            {product?.alias ?? "Товар был"}
          </Link>
          {" добавлен в корзину"}
        </StyledDialogContentText>
      </DialogContent>
      <StyledDialogActions classes={{ root: "modal-action-buttons" }}>
        <Button
          key="toCard"
          type="primary"
          className="custome-styled-btn flex-grow-1"
          onClick={onToCardClickHanlder}
        >
          Перейти в корзину
        </Button>
        <Button
          className="custome-styled-btn flex-grow-1"
          key="continue"
          onClick={onContinueClickHandler}
        >
          Продолжить покупки
        </Button>
      </StyledDialogActions>
    </StyledModal>
  );
};

export default WithRouterPush<INewProductInCard>(NewProductInCard as any);
