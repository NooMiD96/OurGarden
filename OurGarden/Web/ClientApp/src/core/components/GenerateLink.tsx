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

  return active ? (
    <Link title={title} to={`/${toLink}`} className="nav-link active">
      {title}
    </Link>
  ) : (
    <span title={title} className="nav-link disabled">
      {title}
    </span>
  );
};

export default GenerateLink;
