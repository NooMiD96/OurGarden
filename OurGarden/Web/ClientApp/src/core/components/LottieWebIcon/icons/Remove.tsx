import React, { useRef, useEffect, useState } from "react";

import Svg from "@core/components/Svg";

import { getJsonIcon } from "../utils";

import { AnimationItem } from "lottie-web";
import { TLottiePlayer } from "../ILottieWebIcon";

interface IRemove {
  onClick?: () => void;
  lottie: TLottiePlayer | null;
}

const Remove = ({ onClick, lottie }: IRemove) => {
  const removeEl: React.RefObject<HTMLDivElement> = useRef(null);
  const [removeAnimation, setRemoveAnimation] = useState<AnimationItem | null>(
    null
  );

  const onMouseEnter = () => {
    if (removeAnimation) {
      removeAnimation.setDirection(1);
      removeAnimation.play();
    }
  };
  const onMouseLeave = () => {
    if (removeAnimation) {
      removeAnimation.setDirection(-1);
      removeAnimation.play();
    }
  };

  useEffect(() => {
    if (!lottie) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }

    const setAnimation = async () => {
      const json = await getJsonIcon("remove");

      if (removeEl.current) {
        setRemoveAnimation(
          lottie.loadAnimation({
            container: removeEl.current,
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
      if (removeAnimation) {
        removeAnimation.destroy();
      }
    };
  }, [lottie]);

  const props = {
    className: "remove-icon",
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
    "aria-label": "Удалить товар",
    role: "link"
  };

  return (
    <div ref={removeEl} {...props}>
      {(!lottie || !removeAnimation) && <Svg type="remove" />}
    </div>
  );
};

export default Remove;
