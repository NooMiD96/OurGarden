import styled from "styled-components";
import { darkGreenColor, greyColor, borderColor } from "@src/core/constants";

export default styled.div`
  flex: 1 1 auto;
  background: #fff;
  border: 1px solid ${borderColor};
  padding: 2rem;
  overflow: auto;

  .product-photo {
    max-width: 40%;
    float: left;
    margin: 0rem 1rem 0.5rem 0;
  }

  .product-info {
    .ant-typography {
      font-family: 'BerlingskeSerif';
      font-weight: bolder;
      font-size: 30px;
      padding-right: 30px;
    }

    .product-cost {
      font-size: 21px;
      position: absolute;
      top: 0;
      right: 0;
      color: ${darkGreenColor};
    }

    .product-description {
      font-size: 16px;
      font-weight: 500;
      color: ${greyColor};
    }
  }

  .product-description-wysiwyg {
    font-size: 16px;
    font-weight: 100;
    color: #000;

    margin-top: 0.5rem;
  }

  .card-add-button {
    float: right;
  }
`;
