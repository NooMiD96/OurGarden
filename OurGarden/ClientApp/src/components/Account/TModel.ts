// -----------------------------
// MODELS
import { UserTypeEnums } from "@core/constants";

export type TRegistrationModel = {
  userName: string;
  email: string;
  password: string;
};
export type TAuthenticationModel = {
  userName: string;
  password: string;
};
export type TUserModel = {
  userName: string;
  userType: UserTypeEnums;
};
