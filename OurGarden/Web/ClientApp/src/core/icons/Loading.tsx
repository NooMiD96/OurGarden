import React, { useRef, useEffect } from "react";

import loadingJson from "@src/assets/svg/loading/loading-V2.json";
import lottie, { AnimationItem } from "lottie-web";

const Loading = () => {
  const loadingEl: React.RefObject<HTMLDivElement> = useRef(null);
  let loadingAnimation: AnimationItem | null = null;

  useEffect(() => {
    loadingAnimation = lottie.loadAnimation({
      container: loadingEl.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loadingJson
    });

    return () => {
      if (loadingAnimation) {
        loadingAnimation.destroy();
      }
    };
  }, []);

  return <div ref={loadingEl} className="loading-icon" />;
};

export default Loading;
