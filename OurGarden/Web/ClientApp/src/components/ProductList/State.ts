// -----------------
//#region STATE
export interface IProductList {

}

export interface IProductListState {
  product: null | IProductList;
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IProductListState = {
  product: null,
  pending: false,
  errorInner: "",
};
//#endregion
