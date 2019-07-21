import React, { useRef, useEffect } from "react";

import archiveJson from "@src/assets/svg/archive/archive.json";
import lottie, { AnimationItem } from "lottie-web";

interface IArchive {
  onClick: () => void;
}

const Archive = (props: IArchive) => {
  const archiveEl: React.RefObject<HTMLDivElement> = useRef(null);
  let archiveAnimation: AnimationItem | null = null;

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
    archiveAnimation = lottie.loadAnimation({
      container: archiveEl.current!,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: archiveJson
    });

    return () => {
      if (archiveAnimation) {
        archiveAnimation.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={archiveEl}
      className="archive-icon"
      style={{ maxWidth: "32px", cursor: "pointer" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={props.onClick}
      onKeyDown={props.onClick}
      role="link"
    />
  );
};

export default Archive;
