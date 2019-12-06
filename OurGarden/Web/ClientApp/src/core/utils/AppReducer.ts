// prettier-ignore
export const addNewRequest = typeof window === "undefined"
  ? () => []
  : (pendingList: boolean[]) => [...pendingList, true];
