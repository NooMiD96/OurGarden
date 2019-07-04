import React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "@src/Store";
import { IAccountState } from "@components/Account/State";
import Account from "@src/components/Account";

const AccountControlComponent = (props: IAccountState & { children: React.ReactNode }) => {

  return (
    props.isUserAuth
      ? props.children
      : <Account />
  );
}

export default connect(
  (state: IApplicationState): IAccountState => ({
    ...state.account,
  })
)(AccountControlComponent as any);
