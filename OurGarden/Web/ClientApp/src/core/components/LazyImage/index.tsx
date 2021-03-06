import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./style/LazyImage.style.scss";
import "react-lazy-load-image-component/src/effects/opacity.css";

interface ILazyImage {
  alt: string;
  src: string;
  style?: any;
  className?: string;
  threshold?: number;
  visibleByDefault?: boolean;
  title?: string;
}

type TLazyImage = ILazyImage & React.HTMLAttributes<HTMLImageElement>;

// prettier-ignore
export const placeholderSrc
  = "\"data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'/>\"";

const LazyImage = ({ alt, src, ...props }: TLazyImage) => (
  <LazyLoadImage
    alt={alt}
    src={src}
    placeholderSrc={placeholderSrc}
    effect="opacity"
    placeholder={<span />}
    {...props}
  />
);

export default LazyImage;
