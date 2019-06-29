import styled from "styled-components";

export default styled.div`
  .navigation {
    .ant-tabs-nav {
      width: 100%;

      > div:first-child {
        display: flex;

        .ant-tabs-tab {
          display: flex;
          flex: 1 1 auto;
          justify-content: center;
          padding: 0;

          .nav-link {
            padding: 12px 16px;
          }
        }

      }
    }

  }
`
