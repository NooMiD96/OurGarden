import React, { useEffect, useState } from "react";

import Archive from "./icons/Archive";
import Loading from "./icons/Loading";
import Remove from "./icons/Remove";
import Search from "./icons/Search";

import { getLottie, getJsonIcon } from "./utils";

import { TLottiePlayer, ILottieWebIconProps } from "./ILottieWebIcon";

let lottieSvg: null | boolean | TLottiePlayer = null;

export const LottieWebIcon = ({ type, ...props }: ILottieWebIconProps) => {
  const [lottie, setLottie] = useState<TLottiePlayer | null>(
    lottieSvg as TLottiePlayer | null
  );

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (lottieSvg) {
        setLottie(lottieSvg as TLottiePlayer);
      }

      if (lottieSvg === null) {
        lottieSvg = false;

        // eslint-disable-next-line require-atomic-updates
        lottieSvg = await getLottie();

        setLottie(lottieSvg as TLottiePlayer);

        getJsonIcon("loading");
      }

      if (lottieSvg === false) {
        const interval = setInterval(() => {
          if (lottieSvg) {
            setLottie(lottieSvg as TLottiePlayer);
            clearTimeout(interval);
          }
        }, 1_000);
      }
      // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    }, 2_500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  switch (type) {
    case "archive":
      return <Archive lottie={lottie} {...props} />;

    case "loading":
      return <Loading lottie={lottie} {...props} />;

    case "remove":
      return <Remove lottie={lottie} {...props} />;

    case "search":
      return <Search lottie={lottie} {...props} />;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = type;
      return null;
  }
};

export default LottieWebIcon;
