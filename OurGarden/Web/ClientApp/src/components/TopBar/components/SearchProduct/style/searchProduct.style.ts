import styled from "styled-components";

import { mainColor, greyColor, lightGreyColor, greyShadowStyle } from "@src/core/constants";

export default styled.div`
  flex: 1 1 auto;
  align-items: flex-end;
  display: flex;

  .ant-select.ant-select-auto-complete {
    width: 100%;

    .ant-select-selection.ant-select-selection--single {
      height: 28px;

      .ant-select-selection__placeholder {
        margin-left: 40px;
        color: ${lightGreyColor};
      }

      .ant-select-search {
        height: 28px;

        .ant-input-wrapper.ant-input-group {
          height: 28px;

          .ant-input-prefix {
            color: ${lightGreyColor};
            top: 58%;
            left: 10px;

            .search-icon {
              path {
                stroke: ${lightGreyColor};
              }
            }
          }

          .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
            border-color: ${greyColor};
          }
          .ant-input {
            height: 28px;

            &:not(:first-child) {
              padding-left: 40px;
            }

            &:hover {
              border-color: ${greyColor};
            }

            &:focus {
              border-color: ${greyColor};
              ${greyShadowStyle}
            }
          }

          .ant-btn {
            height: 28px;
            background-color: ${lightGreyColor};
            border-color: ${lightGreyColor};
          }
        }
      }
    }
  }

  #product-popup-container {
    .loading-auto-select {
      justify-content: center;
      height: 8em;
      padding: 1.5em 0;

      &.ant-select-dropdown-menu-item-disabled {
        cursor: wait;
      }

      .loading-icon {
        width: 100%;

        path {
          fill: ${mainColor};
        }
      }

    }
  }

`;
