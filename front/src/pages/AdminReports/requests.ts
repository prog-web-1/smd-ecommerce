import moment from "moment";
import { makeConnection } from "../../tools/makeConnection";

export async function getProducts() {
    const method = "get";
    const suffix = "relatorios/produtos-sem-estoque";

    const response = (await makeConnection({method, suffix})).data as Record<string, unknown>[];

    const data = response.map(product=>{
        return ({
            id: product.id as string,
            name: product.nome as string,
            price: `R$ ${(product.preco as number).toFixed(2)}`,
        })
    })
    
    return data;
}

export async function getPurchases(dataInicial: string, dataFinal: string) {
    const method = "get";
    const suffix = "relatorios/top-usuario-vendas";
    const otherQueryStrings = {
        dataInicial,
        dataFinal,
    };

    const response = (await makeConnection({method, suffix, otherQueryStrings})).data as Record<string, unknown>[];

    const data = response.map(usuario=>{
        return ({
            id: usuario.id as string,
            name: usuario.nome as string,
            purchaseCount: parseInt(usuario.compras as string),
        })
    })
    
    return data;
}

export async function getBillingDiary(dataInicial: string, dataFinal: string) {
    const method = "get";
    const suffix = "relatorios/total-recebido-dia";
    const otherQueryStrings = {
        dataInicial,
        dataFinal,
    };

    const response = (await makeConnection({method, suffix, otherQueryStrings})).data as Record<string, unknown>[];
    const data = daysArray(dataInicial);

    response.forEach(day=>{
        data[parseInt((day.data as string).substr(0,2))-1].billing = parseFloat(day.total as string);
    })
    
    return data;
}

function daysArray(date: string) {
    const dates = [];
    const firstDay = moment(date).startOf("month").format("DD");
    const lastDay = moment(date).endOf("month").format("DD");
    const month = moment(date).format("MM");

    for(let i = parseInt(firstDay); i <= parseInt(lastDay); i++) {
        dates.push({
            day: `${i < 10 ? `0${i}` : i}/${month}`,
            billing: 0.00,
        })
    }

    return dates;
}