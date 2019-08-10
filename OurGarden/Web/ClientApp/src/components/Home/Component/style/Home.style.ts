import styled from "styled-components";
import { darkGreenColor, arrowBorderColor } from "@src/core/constants";

export default styled.div`
  flex: 0 1 50%;
  position: relative;

  .ant-carousel {
    height: 100%;

    .slick-slider.slick-initialized {
      height: 100%;
      text-align: center;
      overflow: hidden;

      .slick-list {
        height: 100%;

        .slick-track{
          height: 100%;

          .slick-slide {
            & > div {
              height: 100%;
              display: flex;
              align-items: center;

              .slick-slide-content-image {
                max-width: 100%;
                max-height: 100%;
                background: center / contain no-repeat;
              }
            }
          }
        }
      }

      .slick-dots.slick-dots-bottom {
        height: 24px;

        & > li {
          vertical-align: middle;

          & > button {
            height: 16px;
            border-radius: 50%;
          }

          &.slick-active > button {
            height: 24px;
          }
        }
      }

    }

  }

  .carousel-slide-changer {
    height: 56px;
    width: 56px;
    border-radius: 50%;

    position: absolute;
    top: calc(50% - 28px);
    cursor: pointer;

    background-color: ${darkGreenColor};

    > .carousel-slide {
      position: absolute;
      top: calc(50% - 12px);

      &::after {
        height: 24px;
        width: 20px;
        content: ' ';
        position: absolute;
      }
    }

    &.carousel-slide-prev {
      left: 0;

      > .carousel-slide {
        left: calc(50% - 12px);

        &::after {
          border-top: 12px solid transparent;
          border-right: 20px solid ${arrowBorderColor};
          border-bottom: 12px solid transparent;
          border-left: 0;
          transition: border-right-color 0.3s;
        }
      }

      &:hover > .carousel-slide::after {
        border-right-color: #fff;
      }
    }
    &.carousel-slide-next {
      right: 0;

      > .carousel-slide {
        right: calc(50% + 8px);

        &::after {
          border-top: 12px solid transparent;
          border-left: 20px solid ${arrowBorderColor};
          border-bottom: 12px solid transparent;
          border-right: 0;
          transition: border-left-color 0.3s;
        }
      }

      &:hover > .carousel-slide::after {
        border-left-color: #fff;
      }
    }
  }
`;
