import {
  AnimationConfigWithPath,
  AnimationConfigWithData,
  AnimationItem,
  AnimationDirection
} from "lottie-web";

export type TLottiePlayer = {
  play(name?: string): void;
  stop(name?: string): void;
  setSpeed(speed: number, name?: string): void;
  setDirection(direction: AnimationDirection, name?: string): void;
  searchAnimations(
    animationData?: any,
    standalone?: boolean,
    renderer?: string
  ): void;
  loadAnimation(
    params: AnimationConfigWithPath | AnimationConfigWithData
  ): AnimationItem;
  destroy(name?: string): void;
  registerAnimation(element: Element, animationData?: any): void;
  setQuality(quality: string | number): void;
};

export type TIcons = "archive" | "loading" | "remove" | "search";

export interface ILottieWebIconProps {
  type: TIcons;
  onClick?: () => void;
  isActive?: boolean;
}
