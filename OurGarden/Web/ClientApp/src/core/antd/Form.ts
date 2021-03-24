import Form, { FormInstance, useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import "antd/es/form/style/index.css";
import "antd/es/grid/style/index.css";

// prettier-ignore
const hasErrors = (fieldsError: any): boolean => Object.keys(fieldsError).some((field) => fieldsError[field]);

// prettier-ignore
export {
  FormItem,
  useForm,
  FormInstance,
  hasErrors
};

export default Form;
