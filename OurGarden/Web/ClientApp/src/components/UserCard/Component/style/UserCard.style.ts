import styled from "styled-components";
import { greyColor, greyShadowStyle, borderColor, darkGreenColor, lightGreenColor, greenColor } from "@src/core/constants";

export default styled.div`
  flex: 0 1 auto;
  overflow: auto;
  background: #fff;
  border: 1px solid ${borderColor};

  .ant-table {
    color: #000;

    .ant-table-thead > tr {
      & > th {
        text-align: center;
      }
    }
  
    .ant-table-tbody > tr > td {
      font-family: 'Gilroy';
      text-align: center;
  
      .product-name {
        margin-left: 1rem;
      }

      .product-count-input.ant-input {
        &:hover {
          border-color: ${greyColor};
        }

        &:focus {
          border-color: ${greyColor};
          box-shadow: ${greyShadowStyle};
        }
      }
    }
  }

  h1.ant-typography {
    font-family: 'BerlingskeSerif';
    font-weight: bolder;
    margin-bottom: 0.5rem;
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
