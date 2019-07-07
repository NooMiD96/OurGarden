import * as React from "react";

import Button from "@core/antd/Button";
import Typography from "@core/antd/Typography";

const { Text } = Typography;

type ModalControlButtonsProps = {
  handleSubmit: () => void;
  loading: boolean;
  submitTitle: string;
};

const ModalControlButtons = (props: ModalControlButtonsProps) => (
  <>
    <Button
      key="submit"
      type="primary"
      loading={props.loading}
      onClick={props.handleSubmit}
    >
      <Text>{props.submitTitle}</Text>
    </Button>
  </>
);

export default ModalControlButtons;
