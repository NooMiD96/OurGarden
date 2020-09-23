import React from "react";
import { connect } from "react-redux";

import { WHITE_BLOCK } from "@src/core/constants";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

interface IVideogalery {
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
}

export class Videogalery extends React.PureComponent<IVideogalery, unknown> {
  constructor(props: IVideogalery) {
    super(props);

    props.setBreadcrumb({
      breadcrumb: [
        {
          displayName: "Видеогалерея",
          url: "Videogalery",
          order: 1,
        },
      ],
      key: "Videogalery",
    });
  }

  render() {
    return (
      <div className={`content ${WHITE_BLOCK} p25`}>
        Данный раздел находится в разработке, приходите позднее!
      </div>
    );
  }
}

export default connect(null, {
  setBreadcrumb: breadcrumbActions.setBreadcrumb,
})(Videogalery);
