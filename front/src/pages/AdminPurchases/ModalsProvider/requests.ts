import { makeConnection } from "../../../tools/makeConnection";

export async function deletePurchase(entityId: string) {
    const method = "delete";
    const suffix = "venda";
    let success = false;

    try {
        const response = await makeConnection({method, suffix, entityId});
        success = response.success;
    } catch(err) {
        console.error(err);
    }

    return success;
}

export async function updatePurchaseStatus(entityId: string, status: string) {
    const method = "post";
    const suffix = "venda/confirmar";
    let success = false;
    const body = {
        status,
    }

    try {
        const response = await makeConnection({method, suffix, entityId, body});
        success = response.success;
    } catch(err) {
        console.error(err);
    }

    return success;
}