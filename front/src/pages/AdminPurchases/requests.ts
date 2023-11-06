import moment from "moment";
import { makeConnection } from "../../tools/makeConnection";

interface IListDataProps {
    offset: number,
    filters: Record<string, unknown>
}

export async function getPurchases(props: IListDataProps) {
    const method = "get";
    const suffix = "venda";
    const otherQueryStrings = {
        ...props.filters,
        offset: props.offset,
    };

    const response = (await makeConnection({method, suffix, otherQueryStrings})).data as Record<string, unknown>;
    const data = (response.data as Record<string, unknown>[]).map(entity=>{
        return ({
            id: entity.id as number,
            client: (entity.user as Record<string, unknown>).nome as string,
            date: moment(entity.data_hora as string).format("DD/MM/YYYY HH:mm"),
            value: `R$ ${(entity.valorTotal as number).toFixed(2)}`,
            status: (entity.status as string)[0].toUpperCase() + (entity.status as string).substring(1),
            products: ((entity.carrinho as Record<string, unknown>[]).map(item=>(item.produto as Record<string, unknown>).nome)).toString().replaceAll(",", ", "),
        })
    })
    
    return {
        data: data,
        total: (response.pagination as Record<string, unknown>).total as number,
    };
}