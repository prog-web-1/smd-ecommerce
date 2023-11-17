import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer/PageContainer";
import PurchaseCard, { ItemCompra } from "./PurchaseCard/PurchaseCard";

import "./ShoppingHistory.css";
import { getShoppingHistory } from "./requests";
import { alertError } from "../../components/Alert/Alert";
import { openLoginModal } from "../../components/Layout/ModalsProvider";

const data = [
    {
        date: "2023-10-12",
        total: 150,
        status: "pending",
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
        items: [
            {
                name: "Produto 1",
                count: 2,
            }
        ],
    },
]

export default function ShoppingHistory() {
    const [compras, setCompras] = useState<Record<string, unknown>[]>([]);

    useEffect(()=>{
        const userToken = localStorage.getItem("token");
        const userExpireDate = localStorage.getItem("expire_token");

        if(!userToken || !userExpireDate || (userToken && userExpireDate && (new Date(JSON.parse(userExpireDate))) < new Date())) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("admin");
            localStorage.removeItem("expire_token");
            alertError("Faça login para visualizar seu histórico de compras.");
            openLoginModal();
        } else {
            getShoppingHistory().then(response=>{
                setCompras(response);
            })
        }
    }, [])

    return (
        <PageContainer>
            <div className="shopping_history_page">
                {
                    compras.map(purchase=>{
                        return (
                            <PurchaseCard
                                date={purchase.date as string}
                                total={purchase.total as number}
                                status={purchase.status as string}
                                items={purchase.items as ItemCompra[]}
                            />
                        )
                    })
                }
            </div> 
        </PageContainer>
    )
}