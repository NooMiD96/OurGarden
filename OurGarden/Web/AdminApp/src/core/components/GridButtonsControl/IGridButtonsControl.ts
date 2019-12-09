import AgGrid from "@src/core/components/AgGrid";

export interface IGridButtonsControl<T> {
  onRefresh?: () => void;
  onRemove?: (data: T[]) => void;
  gridRef?: React.RefObject<AgGrid<any>>;
  removeTitle?: string;
  onAdd?: () => void;
}
