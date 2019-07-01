import * as React from "react";
import { Link } from "react-router-dom";

const GenerateLink = ({
  title,
  link
}: {
  title: string;
  link?: string;
}) => (
  <Link
    to={(
      "/" +
      (
        link === undefined
          ? title
          : link
      ).replace(" ", "-")
    )}

    className="nav-link"
  >
    {title}
  </Link>
)

export default GenerateLink;
