import styled from "styled-components";

export default styled.div`
  flex: 1 1 auto;

  .ant-carousel {
    height: 100%;

    div > div {
      height: 100%;
    }

    .slick-slider.slick-initialized {
      text-align: center;
      height: 50%;
      overflow: hidden;

      .slick-dots.slick-dots-bottom {
        height: 11px;
        bottom: 0px;
        padding-top: 4px;

        background-color: rgba(0,0,0,0.5);
      }

    }

  }
`;
