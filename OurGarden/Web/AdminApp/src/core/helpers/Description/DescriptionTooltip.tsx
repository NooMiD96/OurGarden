import React from "react";

import Tooltip from "@core/antd/Tooltip";
import Icon from "@core/antd/Icon";
import { IDescriptionTooltipProps } from "./IDescriptionTooltip";

const conditionStringHelper = "Если в тексте указан данный блок,";

/* prettier-ignore */
const TooltipContent = ({
  showCatalogTooltip = true,
  showPhoneTooltip = true,
  showEmailTooltip = true,
  showGalleryTooltip = true,
  showAddressTooltip = true,
  showShortAddressTooltip = true,
}: IDescriptionTooltipProps) => {
  const tips: React.ReactNode[] = [];

  if (showCatalogTooltip) {
    tips.push(
      <p key="catalog-tip">
        {"{{"}
        catalog
        {"}}"}
        {" "}
        -
        {" "}
        {conditionStringHelper}
        {" "}
        на его месте будет выводиться каталог с
        товарами.
      </p>
    );
  }

  if (showPhoneTooltip) {
    tips.push(
      <p key="phone-tip">
        {"{{"}
        phone
        {"}}"}
        {" "}
        -
        {" "}
        {conditionStringHelper}
        {" "}
        на его месте будет выводится
        форматированный телефон.
      </p>
    );
  }

  if (showEmailTooltip) {
    tips.push(
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
    );
  }

  if (showAddressTooltip) {
    tips.push(
      <p key="address-tip">
        {"{{"}
        address
        {"}}"}
        {" "}
        -
        {" "}
        {conditionStringHelper}
        {" "}
        на его месте будет выводится адрес
        магазина (т.е. &quot;г. Тула,
        {"{{"}
        short_address
        {"}}"}
        &quot;).
      </p>
    );
  }

  if (showShortAddressTooltip) {
    tips.push(
      <p key="email-tip">
        {"{{"}
        short_address
        {"}}"}
        {" "}
        -
        {" "}
        {conditionStringHelper}
        {" "}
        на его месте будет выводится короткий адрес магазина (т.е. &quot;ул. 9 мая, 36&quot;).
      </p>
    );
  }

  if (showGalleryTooltip) {
    tips.push(
      <p key="gallery-tip">
        {"{{"}
        gallery=Имя галереи
        {"}}"}
        {" "}
        -
        {" "}
        {conditionStringHelper}
        {" "}
        на его месте будет выводится галерея, с
        указанным именем.
      </p>
    );
  }

  return <div>{tips}</div>;
};

// prettier-ignore
const DescriptionTooltip = ({
  showCatalogTooltip = false,
  showPhoneTooltip = true,
  showEmailTooltip = true,
  showGalleryTooltip = true,
  showAddressTooltip = true,
  showShortAddressTooltip = true,
}: IDescriptionTooltipProps) => (
  <Tooltip
    title={(
      <TooltipContent
        showCatalogTooltip={showCatalogTooltip}
        showPhoneTooltip={showPhoneTooltip}
        showEmailTooltip={showEmailTooltip}
        showGalleryTooltip={showGalleryTooltip}
        showAddressTooltip={showAddressTooltip}
        showShortAddressTooltip={showShortAddressTooltip}
      />
    )}
  >
    <Icon type="question" style={{ color: "#40a9ff" }} />
  </Tooltip>
);

export default DescriptionTooltip;
