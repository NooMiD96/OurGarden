import { replace } from "connected-react-router";

export type TDataItem<T> = T & {
  link: string;
  alias: string;
  photoUrl: string;
};

export interface ICardComponent<T> {
  item: TDataItem<T>;
}

export interface ICatalogProps<T> {
  dataList: TDataItem<T>[];
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
