// -----------------
// STATE
import { UserTypeEnums } from "@core/constants";
import { XPT } from "@core/helpers/auth/xsrf";

export enum SectionsEnum {
    medicament,
    vaccination,
}

export interface AccountState {
    userName?: string;
    userType: UserTypeEnums;
    pending: boolean;
    errorMessage?: string;
    _xpt: XPT | null;
}

export const unloadedState: AccountState = {
    userType: UserTypeEnums.Guest,
    _xpt: null,
    pending: false,
};
