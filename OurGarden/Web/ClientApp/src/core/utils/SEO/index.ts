import {
  seoInformation,
  simpleGetSEOMetaData,
  normalGetSEOMetaData
} from "./helpers";
import { ISEOAdditionalInfo } from "./ISEO";

export const getSEOMetaData = !seoInformation
  ? simpleGetSEOMetaData
  : normalGetSEOMetaData;

export const getAdditionalSEOInfo = (
  info: string | null,
  additionalInfo: ISEOAdditionalInfo[] = []
) => {
  if (!info) {
    return null;
  }

  let value = info;

  if (additionalInfo && additionalInfo.length) {
    additionalInfo.forEach((t: ISEOAdditionalInfo) => {
      value = value.replace(
        `{{${t.replacementString || "value"}}}`,
        t.replacementValue
      );
    });
  }

  return value;
};
