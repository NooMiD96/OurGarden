import styled from "styled-components";
import { darkGreenColor } from "@src/core/constants";

export default styled.div`
  flex: 1 1 auto;

  .ant-card.ant-card-hoverable {

    .ant-card-meta-description {
      color: black;

      .card-description {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .card-cost {
          font-size: 18px;
          font-weight: 100;
        }

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
                color: #fff;
              }
            }
          }
        }
      }

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
