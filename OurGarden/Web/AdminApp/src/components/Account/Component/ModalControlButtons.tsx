import * as React from "react";

import Button from "@core/antd/Button";

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
      {props.submitTitle}
    </Button>
  </>
);

export default ModalControlButtons;
