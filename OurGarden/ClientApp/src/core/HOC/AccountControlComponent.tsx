import * as React from "react";
import { connect } from "react-redux";
import { RouterState, replace } from "connected-react-router";

import { ApplicationState } from "@src/Store";
import { UserTypeEnums } from "@core/constants";
import { isUserHavePermissions } from "@core/helpers/route/isUserHavePermissions";

type TComponentProps = { userType: UserTypeEnums } & RouterState;

class AccountControlComponent extends React.Component<TComponentProps, {isRenderChildren: boolean}> {
  constructor(props: TComponentProps) {
    super(props);

    let isHavePermissions = false;
    try {
      isHavePermissions = isUserHavePermissions(
        props.userType,
        props.location.pathname
      );
    } catch {}  // tslint:disable-line:no-empty

    this.state = {
      isRenderChildren: isHavePermissions,
    };
  }

  componentDidMount() {
    const props = this.props;
    const isHavePermissions = isUserHavePermissions(
      props.userType,
      props.location.pathname
    );
    if (!isHavePermissions) {
      (props as any).dispatch(replace("/"));
    }
  }
  /**
   * If the user state was changed and haven't permission
   * then skip the update and wait for change location
   * If the location was changed
   * then that was the changed by the user or app (check permission again)
   */
  shouldComponentUpdate(nextProps: TComponentProps, nextState: any) {
    if (this.props.userType !== nextProps.userType) {
      const isHavePermissions = isUserHavePermissions(
        nextProps.userType,
        nextProps.location.pathname
      );
      if (!isHavePermissions) {
        (this.props as any).dispatch(replace("/"));
      }
      return isHavePermissions;
    }
    if (this.props.location !== nextProps.location) {
      const isHavePermissions = isUserHavePermissions(
        nextProps.userType,
        nextProps.location.pathname
      );
      if (!isHavePermissions) {
        (this.props as any).dispatch(replace("/"));
      } else if (!this.state.isRenderChildren) {
        this.setState({
          isRenderChildren: true,
        });
      }
      return isHavePermissions;
    }
    return true;
  }
  /**
   * If user state was changed, and we on Admin/Employee page
   * then redirect user on home page
   */

  render() {
    return (
      this.state.isRenderChildren
        ? this.props.children
        : <div />
    );
  }
}

export default connect(
  (state: ApplicationState): TComponentProps => ({
    userType: state.account.userType,
    ...state.router,
  })
)(AccountControlComponent);
