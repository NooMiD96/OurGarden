import styled from "styled-components";

import "@src/assets/scss/companyBackground.scss";

export default styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-height: 600px;

  .company-contacts {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    padding-left: 6rem;
    padding: 2rem 5rem;

    @media (max-width: 580px) {
      padding: 2rem 2rem;
    }

    h1 {
      font-family: 'BerlingskeSerif';
      font-weight: bolder;
      font-size: 30px;
      padding-left: calc(1rem + 24px);
    }

    > div {
      display: flex;
      align-items: center;

      .anticon {
        width: 24px;
        margin-right: 1rem;

        + span {
          font-size: 24px;
          font-weight: 100;
        }
      }

      & + div {
        margin-top: 1rem;
      }
    }

  }
  .company-map {
    flex: 1 1 auto;

    .y-map {
      min-height: 250px;
    }
  }
`;
