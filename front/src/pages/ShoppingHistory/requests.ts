import { makeConnection } from "../../tools/makeConnection";

export async function getShoppingHistory() {
    const method = "get";
    const suffix = "auth/me";
    let data = [] as Record<string, unknown>[];

    try {
        const response = await makeConnection({method, suffix});
        data = ((response.data as Record<string, unknown>).compras as Record<string, unknown>[]).map(compra=>{
            return ({
                date: compra.data_hora as string,
                total: compra.valorTotal as number,
                status: (compra.status as string)[0].toUpperCase() + (compra.status as string).substring(1),
                items:  (compra.carrinho as Record<string, unknown>[]).map(item=>{
                    return ({
                        name: (item.produto as Record<string, unknown>).nome as string,
                        count: item.quantidade as number,
                    })
                })
            })
        });
    } catch (err) {
        console.error(err);
    }

    return data;
}