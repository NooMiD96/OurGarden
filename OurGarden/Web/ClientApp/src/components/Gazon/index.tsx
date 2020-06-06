import React from "react";
import { connect } from "react-redux";

import HeaderHelmet from "@core/components/Helmet";
import Typography from "@core/antd/Typography";
import MainMobileLink from "@src/core/components/MainMobileLink";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

const { Paragraph, Title } = Typography;

interface IGazon {
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
}

export class Design extends React.PureComponent<IGazon, {}> {
  constructor(props: IGazon) {
    super(props);

    props.setBreadcrumb({
      breadcrumb: [
        {
          displayName: "Ландшафтный дизайн",
          url: "Design",
          order: 1
        },
        {
          displayName: "Рулонный газон",
          url: "rulonnyj-gazon",
          order: 2
        }
      ],
      key: "rulonnyj-gazon"
    });
  }

  // componentDidMount() {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth"
  //   });
  // }

  render() {
    // prettier-ignore
    return (
      <Typography className="content ourgarden-rulonnyj-gazon grey-border white-background">
        <HeaderHelmet seoSectionName="RulonnyjGazon" />

        <Title>Рулонный газон</Title>
        <Paragraph>
          <Typography.Text strong>Рулонный газон — </Typography.Text>
          это экологически чистое покрытие для земельного участка; пророщенная
          трава на дерновой подложке.
          <Typography.Text strong> Газон под ключ </Typography.Text>
          должен иметь равномерный насыщенный зеленый окрас, развитую корневую
          систему с белыми корешками и густой покров без сорняков.
        </Paragraph>
        <Paragraph>
          Рулонный газон может украсить лужайку у частного дома, участок на
          даче, городской газон или парк отдыха — рулон достаточно раскатать и
          полить водой. На таком покрытии приятно играть в мяч, устраивать
          пикники, загорать и весело проводить время всей семьей, оно плотное,
          мягкое и безопасное.
        </Paragraph>
        <Paragraph>
          Трава в рулоне помогает быстро украсить любой земельный участок. Она
          устойчива к жаре, холоду, длительному отсутствию влаги, а также к
          болезням. Качественный рулонный газон прослужит несколько лет и не
          доставит хлопот с уходом: нужно будет лишь своевременно подстригать
          газонокосилкой подросшую траву для придания аккуратного вида.
        </Paragraph>
        <Paragraph>
          Продается
          <Typography.Text strong> газон под ключ </Typography.Text>
          в рулонах
          весом от 15 до 25 кг. Скрутка рулонов должна быть плотная, а края —
          ровные, толщина дерна — от 2 до 2,5 см, а скошенная трава на нем — не
          менее 3 см в высоту. Весь рулон должен быть равномерно обработан
          газонокосилкой, без проплешин, также он должен не осыпаться при
          скручивании и раскручивании. Длительное хранение в свернутом виде
          может привести к порче дерна и увяданию травы, поэтому покупать
          рулонный газон рекомендуется непосредственно перед
          <Typography.Text strong> укладкой.</Typography.Text>
        </Paragraph>

        <Title level={2}>
          Купить рулонный газон в Туле
        </Title>
        <Paragraph>
          <Typography.Text strong>Рулонный газон под ключ </Typography.Text>
          можно купить в Туле, сделав заказ в интернет-магазине компании «Наш Сад».
          На сайте указана цена за м2, а наши сотрудники помогут вам рассчитать необходимое
          количество рулонов для любой площади и формы земельного участка.
        </Paragraph>

        <Paragraph>
          Для этого звоните по номеру
          {" "}
          <MainMobileLink />
          {" "}
          или напишите в чат обратной связи на сайте.
        </Paragraph>
      </Typography>
    );
  }
}

export default connect(null, {
  setBreadcrumb: breadcrumbActions.setBreadcrumb
})(Design);
