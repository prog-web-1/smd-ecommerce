import { AxiosResponse } from "axios";
import { makeConnection } from "../../../../tools/makeConnection";

interface ILoginRequestProps {
    login: string,
    senha: string,
}

export async function loginRequest(props: ILoginRequestProps) {
    const method = "post";
    const suffix = "auth/login";
    const body = {
        login: props.login,
        senha: props.senha,
    }
    let success = false;
    let data = {} as Record<string, unknown>;
    
    try {
        const response = await makeConnection({method, suffix, body}) as AxiosResponse<any, any>;
        data = response.data;
        success = true;
    } catch (err) {
        console.error(err);
    }

    return {
        success: success,
        data: data,
    };
}