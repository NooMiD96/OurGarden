// -----------------
// #region STATE
export interface IBreadcrumb {
  displayName: string;
  url: string;
  order: number;
}

export interface IBreadcrumbState {
  breadcrumb: IBreadcrumb[];
  key: string;
}

export const unloadedState: IBreadcrumbState = {
  breadcrumb: [],
  key: '',
};
// #endregion
