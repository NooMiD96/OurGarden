import * as React from "react";
import { Link } from "react-router-dom";

const GenerateLink = ({
  title,
  link,
  active = true
}: {
  title: string;
  link?: string;
  active?: boolean;
}) => {
  const displayTitle = title.replace(/-/g, " ");
  const toLink = (link === undefined ? title : link).replace(/\s/g, "-");

  return active ? (
    <Link to={`/${toLink}`} className="nav-link active">
      {displayTitle}
    </Link>
  ) : (
    <span className="nav-link disabled">{displayTitle}</span>
  );
};

export default GenerateLink;
