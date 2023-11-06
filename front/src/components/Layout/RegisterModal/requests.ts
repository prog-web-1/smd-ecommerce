import { makeConnection } from "../../../tools/makeConnection";

interface IRegisterRequestProps {
    nome: string,
    login: string,
    endereco: string,
    email: string,
    senha: string,
}

export async function registerRequest(props: IRegisterRequestProps) {
    const method = "post";
    const suffix = "auth/register";
    const body = {
        nome: props.nome,
        login: props.login,
        endereco: props.endereco,
        email: props.email,
        senha: props.senha,
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