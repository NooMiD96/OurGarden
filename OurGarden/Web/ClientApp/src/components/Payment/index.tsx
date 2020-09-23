import React from "react";
import { connect } from "react-redux";

import Typography from "@core/antd/Typography";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

import { ADDRESS, MAIN_MOBILE, WHITE_BLOCK } from "@src/core/constants";

const { Paragraph, Title } = Typography;

interface IPayment {
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
}

export class Payment extends React.PureComponent<IPayment, unknown> {
  constructor(props: IPayment) {
    super(props);

    props.setBreadcrumb({
      breadcrumb: [
        {
          displayName: "Доставка и оплата",
          url: "Payment",
          order: 1,
        },
      ],
      key: "Payment",
    });
  }

  render() {
    return (
      <div className={`content ourgarden-payment ${WHITE_BLOCK}`}>
        <Title>Доставка</Title>
        <Paragraph>
          Уважаемые покупатели! Наш магазин предоставляет возможность доставки
          ваших заказов по Туле и области.
        </Paragraph>
        <Paragraph>
          Доставка на следующий день после оформления заказа при условии наличия
          товара на складе магазина.
        </Paragraph>
        <Paragraph>
          Стоимость доставки в пределах г. Тула:
          <ul>
            <li>При общей стоимости заказа менее 5000 рублей – 290 рублей;</li>
            <li>При общей стоимости заказа более 5000 рублей – бесплатно;</li>
          </ul>
        </Paragraph>
        <Paragraph>
          Доставка за пределы административных границ г. Тула:
          <ul>
            <li>При общей стоимости заказа менее 5000 рублей – 490 рублей;</li>
            <li>При общей стоимости заказа более 5000 рублей – 490 рублей;</li>
          </ul>
        </Paragraph>

        <Title>Заказ</Title>
        <Paragraph>
          После оформления заказа на сайте, наш оператор Вам перезвонит для
          получения дополнительной информации.
        </Paragraph>
        <Paragraph>
          Заказы, которые были оформлены в нерабочее время (вечером и ночью),
          обрабатываются утром следующего дня.
        </Paragraph>
        <Paragraph>
          Сбор и доставка товаров «под заказ» требуют определённого времени.
          Чтобы получить дополнительную информацию о таких товарах, их цену и
          время доставки, Вы можете связаться с нашими операторами. Если
          какой-то из товаров не удалось найти на нашем сайте, Вы так же можете
          уточнить его наличие у наших операторов используя форму обратной связи
          или по телефону
          {` ${MAIN_MOBILE}.`}
        </Paragraph>

        <Title>Оплата</Title>
        <Paragraph>
          1. Оплата в магазине:
          <br />
          Вы можете оплатить свой заказа заранее, в нашем магазине по адресу:
          <br />
          {ADDRESS}
        </Paragraph>

        <Paragraph>
          2. Оплата курьеру:
          <br />
          Вы можете оплатить заказ нашему курьеру после получения и
          подтверждения целостности заказа в том случае, если Вы не оплатили его
          заранее.
        </Paragraph>
      </div>
    );
  }
}

export default connect(null, {
  setBreadcrumb: breadcrumbActions.setBreadcrumb,
})(Payment);
