export interface ISEOMetaData {
  title: string | null;
  meta: string | null;
}

export interface ISEOAdditionalInfo {
  replacementString?: string;
  replacementValue: string;
}

export interface IHeaderHelmet {
  seoSectionName: string;
  seoTitle?: ISEOAdditionalInfo[];
  seoMeta?: ISEOAdditionalInfo[];
}
