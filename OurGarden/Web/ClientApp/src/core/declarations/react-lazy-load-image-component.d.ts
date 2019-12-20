declare module "react-lazy-load-image-component" {
  import * as React from "react";

  export const LazyLoadImage: React.FunctionComponent<{
    afterLoad?: () => any;
    beforeLoad?: () => any;
    delayMethod?: string;
    delayTime?: number;
    effect?: string;
    placeholder?: React.ReactNode;
    placeholderSrc?: string;
    threshold?: number;
    visibleByDefault?: boolean;
    wrapperClassName?: string;
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
  }>;
  enum DelayMethod {
    debounce = "debounce",
    throttle = "throttle"
  }
  interface LazyComponentProps {
    delayMethod: DelayMethod;
    delayTime: number;
  }
  export const trackWindowScroll: (
    BaseComponent: React.ComponentType<P>
  ) => BaseComponent<P & LazyComponentProps, S>;
  export const LazyLoadComponent: React.FunctionComponent<{
    afterLoad?: () => void;
    beforeLoad?: () => void;
    delayMethod?: DelayMethod;
    delayTime?: number;
    placeholder?: React.ReactNode;
    threshold?: number;
    visibleByDefault?: boolean;
    children: React.ReactNode;
  }>;
}
