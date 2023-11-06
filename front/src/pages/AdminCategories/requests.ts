import { makeConnection } from "../../tools/makeConnection";

interface IListDataProps {
    offset: number,
    filters: Record<string, unknown>
}

export async function getCategories(props: IListDataProps) {
    const method = "get";
    const suffix = "category";
    const otherQueryStrings = {
        ...props.filters,
        offset: props.offset,
    };

    const response = (await makeConnection({method, suffix, otherQueryStrings})).data as Record<string, unknown>;
    
    return {
        data: response.data as Record<string, unknown>[],
        total: (response.pagination as Record<string, unknown>).total as number,
    };
}