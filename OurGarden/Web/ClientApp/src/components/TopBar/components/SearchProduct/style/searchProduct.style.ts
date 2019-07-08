import styled from "styled-components";

import { mainColor, greyColor, lightGreyColor, greyShadowStyle } from "@src/core/constants";

export default styled.div`
  flex: 1 1 auto;
  align-items: flex-end;
  display: flex;
  height: 28px;
  display: flex;
  align-self: flex-end;

  .ant-select.ant-select-auto-complete {
    width: 100%;

    .ant-select-selection.ant-select-selection--single {
      height: 28px;

      .ant-select-selection__placeholder {
        margin-left: 40px;
        color: ${lightGreyColor};
        font-style: italic;
        font-weight: 100;
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
            font-style: italic;
            height: 28px;
            font-size: 16px;
            background-color: ${lightGreyColor};
            border-color: ${lightGreyColor};

            &:hover {
              background-color: ${greyColor};
            }
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
