import { makeConnection } from "../../../tools/makeConnection";

export async function deleteAccount() {
    const method = "delete";
    const suffix = "auth/me";
    let success = false;

    try {
        const response = await makeConnection({method, suffix});
        success = response.success;
    } catch(err) {
        console.error(err);
    }

    return success;
}