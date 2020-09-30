export interface ICarouselProps<T> {
  className?: string;
  dataSource: T[];
  onClick?: (x: T, e: React.SyntheticEvent) => void;
  getAlt: (x: T, index: number) => string;
  getTitle: (x: T, index: number) => string;
  getKey: (x: T, index: number) => string;
  getImageSrc: (x: T, isMobile: boolean) => string;
}

export interface ICarouselState {}
