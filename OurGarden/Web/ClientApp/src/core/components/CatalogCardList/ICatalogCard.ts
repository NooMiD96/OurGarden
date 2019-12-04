import { push } from "connected-react-router";

export type TDataItem<T> = T & {
  link: string;
  alias: string;
  photoUrl: string;
}

export interface ICardComponent<T> {
  item: TDataItem<T>;
  push: typeof push;
  onCardClick?: () => void;
}

export interface ICatalogProps<T> {
  dataList: TDataItem<T>[];
  push: typeof push;
  cardComponent?: (props: ICardComponent<T>) => JSX.Element;
  useCardGrid?: boolean;
  colClassName?: string;
  paginationParams?: { page: number, pageSize: number };
  rowGutter?: number;
}

export interface ICatalogState<T> {
  page: number;
  pageSize: number;
}
