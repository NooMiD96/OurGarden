import Modal, { ModalFuncProps } from "antd/es/modal/Modal";
import confirm from "antd/es/modal/confirm";

import "antd/es/modal/style/index.css";
import "./Button";

interface IConfirmReturn {
  destroy: (...args: any[]) => void;
  update: (newConfig: ModalFuncProps) => void;
}

export { confirm, IConfirmReturn };

export default Modal;
