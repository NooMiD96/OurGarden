import React from "react";

import Button from "@core/antd/Button";
import { DialogContent } from "@core/materialUI/modal";
import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";
import GenerateLink from "@src/core/components/GenerateLink";

import { getLinkToProduct } from "@src/core/helpers/linkGenerator";

import { CARD_PATH } from "@src/core/constants";
import { INewProductInCardModal } from "./interfaces/INewProductInCardModal";
import {
  StyledDialogActions,
  StyledDialogContentText,
  StyledModal,
} from "./style/StyledModal";

const onEnteringDisableFocus = () => {
  const bodyStyle = document?.body?.style;
  if (bodyStyle?.overflow) {
    bodyStyle.overflow = "";
    bodyStyle.paddingRight = "";
    document
      .querySelector("body > .new-product-in-card > .MuiDialog-container")
      ?.removeAttribute("tabindex");
  }
};

export const NewProductInCard = ({
  product,
  closeModal,
  isModalOpen,
  push,
}: TWithRouter<INewProductInCardModal>) => {
  const onToCardClickHandler = () => {
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
      onEntering={onEnteringDisableFocus}
      disableEnforceFocus
    >
      <DialogContent dividers>
        <StyledDialogContentText classes={{ root: "modal-content" }}>
          <GenerateLink
            link={getLinkToProduct(product || {})}
            title={product?.alias ?? "Товар был"}
            className="d-inline"
          />
          {" добавлен в корзину"}
        </StyledDialogContentText>
      </DialogContent>
      <StyledDialogActions classes={{ root: "modal-action-buttons" }}>
        <Button
          key="toCard"
          type="primary"
          className="custom-styled-btn flex-grow-1"
          onClick={onToCardClickHandler}
        >
          Перейти в корзину
        </Button>
        <Button
          className="custom-styled-btn flex-grow-1"
          key="continue"
          onClick={onContinueClickHandler}
        >
          Продолжить покупки
        </Button>
      </StyledDialogActions>
    </StyledModal>
  );
};

export default WithRouterPush<INewProductInCardModal>(NewProductInCard as any);
