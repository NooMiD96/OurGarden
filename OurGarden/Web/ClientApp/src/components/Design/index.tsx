import React from "react";
import { connect } from "react-redux";

import HeaderHelmet from "@src/core/components/Helmet";
import Typography from "@core/antd/Typography";

import { getSEOMetaData } from "@src/core/utils/seoInformation";
import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

const { Paragraph, Title } = Typography;

interface IDesign {
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
}

export class Design extends React.PureComponent<IDesign, {}> {
  constructor(props: IDesign) {
    super(props);

    props.setBreadcrumb({
      breadcrumb: [{
        displayName: "Ландшафтный дизайн",
        url: "Design",
        order: 1,
      }],
      key: "Design"
    });
  }

  render() {
    return (
      <Typography className="content ourgarden-design">
        <HeaderHelmet
          {...getSEOMetaData("design")}
        />

        <Title>Ландшафтный дизайн</Title>
        <Paragraph>
          &quot;Наш Сад&quot; поможет Вам создать неповторимый, красивый сад, в
          котором Вам будет комфортно и уютно. Мы занимается проектированием,
          озеленением и благоустройством территорий.
        </Paragraph>
        <Title level={2}>Мы поможем самовыразиться Вам и вашему участку.</Title>
        <Paragraph>
          Прежде всего, благоустройство участка - это не только эстетика, но так же
          удобство и комфорт, приятный для работы и досуга.
        </Paragraph>
        <Paragraph>
          Каждый выбирает свой собственный тип сада, основываясь на своем стиле
          жизни. Жесткие элементы ландшафта (мощение, стены, изгороди, перголы и
          многое другое) обеспечивают оформление сада в определенном стиле, придают
          саду форму и образуют его скелет. Мягкие элементы - растения - создают его
          плоть, рисунок и качество. Один и тот же основной проект может совсем
          по-разному выглядеть, если использовать разные идеи по использованию
          растений.
        </Paragraph>
        <Paragraph>
          Ландшафтное проектирование - это важная основа создания или улучшения
          любого сада или приусадебного участка. Это весьма сложный и многогранный
          процесс, проводимый специалистами ландшафтного дизайна. Но, при этом,
          непосредственно от Вас будет зависить выбранный дизайн. На его основании
          ориентируются флористы и проектировщики. Поэтому перед началом
          проектирования желательно продумать свои возможности и желания.
        </Paragraph>
        <Paragraph>
          Специалисты определят, какие виды оформление сада подходят для конкретных
          условий данного участка, а какие нет. Сочетание тщательного планирования и
          мастерского исполнения, а так же определенные знания и понимание растений
          определяют успех задачи.
        </Paragraph>
        <Title level={2}>Подготовительные работы под озеленение участка:</Title>
        <Paragraph>
          <ul>
            <li>
              Завоз плодородного грунта, планировка территории с выравниванием
              грунта под озеленение.
            </li>
            <li>
              При необходимости, культивация почвы, снятие дерновины, прополка от
              сорняка и так далее.
            </li>
            <li>
              Посадка зеленых насаждений, в том числе крупномеры с привлечением
              специализированной техники.
            </li>
            <li>
              Создание ландшафтных форм - рокарии, альпийские горки, декоративные
              пруды, устройство декоративных засыпок, и т.д.
            </li>
            <li>
              Устройство газона - сеяный газон (парковый, мавританский, спортивный)
              или устройство рулонного газона.
            </li>
            <li>Заказ растений по каталогу.</li>
          </ul>
        </Paragraph>

        <Paragraph>
          Мы предоставим полный спектр услуг по ландшафтному озеленению любой
          сложности и обязательно учтем ваши собственные пожелания и идеи. Всю
          сложную работу оставьте на нас и мы поможем подчеркнуть индивидуальность
          вашего участка.
        </Paragraph>
        <Paragraph>
          За детальной информацией позвоните или приходите к нам в офис!
        </Paragraph>
        <Paragraph>
          Наш сад: г. Тула, ул. 9 мая, 36
          <br />
          Телефон: 8-(950)-922-39-19
        </Paragraph>
      </Typography>
    );
  }
}

export default connect(
  null,
  {
    setBreadcrumb: breadcrumbActions.setBreadcrumb
  }
)(Design);
