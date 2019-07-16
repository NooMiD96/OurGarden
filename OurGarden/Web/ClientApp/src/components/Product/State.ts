// -----------------
//#region STATE
export interface IProduct {

}

export interface IProductState {
  product: null | IProduct;
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IProductState = {
  product: null,
  pending: false,
  errorInner: "",
};
//#endregion
