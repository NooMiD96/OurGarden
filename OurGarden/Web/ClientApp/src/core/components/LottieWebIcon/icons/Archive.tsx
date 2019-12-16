import React, { useRef, useEffect, useState } from "react";

import Svg from "@core/components/Svg";

import { getJsonIcon } from "../utils";

import { AnimationItem } from "lottie-web";
import { TLottiePlayer } from "../ILottieWebIcon";

interface IArchive {
  onClick?: () => void;
  lottie: TLottiePlayer | null;
}

const Archive = ({ onClick, lottie }: IArchive) => {
  const archiveEl: React.RefObject<HTMLDivElement> = useRef(null);
  const [
    archiveAnimation,
    setArchiveAnimation
  ] = useState<AnimationItem | null>(null);

  const onMouseEnter = () => {
    if (archiveAnimation) {
      archiveAnimation.setDirection(1);
      archiveAnimation.play();
    }
  };
  const onMouseLeave = () => {
    if (archiveAnimation) {
      archiveAnimation.setDirection(-1);
      archiveAnimation.play();
    }
  };

  useEffect(() => {
    if (!lottie) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }

    const setAnimation = async () => {
      const json = await getJsonIcon("archive");

      if (archiveEl.current) {
        setArchiveAnimation(
          lottie.loadAnimation({
            container: archiveEl.current,
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
      if (archiveAnimation) {
        archiveAnimation.destroy();
      }
    };
  }, [lottie]);

  const props = {
    className: "archive-icon",
    style: {
      maxWidth: "32px",
      cursor: "pointer",
      outline: "0px solid transparent",
      justifyContent: "center"
    },
    onMouseEnter,
    onMouseLeave,
    onClick,
    onKeyDown: onClick,
    tabIndex: 0,
    "aria-label": "Корзина",
    role: "link"
  };

  return (
    <div ref={archiveEl} {...props}>
      {(!lottie || !archiveAnimation) && <Svg type="archive" />}
    </div>
  );
};

export default Archive;
