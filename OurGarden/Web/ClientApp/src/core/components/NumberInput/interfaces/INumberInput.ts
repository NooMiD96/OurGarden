import { InputProps } from "@core/antd/Input";
import { IPressEnterEvent } from "@src/core/interfaces/IEvents";

export interface INumberInput extends InputProps {
  value: string;
  onValueChange?: (value: string) => void;
  onBlur?: () => void;
  onPressEnter?: (e: IPressEnterEvent) => void;
}
