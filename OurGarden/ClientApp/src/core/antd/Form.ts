import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { FormComponentProps, WrappedFormUtils } from "antd/lib/form/Form";
import "antd/es/form/style/index.css";
import "antd/es/grid/style/index.css";

const hasErrors = (fieldsError: any): boolean =>
    Object.keys(fieldsError).some(field => fieldsError[field]);

export {
    FormItem,
    FormComponentProps,
    WrappedFormUtils,
    hasErrors,
};

export default Form;
