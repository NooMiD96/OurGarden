import React from "react";

const EmptyOption = () => ({
  disabled: true,
  label: (
    <div key="search-list-is-empty" className="search-list-is-empty">
      По вашему запросу ничего не найдено...
    </div>
  )
});

export default EmptyOption;
