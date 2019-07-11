import React, {useRef, useEffect} from "react";

import archiveJson from "@src/assets/svg/archive/archive.json";
import lottie, { AnimationItem } from "lottie-web";

const Archive = () => {
  const archiveEl: React.RefObject<HTMLDivElement> = useRef(null);
  let archiveAnimation: AnimationItem | null = null;

  const onMouseEnter = () => {
    if (archiveAnimation) {
      archiveAnimation.setDirection(1)
      archiveAnimation.play();
    }
  }
  const onMouseLeave = () => {
    if (archiveAnimation) {
      archiveAnimation.setDirection(-1)
      archiveAnimation.play();
    }
  }

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
        archiveAnimation.destroy()
      }
    };
  }, [])

  return (
    <div
      ref={archiveEl}
      className="archive-icon"
      style={{maxWidth: "32px"}}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  )
}

export default Archive;
