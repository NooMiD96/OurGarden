import { INews, INewsDTO } from "../../State";
import { FormComponentProps } from "@core/antd/Form";

interface IEditModal {
  item: INews | null;
  handleCreateSubmit: (data: INewsDTO) => void;
  handleClose: () => void;
}

export interface IEditModalProps extends IEditModal {
  isShow: boolean;
}

export interface IEditModalContentProps extends FormComponentProps, IEditModal {
  loading: boolean;
}
