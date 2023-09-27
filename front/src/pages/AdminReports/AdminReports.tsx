import { SimpleBarChart } from "../../components/BarChart/SimpleBarChart";
import "./AdminReports.css";

const clientes = [
    {
        id: "1",
        name: "Chris Rock",
        purchaseCount: 10
    },
    {
        id: "2",
        name: "Drew Rock",
        purchaseCount: 10
    },
    {
        id: "3",
        name: "Julius Rock",
        purchaseCount: 10
    },
    {
        id: "4",
        name: "Rochele Rock",
        purchaseCount: 10
    },
    {
        id: "5",
        name: "Tonia Rock",
        purchaseCount: 10
    },
    {
        id: "6",
        name: "Malvo Rock",
        purchaseCount: 10
    },
    {
        id: "7",
        name: "Omar Rock",
        purchaseCount: 10
    },
]

const produtos = [
    {
        id: "1",
        name: "Sapato 1",
        price: "R$10.00"
    },
    {
        id: "2",
        name: "Sapato 2",
        price: "R$10.50"
    },
    {
        id: "3",
        name: "Sapato 3",
        price: "R$10.00"
    },
    {
        id: "4",
        name: "Sapato 4",
        price: "R$10.00"
    },
    {
        id: "5",
        name: "Sapato 5",
        price: "R$10.00"
    },
    {
        id: "6",
        name: "Sapato 6",
        price: "R$10.00"
    },
    {
        id: "7",
        name: "Sapato 7",
        price: "R$10.00"
    },
]

const billingDiary = [
    {
        day: "01/01",
        billing: 100.00
    },
    {
        day: "02/01",
        billing: 510.50
    },
    {
        day: "03/01",
        billing: 702.00
    },
    {
        day: "04/01",
        billing: 750.00
    },
    {
        day: "05/01",
        billing: 1000.00
    },
    {
        day: "06/01",
        billing: 1000.00
    },
    {
        day: "07/01",
        billing: 1000.00
    },
    {
        day: "08/01",
        billing: 1000.00
    },
    {
        day: "09/01",
        billing: 1000.00
    },
    {
        day: "10/01",
        billing: 1000.00
    },
]

export default function AdminReports() {
    return (
        <div>
            <div className="admin-reports-chart-area">
                <div className="admin-reports-data-box">
                    <div className="admin-reports-data-box-title"><strong>Compras por cliente</strong></div>
                    <div className="admin-reports-data-box-body">
                        {
                            clientes.map(cliente=>{
                                return (
                                    <div className="admin-reports-client-card">
                                        <div>
                                            <div><strong>Id</strong></div>
                                            <div>{cliente.id}</div>
                                        </div>
                                        <div>
                                            <div><strong>Nome</strong></div>
                                            <div>{cliente.name}</div>
                                        </div>
                                        <div>
                                            <div><strong>Compras:</strong></div>
                                            <div>{cliente.purchaseCount}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="admin-reports-data-box">
                    <div className="admin-reports-data-box-title"><strong>Produtos fora de estoque</strong></div>
                    <div className="admin-reports-data-box-body">
                        {
                            produtos.map(produto=>{
                                return (
                                    <div className="admin-reports-client-card">
                                        <div>
                                            <div><strong>Id</strong></div>
                                            <div>{produto.id}</div>
                                        </div>
                                        <div>
                                            <div><strong>Nome</strong></div>
                                            <div>{produto.name}</div>
                                        </div>
                                        <div>
                                            <div><strong>Preço:</strong></div>
                                            <div>{produto.price}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="admin-reports-chart-area">
                <div className="admin-reports-data-box-chart">
                    <div className="admin-reports-data-box-title"><strong>Faturamento diário</strong></div>
                    <SimpleBarChart
                        id={"billing"}
                        dataKey="day"
                        values={billingDiary}
                        bars={[{
                            name: "billing",
                            color: "#6A5ACD"
                        }]}
                    />
                </div>
            </div>
        </div>
    )
}