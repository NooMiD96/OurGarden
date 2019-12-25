import React from "react";

import Typography from "@core/antd/Typography";

const { Paragraph, Title } = Typography;

const titleMainStyle = {
  display: "inline-block",
  fontSize: 22
};

const titleStyle = {
  ...titleMainStyle,
  fontSize: 20
};

const CompanyInfo = () => (
  <Typography className="content ourgarden-design grey-border white-background">
    <Paragraph>
      <Title style={titleMainStyle}>&quot;Наш Сад&quot;&nbsp;</Title>
      предоставляет огромный ассортимент продукции для сада и огорода. Мы
      предлагаем товары высочайшего качества от ведущих зарубежных и
      отечественных производителей. В ассортименте широко представлены последние
      новинки и проверенные временем семена.
    </Paragraph>
    <Paragraph>
      Одним из направлений деятельности нашей компании является
      <Title style={titleStyle}>&nbsp;ландшафтный дизайн&nbsp;</Title>
      {/* prettier-ignore */ ". "}
      Мы поможем самовыразиться Вам и вашему участку, создав неповторимый,
      красивый сад, в котором Вам будет комфортно и уютно.
    </Paragraph>
    <Paragraph>
      Также мы занимаемся
      <Title style={titleStyle}>&nbsp;облагораживанием&nbsp;</Title>
      территории. Формируем, омолаживаем, восстанавливаем ваши деревья и
      кустарники.
    </Paragraph>
  </Typography>
);

export default CompanyInfo;
