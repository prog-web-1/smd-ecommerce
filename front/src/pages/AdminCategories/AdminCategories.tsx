import { useEffect, useState } from "react";
import { ListPage } from "../../components/ListPage/ListPage";
import { getColumns } from "./getColumns";
import { ModalsProvider, openSaveModal } from "./ModalsProvider/ModalsProvider";
import { getCategories } from "./requests";

export let updateEntities: ()=>void;

export default function AdminCategories() {
    const [entities, setEntities] = useState<Record<string, unknown>[]>([]);
    const [total, setTotal] = useState(1);
    const [offset, setOffset] = useState(0);
    const [filters, setFilters] = useState<Record<string, unknown>>({
        order: "nome",
        sort: "ASC",
        limit: 10,
    });
    
    updateEntities = ()=>{
        getCategories({offset, filters}).then(result=>{
            setEntities(result.data)
            setTotal(result.total)
        })
    }

    useEffect(()=>{
        getCategories({offset, filters}).then(result=>{
            setEntities(result.data)
            setTotal(result.total)
        })
    }, [offset, filters])

    return (
        <div>
            <ModalsProvider/>
            <ListPage
                title={"Categorias"}
                titleButtonLabel={"Nova Categoria"}
                titleButtonCallback={()=>{openSaveModal()}}
                entities={entities}
                columns={getColumns()}
                filters={[
                    {
                        placeholder: "Filtrar por nome",
                        control: "nome",
                        type: "text",
                    },
                ]}
                defaultFilter={{
                    order: "nome",
                    sort: "ASC",
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