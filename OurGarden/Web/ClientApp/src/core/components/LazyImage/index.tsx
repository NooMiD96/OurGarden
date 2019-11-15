import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./style/LazyImage.style.scss";
import "react-lazy-load-image-component/src/effects/opacity.css";

interface ILazyImage {
  alt: string;
  src: string;
  style?: object;
  className?: string;
  threshold?: number;
}

export const placeholderSrc
  = "\"data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'/>\"";

const LazyImage = ({ alt, src, ...props }: ILazyImage) => (
  <LazyLoadImage
    alt={alt}
    src={src}
    placeholderSrc={placeholderSrc}
    effect="opacity"
    placeholder={<span />}
    wrapperClassName
    {...props}
  />
);

export default LazyImage;
