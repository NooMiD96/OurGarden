import React from "react";

import { Title, Text } from "@core/antd/Typography";

import "./style/PageNotFound.style.scss";
import GenerateLink from "../GenerateLink";

export const PageNotFound = () => (
  <div className="page-not-found content white-background grey-border p25">
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
      {/* prettier-ignore */ " "}
      <GenerateLink link="/" title="перейти на главную" />
    </Text>
  </div>
);

export default PageNotFound;
