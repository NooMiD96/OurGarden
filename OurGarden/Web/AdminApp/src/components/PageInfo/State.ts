import { IPhoto, IMultiplyPhotoDTO } from "@src/core/IPhoto";
import { IDefaultState } from "@src/core/IDefaultState";
import { ISeoParams } from "@src/core/ISeoParams";
import { IDescription } from "@src/core/IDescription";

// -----------------
// #region STATE
export interface IPageInfo extends ISeoParams, IDescription {
  pageInfoId: number;
  alias: string;
  normalizeAlias: string;
  /**
   * Поле говорит о том, что у данной записи может быть изменено имя.
   * Если изменить нельзя, значит это статичная страница, и удалить её так же нельзя
   */
  isAliasCanBeEdited: boolean;
  photos: IPhoto[];
}

export interface IPageInfoDTO
  extends IMultiplyPhotoDTO,
    ISeoParams,
    IDescription {
  pageInfoId: number;
  alias: string;
}

export interface IPageInfoState extends IDefaultState {
  listItem: IPageInfo[];
}

export const unloadedState: IPageInfoState = {
  listItem: [],
  pending: false,
  errorInner: "",
};
// #endregion
