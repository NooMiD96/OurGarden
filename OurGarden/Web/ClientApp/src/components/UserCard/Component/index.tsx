import React from "react";

// import Alert from "@core/components/Alert";
import Layout from "@core/antd/Layout";

import UserCardWrapper from "./style/UserCard.style";

import { TState, TComponentState } from "../TState";

const { Content } = Layout;

export class UserCard extends React.PureComponent<TState, TComponentState> {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const { errorInner, cleanErrorInner } = this.props;

    return (
      <UserCardWrapper>
        <Layout>
          <Content>hellow UserCard</Content>
        </Layout>
      </UserCardWrapper>
    );
  }
}

export default UserCard;
