import { makeConnection } from "../../tools/makeConnection";

export async function getProductById(entityId: string) {
    const method = "get";
    const suffix = "product";

    const response = (await makeConnection({method, suffix, entityId})).data as Record<string, unknown>;

    return {
        id: response.id as number,
        name: response.nome as string,
        description: response.descricao as string,
        stock: response.quantidade as number,
        price: response.preco as number,
        image: response.foto as string,
    };
}