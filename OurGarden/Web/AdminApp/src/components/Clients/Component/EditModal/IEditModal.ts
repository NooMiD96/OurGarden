import { IClient, IClientDTO } from "../../State";
import { FormComponentProps } from "@core/antd/Form";

interface IEditModal {
  item: IClient | null;
  handleCreateSubmit: (data: IClientDTO) => void;
  handleClose: () => void;
}

export interface IEditModalProps extends IEditModal {
  isShow: boolean;
}

export interface IEditModalContentProps extends FormComponentProps, IEditModal {
  loading: boolean;
}
