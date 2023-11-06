import { makeConnection } from "../../tools/makeConnection";

interface IListDataProps {
    filters: Record<string, unknown>
}

export async function getFilteredProducts(props: IListDataProps) {
    const method = "get";
    const suffix = "product";
    const otherQueryStrings = {
        ...props.filters,
        offset: 0,
        limit: 10000,
        order: "nome",
        sort: "ASC",
    };

    const response = (await makeConnection({method, suffix, otherQueryStrings})).data as Record<string, unknown>;

    return (response.data as Record<string, unknown>[]).map(product=>{
        return ({
            id: product.id as number,
            name: product.nome as string,
            description: product.descricao as string,
            stock: product.quantidade as number,
            price: product.preco as number,
            image: product.foto as string,
        })
    })
}