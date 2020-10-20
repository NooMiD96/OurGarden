import React from "react";

import Typography from "@core/antd/Typography";
import Card from "@core/antd/Card";
import GenerateLink from "@src/core/components/GenerateLink";
import DescriptionWrapper from "@src/core/helpers/description/DescriptionWrapper";

import { TState, TComponentState } from "../TState";

import { DESIGN_PAGE_INFO_ID } from "@src/core/constants/staticPages";
import { WHITE_BLOCK } from "@src/core/constants/style";

import "./style/design.style.scss";

const { Paragraph } = Typography;

export class Design extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    if (!props.isDataWasGeted) {
      props.getPageInfo(DESIGN_PAGE_INFO_ID);

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
  }

  render() {
    const { push, pageInfo } = this.props;

    // prettier-ignore
    return (
      <Typography className={`content ourgarden-design ${WHITE_BLOCK}`}>
        <DescriptionWrapper
          description={pageInfo?.description}
          useWysiwygDefaultClassNames={false}
        />

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
              <Paragraph
                ellipsis={{
                  rows: 4,
                  expandable: false,
                }}
              >
                Устройство рулонного газона под ключ.
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

export default Design;
