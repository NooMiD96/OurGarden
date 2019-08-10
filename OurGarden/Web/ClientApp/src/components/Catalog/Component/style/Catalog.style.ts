import styled from "styled-components";
import { darkGreenColor } from "@src/core/constants";

export default styled.div`
  flex-shrink: 1;
  padding: 0 8px;

  .ant-col.card-wrapper {
    margin-bottom: 28px;
    flex: 0 1 auto;
  }

  .ant-card.ant-card-hoverable {
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
