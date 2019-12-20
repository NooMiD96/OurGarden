export interface ICardConfirm {
  pending: boolean;
  errorInner: string;
  ymId: number;
}

export interface ICardConfirmSuccess {
  ymId?: number;
}
