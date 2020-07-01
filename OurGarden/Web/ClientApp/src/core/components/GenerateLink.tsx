import * as React from "react";
import { Link } from "react-router-dom";

const GenerateLink = ({
  title,
  link,
  active = true,
  onClick,
}: {
  title: string;
  link: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) => {
  const toLink = link.replace(/\s/g, "-").replace(/^\//g, "");

  return active ? (
    <Link
      title={title}
      to={`/${toLink}`}
      onClick={onClick}
      className="nav-link active"
    >
      {title}
    </Link>
  ) : (
    <span title={title} className="nav-link disabled">
      {title}
    </span>
  );
};

export default GenerateLink;
