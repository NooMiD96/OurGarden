import { push } from "connected-react-router";

import { ISubcategory } from "@src/components/Subcategory/State";
import { ICategory } from "@src/components/Category/State";

export interface ICatalogProps {
  dataList: (ICategory | ISubcategory)[];
  push: typeof push;
}

export interface IDisplayItem {
  link: string;
  alias: string;
  photoUrl: string;
}
export interface ICatalogState {
  page: number;
  pageSize: number;
  displayList: IDisplayItem[];
}
