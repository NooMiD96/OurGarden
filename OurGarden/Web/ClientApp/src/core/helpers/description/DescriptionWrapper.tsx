import React from "react";

import { IDescriptionWrapperProps } from "./IDescriptionWrapper";
import {
  getPartsBetweenCatalog,
  getFormattedDescription
} from "./DescriptionHelper";

const DescriptionWrapper = (props: IDescriptionWrapperProps) => {
  const description = getFormattedDescription(props.description);
  const parts = getPartsBetweenCatalog(description);
  const isPartsExists = parts.some(Boolean);

  return (
    <div className={isPartsExists ? "white-background grey-border" : ""}>
      {parts[0] && (
        <div
          className="wysiwyg-wrapper ant-typography wysiwyg-description pt18 pb0"
          dangerouslySetInnerHTML={{ __html: parts[0] }}
        />
      )}
      {props.children}
      {parts[1] && (
        <div
          className="wysiwyg-wrapper ant-typography wysiwyg-description pt0 pb5 mtn16"
          dangerouslySetInnerHTML={{ __html: parts[1] }}
        />
      )}
    </div>
  );
};

export default DescriptionWrapper;
