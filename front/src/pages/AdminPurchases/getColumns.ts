import { IColumn } from "../../components/ListPage/ListPage";
import { openDeleteModal } from "./ModalsProvider/ModalsProvider";

export function getColumns() {
    const userActions = [
        {
            label: "Detalhes",
            callback: (entity: Record<string, unknown>)=>{
                //openSaveModal(entity)
            }
        },
        {
            label: "Remover",
            callback: (entity: Record<string, unknown>)=>{
                openDeleteModal(entity)
            }
        }
    ];

    const columns: IColumn[]  = [
        {
            type: "string",
            label: "Cliente",
            control: "client",
            orderControl: "client",
        },
        {
            type: "string",
            label: "Valor",
            control: "value",
            orderControl: "value",
        },
        {
            type: "string",
            label: "Status",
            control: "status",
            orderControl: "status",
        },
        {
            type: "string",
            label: "Data",
            control: "date",
            orderControl: "date",
        },
        {
            type: "action",
            label: "Ações",
            control: "action",
            actions: userActions,
        }
    ]

    return columns;
}