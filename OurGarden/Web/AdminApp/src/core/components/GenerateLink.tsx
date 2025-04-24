import * as React from "react";
import { Link } from "react-router-dom";

const GenerateLink = ({
  title,
  link,
  active = true,
}: {
  title: string;
  link?: string;
  active?: boolean;
}) => {
  let linkComponent = <span>{title}</span>;
  if (active) {
    linkComponent = (
      <Link
        to={"/" + (link === undefined ? title : link).replace(/\s/g, "-")}
        className="nav-link"
      >
        {title}
      </Link>
    );
  }

  return linkComponent;
};

export default GenerateLink;
