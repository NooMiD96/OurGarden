import Form from "@core/antd/Form";
import { Authentication, IProps } from "./Authentication";

const FormAuthentication = Form.create<IProps>()(Authentication);

export default FormAuthentication as any;
