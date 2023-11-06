import { IFormGroupProps } from "../../../components/FormGroup/FormGroup";

interface IGetSaveModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
    onChange: (field: string, value: string | Date | string[] | number | Record<string, unknown>)=>void;
    setFieldValidation: (field: string, value: string)=>void;
    categoriesOptions: {label: string, value: string}[];
}

export const fieldValidations = {
    nome: ["mandatory"],
    foto: ["mandatory"],
    descricao: ["mandatory"],
    preco: ["number"],
    quantidade: ["number"],
    category: ["number"],
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
        {
            id: "foto",
            label: "Foto",
            type: "image",
            defaultValue: props.initialEntity && props.initialEntity.foto ? props.initialEntity.foto as string : "",
            errorMessage: props.errorMessages && props.errorMessages.foto ? props.errorMessages.foto : "",
            validations: fieldValidations.foto && fieldValidations.foto,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("foto", value);
            }
        },
        {
            id: "descricao",
            label: "Descrição",
            type: "text",
            defaultValue: props.initialEntity && props.initialEntity.descricao ? props.initialEntity.descricao as string : "",
            errorMessage: props.errorMessages && props.errorMessages.descricao ? props.errorMessages.descricao : "",
            validations: fieldValidations.descricao && fieldValidations.descricao,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("descricao", value);
            }
        },
        {
            id: "preco",
            label: "Preço",
            type: "number",
            defaultValue: props.initialEntity && props.initialEntity.preco ? props.initialEntity.preco as string : "",
            errorMessage: props.errorMessages && props.errorMessages.preco ? props.errorMessages.preco : "",
            validations: fieldValidations.preco && fieldValidations.preco,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("preco", parseFloat(value as string));
            }
        },
        {
            id: "quantidade",
            label: "Estoque",
            type: "number",
            defaultValue: props.initialEntity && props.initialEntity.quantidade ? props.initialEntity.quantidade as string : "",
            errorMessage: props.errorMessages && props.errorMessages.quantidade ? props.errorMessages.quantidade : "",
            validations: fieldValidations.quantidade && fieldValidations.quantidade,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("quantidade", parseInt(value as string));
            },
        },
        {
            id: "category",
            label: "Categoria",
            type: "select",
            options: props.categoriesOptions,
            defaultValue: props.initialEntity && props.initialEntity.category ? (props.initialEntity.category as Record<string, unknown>).id as string : "",
            errorMessage: props.errorMessages && props.errorMessages.category ? props.errorMessages.category : "",
            validations: fieldValidations.category && fieldValidations.category,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("category", {id: parseInt(value as string)});
            },
        },
    ]

    return fields;
}