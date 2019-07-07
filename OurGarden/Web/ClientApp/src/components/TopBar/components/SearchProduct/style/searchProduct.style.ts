import styled from "styled-components";

import { mainColor } from "@src/core/constants";

export default styled.div`
  flex: 1 1 auto;

  .ant-select.ant-select-auto-complete {
    width: 100%;
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
