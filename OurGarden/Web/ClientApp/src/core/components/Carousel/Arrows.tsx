import React from "react";

import "./style/Arrows.style.scss";

export const PrevArrow = (props: any) => (
  <Arrow {...props} className="carousel-slide-prev" />
);

export const NextArrow = (props: any) => (
  <Arrow {...props} className="carousel-slide-next" />
);

interface IArrow {
  style?: React.CSSProperties;
  onClick?: () => void;
  className: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const Arrow = ({
  style = undefined,
  onClick = undefined,
  className = "",
}: IArrow) => (
  <div
    className={`carousel-slide-changer ${className}`}
    style={style}
    onClick={onClick}
    onKeyDown={onClick}
    role="button"
    tabIndex={-1}
  >
    <span className="carousel-slide" />
  </div>
);
