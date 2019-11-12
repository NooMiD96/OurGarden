import React from "react";

export const PrevArrow = (props: any) => (
  <Arrow {...props} className="carousel-slide-prev" />
);

export const NextArrow = (props: any) => (
  <Arrow {...props} className="carousel-slide-next" />
);

interface IArrow {
  style: object;
  onClick: () => void;
  className: string;
}

const Arrow = ({ style = {}, onClick = () => {}, className = "" }: IArrow) => (
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
