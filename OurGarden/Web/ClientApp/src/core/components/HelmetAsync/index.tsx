import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouterState } from "connected-react-router";
import { Helmet } from "react-helmet-async";

import { IApplicationState } from "@src/Store";

export const HelmetAsync = ({ location: { pathname } }: RouterState) => {
  const [seoParams, setSeoParams] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await (
        await fetch(
          `/api/Home/GetPageSEOParams?pathname=${encodeURIComponent(pathname)}`
        )
      ).json();

      setSeoParams(result.data);
    };

    fetchData();
  }, [pathname]);

  if (!seoParams) {
    return null;
  }

  return (
    <Helmet>
      <title>Наш Сад</title>
      <meta name="description" content="test-description" />
      <meta name="keywords" content="test-content" />
    </Helmet>
  );
};

export default connect(
  (state: IApplicationState): RouterState => ({
    ...state.router,
  })
)(HelmetAsync);
