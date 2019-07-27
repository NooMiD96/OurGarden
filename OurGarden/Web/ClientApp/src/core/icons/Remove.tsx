import React, { useRef, useEffect } from "react";

import removeJson from "@src/assets/svg/remove/trash-V2.json";
import lottie, { AnimationItem } from "lottie-web";

interface IRemove {
  onClick: () => void;
}

const Remove = (props: IRemove) => {
  const removeEl: React.RefObject<HTMLDivElement> = useRef(null);
  let removeAnimation: AnimationItem | null = null;

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
    removeAnimation = lottie.loadAnimation({
      container: removeEl.current!,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: removeJson
    });

    return () => {
      if (removeAnimation) {
        removeAnimation.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={removeEl}
      className="remove-icon"
      style={{ maxWidth: "32px", cursor: "pointer" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={props.onClick}
      onKeyDown={props.onClick}
      role="link"
    />
  );
};

export default Remove;
