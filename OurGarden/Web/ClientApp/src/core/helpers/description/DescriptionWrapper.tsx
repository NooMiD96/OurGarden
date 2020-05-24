import React from "react";

import { IDescriptionWrapperProps } from "./IDescriptionWrapper";
import { getPartsBetweenCatalog, getFormattedDescription } from "./DescriptionHelper";

const DescriptionWrapper = (props: IDescriptionWrapperProps) => {
  const description = getFormattedDescription(props.description);
  const parts = getPartsBetweenCatalog(description);
  const isPartsExists = parts.some(Boolean);

  return (
    <div className={isPartsExists ? "white-background grey-border" : ""}>
      <div
        className="wysiwyg-wrapper wysiwyg-description pt5 pb0"
        dangerouslySetInnerHTML={{ __html: parts[0] }}
      />
      {props.children}
      <div
        className="wysiwyg-wrapper wysiwyg-description pt0 pb5"
        dangerouslySetInnerHTML={{ __html: parts[1] }}
      />
    </div>
  );
};

export default DescriptionWrapper;
