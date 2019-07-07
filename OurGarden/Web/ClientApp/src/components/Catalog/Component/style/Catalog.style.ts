import styled from "styled-components";

import { mainColor } from "@src/core/constants";

export default styled.div`
  height: 100%;

  .sider-catalog-header {
    padding: 0.5em 0em;
    text-align: center;
    
    background-color: ${mainColor};
    
    .ant-typography {
      margin: 0 !important;
      color: white;
    }
  }
`;
