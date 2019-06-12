import { UserTypeEnums, allowToAllUserLocation } from "@core/constants";

/**
 * Check have user with userType the permissions to access the pathname route
 * @param userType type of the loged user
 * @param pathname pathname from the routeState (location.pathname)
 */
export const isUserHavePermissions = (userType: UserTypeEnums, pathname: string): boolean => {
  switch (userType) {
    case UserTypeEnums.Guest:
    case UserTypeEnums.User: {
      const parthOfLocationSplit = pathname.toLowerCase().split("/");
      const parthOfLocation = !!parthOfLocationSplit[1] ? parthOfLocationSplit[1] : "";
      const isHavePermission = (allowToAllUserLocation as any)[`/${parthOfLocation}`] || false;
      return isHavePermission;
    }

    default:
      return true;
  }
};
