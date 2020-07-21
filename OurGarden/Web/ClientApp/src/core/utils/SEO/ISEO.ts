import { ISeoParams } from "@src/core/interfaces/ISeoParams";

export interface ISEOMetaData {
  title: string | null;
  description: string | null;
  keywords: string | null;
}

export interface ISEOAdditionalInfo {
  replacementString?: string;
  replacementValue: string;
}

export interface IHeaderHelmet {
  seoSectionName?: string;
  seoTitle?: string;
  seoTitleReplacments?: ISEOAdditionalInfo[];
  seoParams?: ISeoParams;
}
