import { makeConnection } from "../../tools/makeConnection";

interface IListDataProps {
    offset: number,
    filters: Record<string, unknown>
}

export async function getProducts(props: IListDataProps) {
    const method = "get";
    const suffix = "product";
    const otherQueryStrings = {
        ...props.filters,
        offset: props.offset,
    };

    const response = (await makeConnection({method, suffix, otherQueryStrings})).data as Record<string, unknown>;

    const data = (response.data as Record<string, unknown>[]).map(product=>{
        return ({
            ...product,
            precoString: `R$ ${(product.preco as number).toFixed(2)}`
        })
    })
    
    return {
        data: data,
        total: (response.pagination as Record<string, unknown>).total as number,
    };
}