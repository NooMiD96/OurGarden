import React from "react";

import Tooltip from "@core/antd/Tooltip";
import Icon from "@core/antd/Icon";
import { IDescriptionTooltipProps } from "./IDescriptionTooltip";

const conditionStringHelper = "Если в тексте указан данный блок,";

const TooltipContent = ({
  showCatalogTooltip = true,
  showPhoneTooltip = true,
  showEmailTooltip = true,
  showGalleryTooltip = true,
}: IDescriptionTooltipProps) => {
  const tips: React.ReactNode[] = [];

  if (showCatalogTooltip) {
    tips.push((
      <p key="catalog-tip">
        {"{{"}
        catalog
        {"}}"}
        {" "}
        -
        {" "}
        {conditionStringHelper}
        {" "}
        на его месте будет выводиться каталог с товарами.
      </p>
    ));
  }

  if (showPhoneTooltip) {
    tips.push((
      <p key="phone-tip">
        {"{{"}
        phone
        {"}}"}
        {" "}
        -
        {" "}
        {conditionStringHelper}
        {" "}
        на его месте будет выводится форматированный телефон.
      </p>
    ));
  }

  if (showEmailTooltip) {
    tips.push((
      <p key="email-tip">
        {"{{"}
        email
        {"}}"}
        {" "}
        -
        {" "}
        {conditionStringHelper}
        {" "}
        на его месте будет выводится почта.
      </p>
    ));
  }

  if (showGalleryTooltip) {
    tips.push((
      <p key="gallery-tip">
        {"{{"}
        gallery=Имя галереи
        {"}}"}
        {" "}
        -
        {" "}
        {conditionStringHelper}
        {" "}
        на его месте будет выводится галерея, с указанным именем.
      </p>
    ));
  }

  return (
    <div>
      {tips}
    </div>
  );
};

const DescriptionTooltip = ({
  showCatalogTooltip = true,
  showPhoneTooltip = true,
  showEmailTooltip = true,
  showGalleryTooltip = true,
}: IDescriptionTooltipProps) => (
  <Tooltip title={(
    <TooltipContent
      showCatalogTooltip={showCatalogTooltip}
      showPhoneTooltip={showPhoneTooltip}
      showEmailTooltip={showEmailTooltip}
      showGalleryTooltip={showGalleryTooltip}
    />
  )}
  >
    <Icon type="question" style={{ color: "#40a9ff" }} />
  </Tooltip>
);


export default DescriptionTooltip;
