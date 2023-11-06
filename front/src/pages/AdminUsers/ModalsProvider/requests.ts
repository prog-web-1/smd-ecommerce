import { makeConnection } from "../../../tools/makeConnection";

interface ICreateUserProps {
    entity: Record<string, unknown>,
}

interface IEditUserProps {
    id: string,
    entity: Record<string, unknown>,
}

export async function createUser(props: ICreateUserProps) {
    const method = "post";
    const suffix = "user";
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

export async function editUser(props: IEditUserProps) {
    const method = "patch";
    const suffix = "user";
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

export async function deleteUser(entityId: string) {
    const method = "delete";
    const suffix = "user";
    let success = false;

    try {
        const response = await makeConnection({method, suffix, entityId});
        success = response.success;
    } catch(err) {
        console.error(err);
    }

    return success;
}