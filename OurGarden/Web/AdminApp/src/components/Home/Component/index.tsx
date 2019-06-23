import * as React from "react";

import { TState, TComponentState } from "@components/Home/TState";
import Alert from "@src/core/components/Alert";

import HomeWrapper from "./style/Home.style";

export class Home extends React.PureComponent<TState, TComponentState> {
  render() {
    const {
      errorInner,
      cleanErrorInner,
    } = this.props;

    return (
      <HomeWrapper>
        {
          errorInner && (
            <Alert
              message="Ошибка"
              description={errorInner}
              type="error"
              closable
              style={{ marginBottom: 10 }}
              onClose={cleanErrorInner}
            />
          )
        }
        HELLOW
      </HomeWrapper>
    );
  }
}
