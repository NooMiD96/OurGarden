import { ICategory, ICategoryDTO } from "../../State";
import { FormComponentProps } from "@core/antd/Form";

interface IEditModal {
  item: ICategory | null;
  handleCreateSubmit: (data: ICategoryDTO) => void;
  handleClose: () => void;
}

export interface IEditModalProps extends IEditModal {
  isShow: boolean;
}

export interface IEditModalContentProps extends FormComponentProps, IEditModal {
  loading: boolean;
}
