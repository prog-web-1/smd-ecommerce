import { makeConnection } from "../../../tools/makeConnection";

interface ICreateCategoryProps {
    entity: Record<string, unknown>,
}

interface IEditCategoryProps {
    id: string,
    entity: Record<string, unknown>,
}

export async function createCategory(props: ICreateCategoryProps) {
    const method = "post";
    const suffix = "category";
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

export async function editCategory(props: IEditCategoryProps) {
    const method = "patch";
    const suffix = "category";
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

export async function deleteCategory(entityId: string) {
    const method = "delete";
    const suffix = "category";
    let success = false;

    try {
        const response = await makeConnection({method, suffix, entityId});
        success = response.success;
    } catch(err) {
        console.error(err);
    }

    return success;
}