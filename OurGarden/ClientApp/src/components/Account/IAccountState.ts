// -----------------
// STATE
import { UserTypeEnums } from "@core/constants";
import { XPT } from "@core/helpers/auth/xsrf";

export enum SectionsEnum {
    medicament,
    vaccination,
}

export type TNotify = {
    section: SectionsEnum,
    count: number,
};

export interface AccountState {
    userName?: string;
    userType: UserTypeEnums;
    pending: boolean;
    errorMessage?: string;
    _xpt: XPT | null;
    notify: TNotify[];
}

export const unloadedState: AccountState = {
    userType: UserTypeEnums.Guest,
    _xpt: null,
    pending: false,
    notify: [],
};
