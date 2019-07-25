import styled from "styled-components";
import { darkGreenColor } from "@src/core/constants";

export default styled.div`
  flex: 1 1 auto;

  .ant-col.card-wrapper {
    margin-bottom: 32px;
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
      }
    }
  }
`;
