import { OptionProps } from "@core/antd/Select";

const filterOption = (
  inputValue: string,
  option: React.ReactElement<OptionProps>
) => {
  if (!inputValue) {
    return true;
  }

  if (!option.props.children || typeof option.props.children !== "string") {
    return false;
  }

  return (
    option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
  );
};

export { filterOption };
