import { useEffect, useState } from "react";
import { SimpleBarChart } from "../../components/BarChart/SimpleBarChart";
import { getBillingDiary, getProducts, getPurchases } from "./requests";
import FormGroup from "../../components/FormGroup/FormGroup";
import moment from "moment";
import { FaSearch, FaFileExport } from "react-icons/fa";
import html2canvas from "html2canvas";
import { PDFDocument, PageSizes } from 'pdf-lib';
import { closeLoader, openLoader } from "../../components/Loader/Loader";

import "./AdminReports.css";

export default function AdminReports() {
    const [products, setProducts] = useState<Record<string, string>[]>([]);
    const [clients, setClients] = useState<Record<string, unknown>[]>([]);
    const [dataCompraInicio, setDataCompraInicio] = useState(moment(new Date()).add(-1, "month").format("YYYY-MM-DD")+" 00:00:00");
    const [dataCompraFim, setDataCompraFim] = useState(moment(new Date()).format("YYYY-MM-DD")+" 23:59:59");
    const [billingDiary, setBillingDiary] = useState<Record<string, unknown>[]>([]);
    const [isPrinting, setIsPrinting] = useState(false);

    useEffect(()=>{
        Promise.all([
            getProducts(),
            getPurchases(dataCompraInicio, dataCompraFim),
            getBillingDiary(
                moment(new Date()).startOf("month").format("YYYY-MM-DD"),
                moment(new Date()).endOf("month").format("YYYY-MM-DD")
            ),
        ]).then(results=>{
            setProducts(results[0]);
            setClients(results[1]);
            setBillingDiary(results[2]);
        });
    }, [])

    return (
        <div id="admin-dashboard-page">
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div className="admin-reports-data-page-title"><strong>Relatórios</strong></div>
                <button 
                    className="dashboard-header-search-button" 
                    type="button"
                    onClick={()=>{
                        openLoader();
                        const container = document.getElementById("admin-dashboard-page") as HTMLElement;
                        container.id = "admin-dashboard-page-export";
                        container.style.width ="1800px";
                        container.style.backgroundColor ="white";
                        setIsPrinting(true);

                        setTimeout(async ()=>{
                            const canvas = await html2canvas(container, {
                                allowTaint: true,
                                useCORS: true,
                            });
                            const imgData = canvas.toDataURL();
              
                            const pdfDoc = await PDFDocument.create();
                            const pageWidth = PageSizes.A4[0];
                            const pageHeight = PageSizes.A4[1];
              
                            const pngImage = await pdfDoc.embedPng(imgData);
                            const { width, height } = pngImage.scale(1);
              
                            const scaleFactor = (pageWidth-20) / width;
                            const resizedWidth = pageWidth-20;
                            const resizedHeight = height * scaleFactor;
                            const adjustedY = pageHeight - resizedHeight;
                            const page = pdfDoc.addPage([pageWidth, resizedHeight+20 > pageHeight ? resizedHeight+20 : pageHeight]);
              
                            page.drawImage(pngImage, {
                                x: 10,
                                y: resizedHeight+20 > pageHeight ? 10 : adjustedY-10,
                                width: resizedWidth,
                                height: resizedHeight,
                            });
              
                            const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });
                            const link = document.createElement('a');
                            link.href = pdfBytes;
                            link.download = 'Relatório.pdf';
                            link.click();
                            container.id = "admin-dashboard-page";
                            container.style.width ="100%";
                            container.style.backgroundColor ="transparent";
                            setIsPrinting(false);

                            closeLoader();
                        }, 3000)
                    }}
                >
                    <FaFileExport/>
                </button>
            </div>
            <div className="admin-reports-chart-area">
                <div className="admin-reports-data-box">
                    <div className="admin-reports-data-box-title"><strong>Compras por cliente</strong></div>
                        <div className="admin-reports-box-header-filters">
                            <div className="dashboard-header-inputs-box">
                            <FormGroup
                                type="date"
                                label="De:"
                                size="50"
                                id="date_from"
                                placeholder=""
                                inputContainerExtraClass={"dashboard-header-inline-input"}
                                defaultValue={moment(new Date()).add(-1, "month").format("YYYY-MM-DD")}
                                maxDate={dataCompraFim}
                                onChange={(v)=>{
                                    setDataCompraInicio(v as string);
                                }}
                            />
                            <FormGroup
                                type="date"
                                label="Até:"
                                size="50"
                                id="date_to"
                                placeholder=""
                                inputContainerExtraClass={"dashboard-header-inline-input"}
                                defaultValue={moment(new Date()).format("YYYY-MM-DD")}
                                minDate={dataCompraInicio}
                                onChange={(v)=>{
                                    setDataCompraFim(v as string);
                                }}
                            />
                            </div>
                            <button 
                                className="dashboard-header-search-button" 
                                type="button"
                                onClick={()=>{
                                    getPurchases(dataCompraInicio, dataCompraFim).then(clients=>{
                                        setClients(clients);
                                    })
                                }}
                            >
                                <FaSearch/>
                            </button>
                        </div>
                    <div className="admin-reports-data-box-body">
                        {
                            clients.map(cliente=>{
                                return (
                                    <div className="admin-reports-client-card">
                                        <div>
                                            <div><strong>Id</strong></div>
                                            <div>{cliente.id as string}</div>
                                        </div>
                                        <div>
                                            <div><strong>Nome</strong></div>
                                            <div>{cliente.name as string}</div>
                                        </div>
                                        <div>
                                            <div><strong>Compras:</strong></div>
                                            <div>{cliente.purchaseCount as string}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="admin-reports-data-box">
                    <div>
                        <div className="admin-reports-data-box-title"><strong>Produtos fora de estoque</strong></div>
                    </div>
                    <div className="admin-reports-data-box-body">
                        {
                            products.map(produto=>{
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
                    <div style={{width: "200px"}}>
                        <FormGroup
                            type="date"
                            label="Mês:"
                            size="100"
                            id="chart-date"
                            placeholder=""
                            inputContainerExtraClass={"dashboard-header-inline-input"}
                            defaultValue={moment(new Date()).startOf("month").format("YYYY-MM-DD")}
                            onChange={(v)=>{
                                const startDate = moment(v).startOf("month").format("YYYY-MM-DD")+" 00:00:00";
                                const endDate = moment(v).endOf("month").format("YYYY-MM-DD")+" 23:59:59";

                                getBillingDiary(startDate, endDate).then(data=>{setBillingDiary(data)})
                            }}
                            dateFormat="MMMM/yyyy"
                            monthPicker={true}
                        />
                    </div>
                    <SimpleBarChart
                        id={"billing"}
                        isPrinting={isPrinting}
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