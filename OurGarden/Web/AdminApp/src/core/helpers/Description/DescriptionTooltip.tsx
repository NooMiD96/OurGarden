import React from "react";

import Tooltip from "@core/antd/Tooltip";
import Icon from "@core/antd/Icon";
import { IDescriptionTooltipProps } from "./IDescriptionTooltip";

const conditionStringHelper = "Если в тексте указан данный блок,";

const TooltipContent = ({
  showCatalogTooltip = true,
  showPhoneTooltip = true
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

  return (
    <div>
      {tips}
    </div>
  );
};

const DescriptionTooltip = ({
  showCatalogTooltip = true,
  showPhoneTooltip = true
}: IDescriptionTooltipProps) => (
  <Tooltip title={(
    <TooltipContent
      showCatalogTooltip={showCatalogTooltip}
      showPhoneTooltip={showPhoneTooltip}
    />
  )}
  >
    <Icon type="question" style={{ color: "#40a9ff" }} />
  </Tooltip>
);


export default DescriptionTooltip;
