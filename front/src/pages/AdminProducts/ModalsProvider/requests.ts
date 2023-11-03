import { makeConnection } from "../../../tools/makeConnection";

interface ICreateProductProps {
    entity: Record<string, unknown>,
}

interface IEditProductProps {
    id: string,
    entity: Record<string, unknown>,
}

export async function createProduct(props: ICreateProductProps) {
    const method = "post";
    const suffix = "product";
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

export async function editProduct(props: IEditProductProps) {
    const method = "patch";
    const suffix = "product";
    const body = props.entity;
    let success = false;

    try {
        const response = await makeConnection({method, suffix, body, entityId: props.id});
        success = response.success;
    } catch(err) {
        console.error(err);
    }

    return success;
}

export async function deleteProduct(entityId: string) {
    const method = "delete";
    const suffix = "product";
    let success = false;

    try {
        const response = await makeConnection({method, suffix, entityId});
        success = response.success;
    } catch(err) {
        console.error(err);
    }

    return success;
}

export async function getCategoriesOptions() {
    const method = "get";
    const suffix = "category";
    const otherQueryStrings = {
        offset: 0,
        limit: 10000,
        order: "nome",
        sort: "ASC",
    };

    const response = (await makeConnection({method, suffix, otherQueryStrings})).data as Record<string, unknown>;
    
    return (response.data as Record<string, unknown>[]).map(category=>{
        return {
            value: category.id as string,
            label: category.nome as string,
        }
    })
}