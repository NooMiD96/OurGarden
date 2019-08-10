import styled from "styled-components";
import { darkGreenColor, greenColor } from "@src/core/constants";

export default styled.div`
  flex-shrink: 1;
  padding: 0 8px;

  .ant-col.card-wrapper {
    margin-bottom: 28px;
    flex: 0 1 auto;
  }

  .ant-card.ant-card-hoverable {
    .ant-card-meta-description {
      color: black;
    }

    &:hover {
      .ant-card-meta-title {
        color: ${darkGreenColor};
        text-decoration: underline;
      }

      .card-description .ant-input-group-addon .ant-btn {
        background-color: ${darkGreenColor};
        color: #fff;

        &:focus,
        &:active {
          background-color: ${greenColor};
          color: #fff;
        }
      }
    }
  }
`;
