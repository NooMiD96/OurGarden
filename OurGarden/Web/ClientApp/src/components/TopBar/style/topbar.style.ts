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

      .ant-input-affix-wrapper {
        display: flex;
        flex: 1 1 auto;
        width: auto;
      }

      .ant-typography {
        display: flex;
        align-items: flex-end;

        > div {
          margin-left: 1.5em;
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
`;
