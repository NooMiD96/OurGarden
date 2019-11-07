import React from "react";

/* eslint-disable jsx-a11y/anchor-is-valid */

const PaginationItemRenderer = (
  page: number,
  type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
  originalElement: React.ReactElement<HTMLElement>
) => {
  return originalElement;
  switch (type) {
    case "prev":
      return (
        <a className="ant-pagination-item-link" title="Предыдущая">
          Предыдущая
        </a>
      );

    case "next":
      return (
        <a className="ant-pagination-item-link" title="Следущая">
          Следущая
        </a>
      );

    default:
      return originalElement;
  }
};

/* eslint-enable jsx-a11y/anchor-is-valid */

export default PaginationItemRenderer;
