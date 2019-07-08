import styled from "styled-components";
import { darkGreyColor, darkGreenColor, lightGreenColor, greenColor } from "@src/core/constants";

export default styled.div`
  .navigation {
    .ant-tabs-bar {
      border-color: transparent;

      .ant-tabs-nav {
        width: 100%;

        > div:first-child {
          display: flex;

          .ant-tabs-tab {
            display: flex;
            flex: 1 1 auto;
            justify-content: center;
            padding: 0;

            .nav-link {
              width: 100%;
              padding: 12px 16px;

              font-size: 18px;
              color: ${darkGreyColor};

              text-align: center;
            }
            
            &.ant-tabs-tab-active {
              .nav-link {
                color: ${darkGreenColor}
              }
            }

            .nav-link {
              &:hover {
                color: ${greenColor};
              }
            }
          }

        }

        .ant-tabs-ink-bar {
          display: none !important;
        }
      }
    }

  }
`
