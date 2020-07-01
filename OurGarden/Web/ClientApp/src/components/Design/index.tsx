import React from "react";
import { connect } from "react-redux";
import { push as pushAction } from "connected-react-router";

import HeaderHelmet from "@core/components/Helmet";
import Typography from "@core/antd/Typography";
import MainMobileLink from "@src/core/components/MainMobileLink";
import Card from "@core/antd/Card";
import GenerateLink from "@src/core/components/GenerateLink";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

import "./design.style.scss";

const { Paragraph, Title } = Typography;

interface IDesign {
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
  push: typeof pushAction;
}

export class Design extends React.PureComponent<IDesign, {}> {
  constructor(props: IDesign) {
    super(props);

    props.setBreadcrumb({
      breadcrumb: [
        {
          displayName: "Ландшафтный дизайн",
          url: "Design",
          order: 1,
        },
      ],
      key: "Design",
    });
  }

  render() {
    const { push } = this.props;

    // prettier-ignore
    return (
      <Typography className="content ourgarden-design grey-border white-background">
        <HeaderHelmet seoSectionName="Design" />

        <Title>Ландшафтный дизайн</Title>
        <Paragraph>
          <Typography.Text strong>Ландшафтный дизайн участка — </Typography.Text>
          это настоящее междисциплинарное искусство, сочетающее в себе
          проектирование, архитектурные решения и багаж знаний в области
          растениеводства. Ландшафтный дизайн применяется для облагораживания
          территории
          <Typography.Text strong> дачных участков, </Typography.Text>
          парков, скверов, пешеходных зон. Заказывать разработку проекта
          ландшафтного дизайна лучше всего на начальном этапе строительства
          <Typography.Text strong> загородного дома </Typography.Text>
          или создания парка.
        </Paragraph>
        <Paragraph>
          Квалифицированный и опытный ландшафтный дизайнер никогда не работает
          один — созданием
          <Typography.Text strong> декоративного озеленения </Typography.Text>
          должна заниматься команда работников: биологи, дизайнеры и строители,
          иначе добиться оптимального соседства для растений невозможно.
        </Paragraph>

        <Title level={2}>
          Этапы организации гармоничного ландшафтного дизайна участка
        </Title>
        <Paragraph>
          Комплексная работа по
          <Typography.Text strong> благоустройству </Typography.Text>
          участка придаст ему гармоничный вид: растения будут красиво сочетаться
          и прекрасно уживаться друг с другом, а все системы — бесперебойно
          функционировать. Для этого специалисты прибегают к тщательному
          поэтапному изучению участка:
        </Paragraph>
        <Paragraph>
          <ul>
            <li>
              Для подбора растений они собирают данные о типе почвы,
              освещенности и направления движения ветра.
            </li>
            <li>
              Определяют расположение коммуникаций, чтобы избежать их
              повреждения.
            </li>
            <li>
              Совместно с клиентом составляют проекта: утверждают функциональные
              зоны, дорожки, перечень растений, их местоположение на участке,
              список необходимые технических элементов.
            </li>
            <li>
              Подготавливают почву для
              <Typography.Text strong> озеленения участка </Typography.Text>
              , прокладываю труб, монтажу дренажных систем и систем автоматического
              полива, а также устанавливают беседки, мангала, искусственный водоем,
              цветник и многое другое.
            </li>
          </ul>
        </Paragraph>
        <Paragraph>
          <Typography.Text strong>Заказать ландшафтный дизайн под ключ </Typography.Text>
          гораздо выгоднее, чем выбрать отдельные элементы.
        </Paragraph>

        <Title level={3}>Ландшафтный дизайн в Туле</Title>
        <Paragraph>
          Заказать
          <Typography.Text strong> ландшафтный дизайн в Туле </Typography.Text>
          можно у специалистов компании «Наш Сад». Мы разрабатываем проекты быстро и недорого,
          имеем многолетний опыт проведения работ по
          <Typography.Text strong> озеленению участков </Typography.Text>
          любой сложности. Мы
          предоставляем портфолио работ и заключаем договор, точно соблюдая все
          пункты и срок сдачи объекта.
        </Paragraph>

        <Paragraph>
          Звоните по телефону
          {" "}
          <MainMobileLink />
          {" "}
          и заказывайте
          <Typography.Text strong> ландшафтное озеленение территории в Туле. </Typography.Text>
          Также вы можете задать вопросы в чате обратной связи на сайте.
        </Paragraph>

        <Card
          hoverable
          cover={<div className="gazon" />}
          onClick={() => {
            push("rulonnyj-gazon");
          }}
        >
          <Card.Meta
            title="Рулонный газон."
            description={(
              <Paragraph ellipsis={{
                rows: 4,
                expandable: false
              }}
              >
                Устройство рулонного газона под ключ.
                <br />
                <GenerateLink
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  link="rulonnyj-gazon"
                  title="Подробнее..."
                />
              </Paragraph>
            )}
          />
        </Card>
      </Typography>
    );
  }
}

export default connect(null, {
  push: pushAction,
  setBreadcrumb: breadcrumbActions.setBreadcrumb,
})(Design);
