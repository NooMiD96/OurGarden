import * as React from "react";

import { TState, TComponentState } from "../TState";
import { ICategoryItem } from "../State";

import Alert from "@src/core/components/Alert";
import AgGrid from "@src/core/components/AgGrid";

import HomeWrapper from "./style/Home.style";

export class Home extends React.PureComponent<TState, TComponentState> {
  columns = [
    {
      headerName: '123',
      field: '123',
    },
  ];

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
        <AgGrid
          columns={this.columns}
          rowData={[{}] as ICategoryItem[]}
          onDoubleClickHandler={(data: ICategoryItem) => this.setState({ editItem: data })}
        />
      </HomeWrapper>
    );
  }
}
