// -----------------
//#region STATE
export interface IVideo {
  videoId: number;
  title: string;
  description: string;
  url: string;
}

export interface IVideoDTO {
  videoId: number | null;
  title: string;
  description: string;
  url: string;
}

export interface IVideoState {
  listItem: IVideo[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IVideoState = {
  listItem: [],
  pending: false,
  errorInner: "",
};
//#endregion
