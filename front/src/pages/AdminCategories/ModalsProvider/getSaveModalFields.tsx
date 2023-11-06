import { IFormGroupProps } from "../../../components/FormGroup/FormGroup";

interface IGetSaveModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
    onChange: (field: string, value: string | Date | string[] | number)=>void;
    setFieldValidation: (field: string, value: string)=>void;
}

export const fieldValidations = {
    nome: ["mandatory"],
}

export function getSaveModalFields(props: IGetSaveModalFieldsProps) {
    const fields: IFormGroupProps[] = [
        {
            id: "nome",
            label: "Nome",
            type: "text",
            defaultValue: props.initialEntity && props.initialEntity.nome ? props.initialEntity.nome as string : "",
            errorMessage: props.errorMessages && props.errorMessages.nome ? props.errorMessages.nome : "",
            validations: fieldValidations.nome && fieldValidations.nome,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("nome", value);
            }
        },
    ]

    return fields;
}