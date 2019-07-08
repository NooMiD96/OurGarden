import React, {useRef, useEffect, useState} from "react";

import searchJson from "@src/assets/svg/search/search-to-x.json";
import lottie, { AnimationItem } from "lottie-web";

const Search = (props: {isActive: boolean; onClick: () => void}) => {
  const [searchAnimation, setSearchAnimation] = useState(null as AnimationItem | null);
  const searchEl: React.RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    setSearchAnimation(lottie.loadAnimation({
      container: searchEl.current!,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: searchJson
    }));

    return () => searchAnimation!.destroy();
  }, []);

  useEffect(() => {
    if (searchAnimation) {
      searchAnimation.setDirection(props.isActive ? 1 : -1);
      searchAnimation.play();
    }
  }, [props.isActive]);

  return (
    <div
      ref={searchEl}
      className="search-icon"
      style={{maxWidth: "22px"}}
      onClick={props.onClick}
    />
  )
}

export default Search;
