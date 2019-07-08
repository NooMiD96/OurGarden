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

    return () => archiveAnimation!.destroy();
  }, [])

  return (
    <div
      ref={archiveEl}
      style={{maxWidth: "32px"}}
      className="archive-icon"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  )
}

export default Archive;
