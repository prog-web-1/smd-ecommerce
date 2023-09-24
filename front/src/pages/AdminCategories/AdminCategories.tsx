import { useEffect, useState } from "react";
import { ListPage } from "../../components/ListPage/ListPage";
import { getColumns } from "./getColumns";
import { ModalsProvider, openSaveModal } from "./ModalsProvider/ModalsProvider";

export let updateEntities: ()=>void;

export default function AdminCategories() {
    const [entities, setEntities] = useState<Record<string, unknown>[]>([{id: "1", name: "Categoria 1"}]);
    const [total, setTotal] = useState(1);
    const [offset, setOffset] = useState(0);
    const [filters, setFilters] = useState<Record<string, unknown>>({
        sort: "name",
        order: "asc",
        limit: 10,
    });
    
    updateEntities = ()=>{
        /*getEntities(offset, filters).then(result=>{
            setEntities(result.data)
            setTotal(result.total*10)
        })*/
    }

    useEffect(()=>{
        /*getEntities(offset, filters).then(result=>{
            setEntities(result.data)
            setTotal(result.total*10)
        })*/
    }, [offset, filters])

    return (
        <div>
            <ModalsProvider/>
            <ListPage
                title={"Categoria"}
                titleButtonLabel={"Nova Categoria"}
                titleButtonCallback={()=>{openSaveModal()}}
                entities={entities}
                columns={getColumns()}
                filters={[
                    {
                        placeholder: "Filtrar por nome",
                        control: "name",
                        type: "text",
                    },
                ]}
                defaultFilter={{
                    sort: "name",
                    order: "asc",
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