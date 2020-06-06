import React from "react";

import { IDescriptionItemWrapperProps } from "./IDescriptionItemWrapper";
import { getFormattedDescription } from "../DescriptionHelper";

const DescriptionItemWrapper = ({
  description,
  wrapperClassName = ""
}: IDescriptionItemWrapperProps) => {
  const formattedDescription = getFormattedDescription(description);

  return (
    <div
      className={`ant-typography ${wrapperClassName ?? ""}`}
      dangerouslySetInnerHTML={{ __html: formattedDescription }}
    />
  );
};

export default DescriptionItemWrapper;
