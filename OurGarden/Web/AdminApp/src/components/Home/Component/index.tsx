import * as React from "react";

import { TState, TComponentState } from "@components/Home/TState";
import Alert from "@src/core/components/Alert";
import { Title, Paragraph } from "@core/antd/Typography";

import HomeWrapper from "./style/Home.style";

// prettier-ignore
const helps = [
  (children: any) => (
    <Paragraph key="product-cost">
      {children}
      . Убедительная просьба, не удалять у товаров цены. Поскольку
      пользователи, зайдя на сайт, не будут понимать даже ориентировочную цену.
      Даже если они сделают заказ товара, которого сейчас нет, то от этого никто
      ничего не потеряет. Мы всё равно им звоним, оплаты онлайн нету, в крайнем
      случае они сделают предзаказ.
    </Paragraph>
  ),

  (children: any) => (
    <Paragraph key="news-product_link">
      {children}
      . Убедительная просьба, в новостях указывать ссылки на
      категории/подкатегории/товары, о которых идёт речь. Например предзаказ
      картофеля - укажите в тексте ссылку (кнопка в меню ввода текста, между
      курсивом и списком). Так пользователю не нужно будет самому искать о чем
      идёт речь.
    </Paragraph>
  ),

  (children: any) => (
    <Paragraph key="news-text">
      {children}
      . Убедительная просьба, не оставлять новости совсем без текста. Если речь идёт
      о, например, скидке, и пользователь в неё заходит, то лично у меня было бы
      непонимание. Подойдёт хотя бы простое перечисление категорий/подкатегорий, с
      соответствующими ссылками на них.
    </Paragraph>
  ),

  () => (
    <Paragraph key="help-email">
      В случае появления каких-то проблем или пожеланий, писать на почту&nbsp;
      <a className="email-wrapper" href="mailto:help@наш-сад.com">
        <span className="text">help@наш-сад.com</span>
      </a>
    </Paragraph>
  ),
];

export class Home extends React.PureComponent<TState, TComponentState> {
  render() {
    const { errorInner, cleanErrorInner } = this.props;

    return (
      <HomeWrapper>
        {errorInner && (
          <Alert
            message="Ошибка"
            description={errorInner}
            type="error"
            closable
            style={{ marginBottom: 10 }}
            onClose={cleanErrorInner}
          />
        )}
        <Title className="home-title">Обновления и новости</Title>

        {helps.map((val, index) => val(index + 1))}
      </HomeWrapper>
    );
  }
}
