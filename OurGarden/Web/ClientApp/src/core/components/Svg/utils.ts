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

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = type;
      throw new Error(`SVG with "${type}" type not found!`);
  }
};
