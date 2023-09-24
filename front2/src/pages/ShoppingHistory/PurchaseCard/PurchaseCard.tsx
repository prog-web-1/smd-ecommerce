import moment from "moment";

import "./PurchaseCard.css";

interface IPurchaseCardProps {
    date: string,
    status: string,
    code: string,
    items: {
        name: string,
        count: number,
    }[],
    total: number
}

export default function PurchaseCard(props: IPurchaseCardProps) {
    return (
        <div className="purchase-card-container">
            <div className="purchase-card">
                <div><strong>Data: </strong>{moment(props.date).format("DD/MM/YYYY")}</div>
                <div><strong>Valor: </strong>{props.total.toFixed(2)}</div>
                <div><strong>Status: </strong>{getStatus(props.status)}</div>
                <div><strong>Código de rastreio: </strong>{props.code}</div>
                <div><strong>Items: </strong></div>
                <div className="purchase-card-itens-container">
                    {
                        props.items.map(item=>{
                            return (
                                <div className="purchase-card-item"><div>{item.name}</div> <div>{`x${item.count}`}</div></div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

function getStatus(status: string) {
    switch(status) {
        case "pending":
            return "Pendente"
        case "sended":
            return "Enviado"
    }
}