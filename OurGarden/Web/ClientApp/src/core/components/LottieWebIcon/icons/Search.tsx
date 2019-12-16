import React, { useRef, useEffect, useState } from "react";

import Svg from "@core/components/Svg";

import { getJsonIcon } from "../utils";

import { AnimationItem } from "lottie-web";
import { TLottiePlayer } from "../ILottieWebIcon";

interface ISearch {
  isActive?: boolean;
  onClick?: () => void;
  lottie: TLottiePlayer | null;
}

const Search = ({ lottie, onClick, isActive }: ISearch) => {
  const searchEl: React.RefObject<HTMLDivElement> = useRef(null);
  const [searchAnimation, setSearchAnimation] = useState(
    null as AnimationItem | null
  );

  useEffect(() => {
    if (!lottie) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }

    const setAnimation = async () => {
      const json = await getJsonIcon("search");

      if (searchEl.current) {
        setSearchAnimation(
          lottie.loadAnimation({
            container: searchEl.current,
            renderer: "svg",
            loop: false,
            autoplay: false,
            animationData: json
          })
        );
      }
    };

    setAnimation();

    return () => {
      if (searchAnimation) {
        searchAnimation.destroy();
      }
    };
  }, [lottie]);

  useEffect(() => {
    if (searchAnimation) {
      searchAnimation.setDirection(isActive ? 1 : -1);
      searchAnimation.play();
    }
  }, [searchAnimation, isActive]);

  const props = {
    className: "search-icon",
    style: {
      maxWidth: "22px",
      cursor: "pointer",
      outline: "0px solid transparent",
      justifyContent: "center"
    },
    onClick,
    onKeyDown: onClick,
    tabIndex: 0,
    role: "button",
    "aria-label": "Поиск товара",
    "aria-pressed": false
  };

  return (
    <div ref={searchEl} {...props}>
      {(!lottie || !searchAnimation) && <Svg type="search" />}
    </div>
  );
};

export default Search;
