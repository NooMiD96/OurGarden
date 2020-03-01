import { push, replace } from "connected-react-router";

export type TDataItem<T> = T & {
  link: string;
  alias: string;
  photoUrl: string;
};

export interface ICardComponent<T> {
  item: TDataItem<T>;
  push: typeof push;
}

export interface ICatalogProps<T> {
  dataList: TDataItem<T>[];
  push: typeof push;
  replace?: typeof replace;
  locationState?: any;
  cardComponent?: (props: ICardComponent<T>) => JSX.Element;
  useCardGrid?: boolean;
  colClassName?: string;
  paginationParams?: { page: number; pageSize: number };
  rowGutter?: number;
  cardTitleField?: string;
}

export interface ICatalogState<T> {
  page: number;
  pageSize: number;
}
