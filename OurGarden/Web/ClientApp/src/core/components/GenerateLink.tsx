import * as React from "react";
import { Link } from "react-router-dom";

const GenerateLink = ({
  title,
  link,
  active = true,
  onClick,
  linkClassName = "",
}: {
  title: string;
  link: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  linkClassName?: string;
}) => {
  const toLink = link.replace(/\s/g, "-").replace(/^\//g, "");

  return active ? (
    <Link
      title={title}
      to={`/${toLink}`}
      onClick={onClick}
      className={`nav-link active ${linkClassName}`}
    >
      {title}
    </Link>
  ) : (
    <span title={title} className={`nav-link disabled ${linkClassName}`}>
      {title}
    </span>
  );
};

export default GenerateLink;
