import styled from "styled-components";
import { borderColor, darkGreenColor, lightGreenColor, greenColor } from "@src/core/constants";

export default styled.div`
  flex: 0 1 auto;
  overflow: auto;
  background: #fff;
  border: 1px solid ${borderColor};

  h1.ant-typography {
    font-family: 'BerlingskeSerif';
    font-weight: bolder;
    margin-bottom: 0.5rem;

    &.confirmation-title {
      margin: 1rem 0 1rem 7rem;
    }
  }
  
  .ant-btn {
    border-radius: 0;
    border-color: ${borderColor};
    font-weight: 500;

    &:focus,
    &:active {
      color: ${borderColor};
    }

    &:hover {
      background-color: ${borderColor};
      color: #fff;

      &:focus,
      &:active {
        color: #fff;
      }
    }

    &.ant-btn-primary {
      border-color: ${darkGreenColor};
      background-color: ${darkGreenColor};

      font-weight: 500;

      &:focus,
      &:active {
        color: ${lightGreenColor};
        background-color: ${darkGreenColor};
      }

      &:hover {
        color: ${lightGreenColor};

        &:focus,
        &:active {
          background-color: ${greenColor};
        }
      }
    }
  }
`;
