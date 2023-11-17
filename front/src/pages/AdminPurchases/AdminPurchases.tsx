import { useEffect, useState } from "react";
import { ListPage } from "../../components/ListPage/ListPage";
import { getColumns } from "./getColumns";
import { ModalsProvider } from "./ModalsProvider/ModalsProvider";
import { getPurchases } from "./requests";

export let updateEntities: ()=>void;

export default function AdminPurchases() {
    const [entities, setEntities] = useState<Record<string, unknown>[]>([]);
    const [total, setTotal] = useState(1);
    const [offset, setOffset] = useState(0);
    const [filters, setFilters] = useState<Record<string, unknown>>({
        order: "data_hora",
        sort: "DESC",
        limit: 10,
    });
    
    updateEntities = ()=>{
        getPurchases({offset, filters}).then(result=>{
            setEntities(result.data)
            setTotal(result.total)
        })
    }

    useEffect(()=>{
        getPurchases({offset, filters}).then(result=>{
            setEntities(result.data)
            setTotal(result.total)
        })
    }, [offset, filters])

    return (
        <div>
            <ModalsProvider/>
            <ListPage
                title={"Vendas"}
                entities={entities}
                columns={getColumns()}
                filters={[
                    {
                        placeholder: "Filtrar por cliente",
                        control: "cliente",
                        type: "text",
                    },
                    {
                        placeholder: "Filtrar por status",
                        control: "status",
                        type: "select",
                        options: [
                            {
                                label: "Pendente",
                                value: "pendente",
                            },
                            {
                                label: "Aprovada",
                                value: "confirmado",
                            },
                            {
                                label: "Rejeitada",
                                value: "rejeitado",
                            },
                        ]
                    },
                ]}
                defaultFilter={{
                    order: "data_hora",
                    sort: "DESC",
                    limit: 10,
                }}
                filtersSearchCallBack={(filters: Record<string, unknown>)=>{
                    setFilters(filters);
                    setOffset(0);
                }}
                offset={offset}
                setOffset={(offset: number)=>{
                    setOffset(offset);
                }}
                total={total}
            />
        </div>
    )
}