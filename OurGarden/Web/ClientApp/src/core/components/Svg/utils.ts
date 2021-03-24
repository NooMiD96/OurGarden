import { TSvgList } from "./ISvg";

export const getSvg = async (type: TSvgList) => {
  switch (type) {
    case "archive":
      return (
        await import(
          /* webpackChunkName: "archive" */ "@src/assets/svg/archive/archive.svg"
        )
      ).default;

    case "remove":
      return (
        await import(
          /* webpackChunkName: "remove" */ "@src/assets/svg/remove/trash-2.svg"
        )
      ).default;

    case "search":
      return (
        await import(
          /* webpackChunkName: "search" */ "@src/assets/svg/search/search.svg"
        )
      ).default;

    case "phone":
      return (
        await import(
          /* webpackChunkName: "phone" */ "@src/assets/svg/phone.svg"
        )
      ).default;

    case "map-pin":
      return (
        await import(
          /* webpackChunkName: "map-pin" */ "@src/assets/svg/map-pin.svg"
        )
      ).default;

    case "place-contacts":
      return (
        await import(
          /* webpackChunkName: "place" */ "@src/assets/svg/contacts/place.svg"
        )
      ).default;

    case "phone-contacts":
      return (
        await import(
          /* webpackChunkName: "phone" */ "@src/assets/svg/contacts/phone.svg"
        )
      ).default;

    case "mail-contacts":
      return (
        await import(
          /* webpackChunkName: "mail" */ "@src/assets/svg/contacts/mail.svg"
        )
      ).default;

    case "form-user":
      return (
        await import(
          /* webpackChunkName: "form-user" */ "@icons-svg/outlined/user.svg"
        )
      ).default;

    case "form-phone":
      return (
        await import(
          /* webpackChunkName: "form-phone" */ "@icons-svg/outlined/phone.svg"
        )
      ).default;

    case "form-mail":
      return (
        await import(
          /* webpackChunkName: "form-mail" */ "@icons-svg/outlined/mail.svg"
        )
      ).default;

    case "close":
      return (
        await import(
          /* webpackChunkName: "close" */ "@icons-svg/outlined/close.svg"
        )
      ).default;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = type;
      throw new Error(`SVG with "${type}" type not found!`);
  }
};
