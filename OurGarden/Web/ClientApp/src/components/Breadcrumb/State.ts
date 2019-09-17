// -----------------
// #region STATE
export interface IBreadcrumb {
  displayName: string;
  url: string;
  order: number;
}

export interface IBreadcrumbState {
  breadcrumb: IBreadcrumb[];
}

export const unloadedState: IBreadcrumbState = {
  breadcrumb: [],
};
// #endregion
