import PageContainer from "../../components/PageContainer/PageContainer";
import PurchaseCard from "./PurchaseCard/PurchaseCard";

import "./ShoppingHistory.css";

const data = [
    {
        date: "2023-10-12",
        total: 150,
        status: "pending",
        code: "XXXX-XXXX",
        items: [
            {
                name: "Sapato de marca",
                count: 2,
            },
            {
                name: "Produto 1",
                count: 8,
            },
            {
                name: "Produto 2",
                count: 4,
            },
            {
                name: "Produto 3",
                count: 1,
            },
        ],
    },
    {
        date: "2023-12-05",
        total: 150,
        status: "pending",
        code: "XXXX-XXXX",
        items: [
            {
                name: "Produto 1",
                count: 2,
            }
        ],
    },
    {
        date: "2023-12-05",
        total: 150,
        status: "pending",
        code: "XXXX-XXXX",
        items: [
            {
                name: "Produto 1",
                count: 2,
            }
        ],
    },
    {
        date: "2023-12-05",
        total: 150,
        status: "pending",
        code: "XXXX-XXXX",
        items: [
            {
                name: "Produto 1",
                count: 2,
            }
        ],
    },
    {
        date: "2023-12-05",
        total: 150,
        status: "pending",
        code: "XXXX-XXXX",
        items: [
            {
                name: "Produto 1",
                count: 2,
            }
        ],
    },
]

export default function ShoppingHistory() {
    return (
        <PageContainer>
            <div className="shopping_history_page">
                {
                    data.map(purchase=>{
                        return (
                            <PurchaseCard
                                date={purchase.date}
                                total={purchase.total}
                                status={purchase.status}
                                code={purchase.code}
                                items={purchase.items}
                            />
                        )
                    })
                }
            </div> 
        </PageContainer>
    )
}