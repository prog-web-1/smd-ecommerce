import { IColumn } from "../../components/ListPage/ListPage";
import {
  openDeleteModal,
  openDetailsModal,
} from "./ModalsProvider/ModalsProvider";

export function getColumns() {
  const userActions = [
    {
      label: "Detalhes",
      callback: (entity: Record<string, unknown>) => {
        openDetailsModal(entity);
      },
    },
    {
      label: "Remover",
      callback: (entity: Record<string, unknown>) => {
        openDeleteModal(entity);
      },
    },
  ];

  const columns: IColumn[] = [
    {
      type: "string",
      label: "Cliente",
      control: "client",
      orderControl: "cliente",
    },
    {
      type: "string",
      label: "Valor",
      control: "value",
      orderControl: "valorTotal",
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
      orderControl: "data_hora",
    },
    {
      type: "action",
      label: "Ações",
      control: "action",
      actions: userActions,
    },
  ];

  return columns;
}
