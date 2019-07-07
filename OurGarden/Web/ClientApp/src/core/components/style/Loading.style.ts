import styled from "styled-components";

import { mainColor } from "@src/core/constants";

export default styled.div`
  display: flex;
  height: 100%;

  padding: 1.5em 0;

  align-items: center;
  justify-content: center;

  .loading-icon {
    height: 25%;
    width: 25%;

    path {
      fill: ${mainColor};
    }
  }
`;
