import { IFormGroupProps } from "../../../components/FormGroup/FormGroup";

interface IGetSaveModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
    onChange: (field: string, value: string | Date | string[] | number)=>void;
    setFieldValidation: (field: string, value: string)=>void;
}

export const fieldValidations = {
    nome: ["mandatory"],
    login: ["mandatory"],
    email: ["email"],
    endereco: ["mandatory"],
    senha: ["password"],
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
            id: "login",
            label: "Login",
            type: "text",
            defaultValue: props.initialEntity && props.initialEntity.login ? props.initialEntity.login as string : "",
            errorMessage: props.errorMessages && props.errorMessages.login ? props.errorMessages.login : "",
            validations: fieldValidations.login && fieldValidations.login,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("login", value);
            }
        },
        {
            id: "email",
            label: "Email",
            type: "text",
            defaultValue: props.initialEntity && props.initialEntity.email ? props.initialEntity.email as string : "",
            errorMessage: props.errorMessages && props.errorMessages.email ? props.errorMessages.email : "",
            validations: fieldValidations.email && fieldValidations.email,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("email", value);
            }
        },
        {
            id: "endereco",
            label: "Endereço",
            type: "text",
            defaultValue: props.initialEntity && props.initialEntity.endereco ? props.initialEntity.endereco as string : "",
            errorMessage: props.errorMessages && props.errorMessages.endereco ? props.errorMessages.endereco : "",
            validations: fieldValidations.endereco && fieldValidations.endereco,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("endereco", value);
            }
        },
        {
            id: "senha",
            label: "Senha",
            type: "text",
            defaultValue: props.initialEntity && props.initialEntity.senha ? props.initialEntity.senha as string : "",
            errorMessage: props.errorMessages && props.errorMessages.senha ? props.errorMessages.senha : "",
            validations: fieldValidations.senha && fieldValidations.senha,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("senha", value);
            }
        },
    ]

    return fields;
}