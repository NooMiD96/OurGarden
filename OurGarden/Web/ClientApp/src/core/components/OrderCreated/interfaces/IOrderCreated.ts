export interface IOrderCreated {
  pending: boolean;
  errorInner: string;
  ymId: number;
}

export interface IOrderCreatedSuccess {
  ymId?: number;
}
