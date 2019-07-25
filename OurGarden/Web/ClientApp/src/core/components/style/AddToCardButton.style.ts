import styled from "styled-components";
import { darkGreenColor } from "@src/core/constants";

export default styled.span`
  .ant-input-wrapper.ant-input-group {
    input.ant-input {
      width: 45px;
      padding: 4px 10px;
      border-radius: 0;
      border-color: ${darkGreenColor};
      font-weight: 100;

      &:focus {
        box-shadow: none;
      }
    }

    .ant-input-group-addon {
      padding: 0;
      width: 100%;
      border: 0;

      .ant-btn {
        border-radius: 0;
        border-color: ${darkGreenColor};

        font-weight: 500;

        &:hover {
          background-color: ${darkGreenColor};
          color: #fff;
        }

        &:focus,
        &:active {
          color: ${darkGreenColor};
        }
      }
    }
  }
`;
