export interface IMetaDataFormProps {
    checkboxText: string;
    value?: string;
    onChange?: (value: string | undefined) => void;
    minRows?: number;
    maxRows?: number;
}

export interface IMetaDataFormState {
    isEditable: boolean;
    metaValue: string;
}
