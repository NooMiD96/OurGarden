import * as React from "react";
import { Link } from "react-router-dom";

const GenerateLink = ({
  title,
  link,
  active = true,
  onClick,
  className = "",
  linkClassName = "",
}: {
  title: string;
  link: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  className?: string;
  linkClassName?: string;
}) => {
  const toLink = link.replace(/\s/g, "-").replace(/^\//g, "");

  const wrapperClassName = `nav-link-wrapper ${className}`;
  let linkComponent = (
    <span title={title} className={`nav-link disabled ${linkClassName}`}>
      {title}
    </span>
  );

  if (active) {
    linkComponent = (
      <Link
        title={title}
        to={`/${toLink}`}
        onClick={onClick}
        className={`nav-link active ${linkClassName}`}
      >
        {title}
      </Link>
    );
  }

  return <div className={wrapperClassName}>{linkComponent}</div>;
};

export default GenerateLink;
