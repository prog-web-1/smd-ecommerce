import { IColumn } from "../../components/ListPage/ListPage";
import { openDeleteModal, openSaveModal } from "./ModalsProvider/ModalsProvider";

export function getColumns() {
    const userActions = [
        {
            label: "Editar",
            callback: (entity: Record<string, unknown>)=>{
                openSaveModal(entity)
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
            label: "Nome",
            control: "nome",
            orderControl: "nome",
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