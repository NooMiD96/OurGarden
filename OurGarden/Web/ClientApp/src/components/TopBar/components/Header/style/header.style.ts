import styled from "styled-components";
import { greyColor, lightGreyColor } from "@src/core/constants";

export default styled.div`
  margin-bottom: 1.5em;

  .header-wrapper {
    justify-content: flex-end;
    margin-top: 10em;

    .ant-col {
      display: flex;
      justify-content: flex-end;
      flex: 0 1 60%;

      @media (max-width: 580px) {
        flex-wrap: wrap;
        flex: 0 1 100%;
      }
      @media (min-width: 580px) {
        > div:first-child {
          margin-left: 0;
        }

        flex: 0 1 100%;
      }
      @media (min-width: 1200px) {
        flex: 0 1 70%;
      }

      > div {
        margin-left: 1.5em;
      }

      .company-info {
        display: flex;
        align-items: flex-end;

        color: ${greyColor}
      }

      .anticon {
        color: ${lightGreyColor};
        width: 18px;
        margin-right: 0.25em;
        vertical-align: -0.35em;

        > svg {
          fill: currentColor;

          > circle {
            color: white;
          }
        }
      }

      .archive-icon {
        display: flex;

        path {
          stroke: ${greyColor};
        }
      }

    }

  }
`
