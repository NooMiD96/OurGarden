import React from "react";

import "./style/Arrows.style.scss";

export const PrevArrow = (props: any) => (
  <Arrow
    {...props}
    aria-label="Предыдущая новость"
    className="carousel-slide-prev"
  />
);

export const NextArrow = (props: any) => (
  <Arrow
    {...props}
    aria-label="Следующая новость"
    className="carousel-slide-next"
  />
);

interface IArrow {
  style?: React.CSSProperties;
  onClick?: () => void;
  className: string;
  [key: string]: any;
}

const Arrow = ({
  style = undefined,
  onClick = undefined,
  className = "",
  ...props
}: IArrow) => (
  <div
    className={`carousel-slide-changer ${className}`}
    style={style}
    onClick={onClick}
    onKeyDown={onClick}
    role="button"
    tabIndex={-1}
    {...props}
  >
    <span className="carousel-slide" />
  </div>
);
