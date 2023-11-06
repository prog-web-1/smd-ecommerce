import { makeConnection } from "../../../tools/makeConnection";


export async function getCategoriesOptions() {
    const method = "get";
    const suffix = "category";
    const otherQueryStrings = {
        offset: 0,
        limit: 10000,
        sort: "ASC",
        order: "nome",
    };

    const response = (await makeConnection({method, suffix, otherQueryStrings})).data as Record<string, unknown>;
    
    let categories = (response.data as Record<string, unknown>[]).map(category=>{
        return ({
            value: (category.id as number).toString(),
            label: category.nome as string,
        })
    });

    return categories;
}