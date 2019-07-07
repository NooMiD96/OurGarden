import styled from "styled-components";

const svgColor = '#595959';

export default styled.div`
  .header-wrapper {
    justify-content: flex-end;
    margin-top: 10em;

    .ant-col {
      display: flex;
      justify-content: flex-end;
      flex: 0 1 60%;

      @media (max-width: 580px) {
        flex-wrap: wrap;
        flex: 0 1 100%;
      }
      @media (min-width: 580px) {
        > div:first-child {
          margin-left: 0;
        }

        flex: 0 1 100%;
      }
      @media (min-width: 1200px) {
        flex: 0 1 70%;
      }

      > div {
        margin-left: 1.5em;
      }

      .company-info {
        display: flex;
        align-items: flex-end;
      }

      .anticon {
        color: ${svgColor};
        width: 18px;
        margin-right: 0.25em;
        vertical-align: -0.35em;

        > svg {
          fill: currentColor;

          > circle {
            color: white;
          }
        }
      }

      .archive-icon {
        display: flex;

        path {
          stroke: ${svgColor};
        }
      }

    }

  }
`
