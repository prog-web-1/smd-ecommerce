import { makeConnection } from "../../tools/makeConnection";

interface ICreateProductProps {
    entity: Record<string, unknown>,
}

export async function comprar(props: ICreateProductProps) {
    const method = "post";
    const suffix = "venda/comprar";
    const body = props.entity;
    let success = false;

    try {
        const response = await makeConnection({method, suffix, body});
        success = response.success;
    } catch(err) {
        console.error(err);
    }

    return success;
}