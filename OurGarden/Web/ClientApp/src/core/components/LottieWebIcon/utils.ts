import { TIcons } from "./ILottieWebIcon";

export const getLottie = async () => {
  const lottie = await import(
    /* webpackChunkName: "lottie" */ "lottie-web/build/player/lottie_light"
  );

  return lottie.default;
};

export const getJsonIcon = async (type: TIcons) => {
  let json: any;
  switch (type) {
    case "loading":
      json = await import(
        /* webpackChunkName: "loading" */ "@src/assets/svg/loading/loading-V2.json"
      );
      return json.default;

    case "archive":
      json = await import(
        /* webpackChunkName: "archive" */ "@src/assets/svg/archive/archive.json"
      );
      return json.default;

    case "remove":
      json = await import(
        /* webpackChunkName: "remove" */ "@src/assets/svg/remove/trash-V2.json"
      );
      return json.default;

    case "search":
      json = await import(
        /* webpackChunkName: "search" */ "@src/assets/svg/search/search-to-x.json"
      );
      return json.default;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = type;
      return json;
  }
};
