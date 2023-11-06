import moment from "moment";

import "./PurchaseCard.css";

export interface ItemCompra {
    name: string,
    count: number,
}

interface IPurchaseCardProps {
    date: string,
    status: string,
    items: ItemCompra[],
    total: number
}

export default function PurchaseCard(props: IPurchaseCardProps) {
    return (
        <div className="purchase-card-container">
            <div className="purchase-card">
                <div><strong>Data: </strong>{moment(props.date).format("DD/MM/YYYY HH:mm")}</div>
                <div><strong>Valor: </strong>R$ {props.total.toFixed(2)}</div>
                <div><strong>Status: </strong>{props.status}</div>
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