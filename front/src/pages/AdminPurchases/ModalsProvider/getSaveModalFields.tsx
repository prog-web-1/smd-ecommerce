import { IFormGroupProps } from "../../../components/FormGroup/FormGroup";

interface IGetSaveModalFieldsProps {
    initialEntity: Record<string, unknown>;
}

export function getSaveModalFields(props: IGetSaveModalFieldsProps) {
    const fields: IFormGroupProps[] = [
        {
            id: "client",
            label: "Cliente",
            type: "text",
            defaultValue: props.initialEntity && props.initialEntity.client ? props.initialEntity.client as string : "",
            placeholder: "",
            size: "100",
            disabled: true,
            onChange: (value: string | Date | string[])=>{/* */}
        },
        {
            id: "date",
            label: "Data",
            type: "text",
            defaultValue: props.initialEntity && props.initialEntity.date ? props.initialEntity.date as string : "",
            placeholder: "",
            size: "100",
            disabled: true,
            onChange: (value: string | Date | string[])=>{/* */}
        },
        {
            id: "value",
            label: "Valor",
            type: "text",
            defaultValue: props.initialEntity && props.initialEntity.value ? props.initialEntity.value as string : "",
            placeholder: "",
            size: "100",
            disabled: true,
            onChange: (value: string | Date | string[])=>{/* */}
        },
        {
            id: "status",
            label: "Status",
            type: "text",
            defaultValue: props.initialEntity && props.initialEntity.status ? props.initialEntity.status as string : "",
            placeholder: "",
            size: "100",
            disabled: true,
            onChange: (value: string | Date | string[])=>{/* */}
        },
        {
            id: "products",
            label: "Produtos",
            type: "text",
            defaultValue: props.initialEntity && props.initialEntity.products ? props.initialEntity.products as string : "",
            placeholder: "",
            size: "100",
            disabled: true,
            onChange: (value: string | Date | string[])=>{/* */}
        },
    ]

    return fields;
}