import styled from "styled-components";
import { greyColor } from "@src/core/constants";

export default styled.div`
  overflow-x: auto;

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

      .table-product-wrapper {
        display: flex;

        .product-img {
          flex: 1 1 auto;
          max-width: 250px;
        }

        .product-name {
          align-self: center;
          margin-left: 1rem;
        }
      }

      .remove-icon path{
        stroke: ${greyColor};
      }
    }
  }

  .ant-table-wrapper .ant-spin-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    .ant-pagination.ant-table-pagination {
      align-self: flex-end;
    }
  }
`;
