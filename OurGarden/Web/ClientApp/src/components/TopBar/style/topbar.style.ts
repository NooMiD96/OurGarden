import styled from "styled-components";

export default styled.div`
  .header-wrapper {
    justify-content: flex-end;

    .ant-col {
      display: flex;
      justify-content: flex-end;
      flex: 0 1 60%;

      .ant-input-affix-wrapper {
        display: flex;
        flex: 1 1 auto;
        width: auto;
      }

      .ant-typography {
        display: flex;
        align-items: center
      }
    }
  }
`;
