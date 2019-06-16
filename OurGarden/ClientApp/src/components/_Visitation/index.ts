import { connect } from "react-redux";

import { actionCreators } from "./actions";
import {
    TOwnProps,
    TMapStateToProps,
    TMapDispatchToProps,
} from "./TVisitation";
import { Visitation } from "./Component";
import { IApplicationState } from "@src/Store";

const mapStateToProps = (state: IApplicationState, ownProp: TOwnProps): TMapStateToProps => ({
    ...state.visitation,
    ...ownProp,
}) as TMapStateToProps;

const mapDispatchToProps: TMapDispatchToProps = {
    ...actionCreators,
};

export default connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, IApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(Visitation as any) as any;
