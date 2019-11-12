import React from "react";
import { connect } from "react-redux";

import HeaderHelmet from "@src/core/components/Helmet";

import { getSEOMetaData } from "@src/core/utils/seoInformation";
import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

interface IVideogalery {
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
}

export class Videogalery extends React.PureComponent<IVideogalery, {}> {
  constructor(props: IVideogalery) {
    super(props);

    props.setBreadcrumb({
      breadcrumb: [
        {
          displayName: "Видеогалерея",
          url: "Videogalery",
          order: 1
        }
      ],
      key: "Videogalery"
    });
  }

  render() {
    return (
      <div className="content white-background grey-border p25">
        <HeaderHelmet {...getSEOMetaData("videogalery")} />
        Данный раздел находится в разработке, приходите позднее!
      </div>
    );
  }
}

export default connect(null, {
  setBreadcrumb: breadcrumbActions.setBreadcrumb
})(Videogalery);
