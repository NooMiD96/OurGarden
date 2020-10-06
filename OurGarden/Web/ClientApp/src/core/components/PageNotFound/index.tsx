import React from "react";

import { Title, Text } from "@core/antd/Typography";
import GenerateLink from "../GenerateLink";

import { WHITE_BLOCK } from "@src/core/constants/style";

import "./style/PageNotFound.style.scss";

// prettier-ignore
export const PageNotFound = () => (
  <div className={`page-not-found content ${WHITE_BLOCK} p25`}>
    <div className="title">
      <Title level={1} className="title-404">
        404
      </Title>
      <Title level={2} className="title-not-found">
        Страница не найдена
      </Title>
    </div>
    <Text className="description">
      К сожалению, мы не смогли найти страницу, которую Вы запрашиваете. Вы
      можете воспользоваться нашим поиском или
      {" "}
      <GenerateLink link="/" title="перейти на главную" className="d-inline" />
      .
    </Text>
  </div>
);

export default PageNotFound;
