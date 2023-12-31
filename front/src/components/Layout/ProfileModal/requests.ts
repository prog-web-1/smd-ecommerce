import { makeConnection } from "../../../tools/makeConnection";

interface IEditProfileProps {
    nome: string,
    login: string,
    endereco: string,
    email: string,
    senha?: string,
}

export async function editProfile(props: IEditProfileProps) {
    const method = "patch";
    const suffix = "auth/me";
    const body: Record<string, unknown> = {
        nome: props.nome,
        login: props.login,
        endereco: props.endereco,
        email: props.email,
    }

    if(props.senha) {
        body.senha = props.senha;
    }

    let success = false;
    let data = {} as Record<string, unknown>;

    try {
        const response = await makeConnection({method, suffix, body});
        data = response.data as Record<string, unknown>;
        success = response.success;
    } catch (err) {
        console.error(err);
    }

    return {
        success: success,
        data: data,
    };
}

export async function getUserData() {
    const method = "get";
    const suffix = "auth/me";
    let success = false;
    let data = {} as Record<string, unknown>;

    try {
        const response = await makeConnection({method, suffix});
        data = response.data as Record<string, unknown>;
        success = response.success;
    } catch (err) {
        console.error(err);
    }

    return {
        success: success,
        data: data,
    };
}