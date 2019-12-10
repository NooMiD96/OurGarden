import Form, { FormComponentProps, WrappedFormUtils } from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import "antd/lib/form/style/index.css";
import "antd/lib/grid/style/index.css";

const hasErrors = (fieldsError: any): boolean =>
  Object.keys(fieldsError).some((field) => fieldsError[field]);

export { FormItem, FormComponentProps, WrappedFormUtils, hasErrors };

export default Form;
