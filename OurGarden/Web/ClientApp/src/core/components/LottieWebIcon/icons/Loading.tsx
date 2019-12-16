import React, { useRef, useEffect, useState } from "react";

import { getJsonIcon } from "../utils";

import { AnimationItem } from "lottie-web";
import { TLottiePlayer } from "../ILottieWebIcon";

interface ILoading {
  lottie: TLottiePlayer | null;
}

const Loading = ({ lottie }: ILoading) => {
  const loadingEl: React.RefObject<HTMLDivElement> = useRef(null);
  const [
    loadingAnimation,
    setLoadingAnimation
  ] = useState<AnimationItem | null>(null);

  useEffect(() => {
    if (!lottie) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }

    const setAnimation = async () => {
      const json = await getJsonIcon("loading");

      if (loadingEl.current) {
        setLoadingAnimation(
          lottie.loadAnimation({
            container: loadingEl.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: json
          })
        );
      }
    };

    setAnimation();

    return () => {
      if (loadingAnimation) {
        loadingAnimation.destroy();
      }
    };
  }, [lottie]);

  return <div ref={loadingEl} className="loading-icon" />;
};

export default Loading;
