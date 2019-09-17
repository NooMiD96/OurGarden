import * as React from "react";
import { Link } from "react-router-dom";

const GenerateLink = ({
  title,
  link,
  active = true
}: {
  title: string;
  link: string;
  active?: boolean;
}) => {
  const toLink = link.replace(/\s/g, "-");

  return (
    active ? (
      <Link to={`/${toLink}`} className="nav-link active">
        {title}
      </Link>
    ) : (
      <span className="nav-link disabled">{title}</span>
    )
  );
};

export default GenerateLink;
