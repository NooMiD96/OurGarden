import * as React from "react";
import Alert, { AlertProps } from "@core/antd/Alert";
import Row from "@core/antd/Row";
import Col from "@core/antd/Col";

//eslint-disable-next-line react/display-name
export default (props: AlertProps) =>
  props.message ? (
    <Row>
      <Col
        md={{ span: 12, offset: 6 }}
        lg={{ span: 8, offset: 8 }}
        xs={{ span: 24 }}
      >
        <Alert showIcon={props.type === "error"} {...props} />
      </Col>
    </Row>
  ) : (
    <div />
  );
