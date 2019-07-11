import styled from "styled-components";

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

              .slick-slide-content {
                display: flex !important;
                height: 100%;

                .slick-slide-content-image {
                  flex: 1 1 auto;
                }
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
    position: absolute;
    top: 50%;

    &.carousel-prev-slide {
      left: 0;
    }
    &.carousel-next-slide {
      right: 0;
    }
  }
`;
