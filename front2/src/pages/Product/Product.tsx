import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer/PageContainer";

import "./Product.css";
import { LabelButton } from "../../components/LabelButton/LabelButton";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { useState } from "react";

const data = {
    id: "6",
    name: "Sapato",
    description: "Um sapato muito bonito",
    stock: 3,
    price: 10.20,
    image: "https://www.louie.com.br/loja/image/cache/data/colecao-2019/viccini/OLIVE/OLIVE%20V%201-550x550.jpg"
};

export default function Product() {
    let { id } = useParams();
    console.log("id", id);

    const [product, setProduct] = useState(data);
    const [count, setCount] = useState(1);

    return (
        <PageContainer>
            <div className="product-details-page">
                <div className="product-details-image-container">
                    <img  className="product-details-image" src={product.image} alt={`Foto de ${product.name}`} />
                </div>
                <div className="product-details-content-box">
                    <div>
                        <div className="product-details-name">{product.name}</div>
                        <div className="product-details-description">{product.description}</div>
                        <div className="product-details-price-container">
                            <div className="product-details-price">R$ {product.price.toFixed(2)}</div>
                            <div  className="product-count-container">
                                <HiMinusSm
                                    className="product-details-product-count-button"
                                    onClick={()=>{
                                        if(count > 1) {
                                            setCount(count-1);
                                        }
                                    }}
                                />
                                <input 
                                    type="number"
                                    value={count} 
                                    className="product-details-product-count-input"
                                    disabled={true}
                                />
                                <HiPlusSm
                                    className="product-details-product-count-button"
                                    onClick={()=>{
                                        if(count < product.stock) {
                                            setCount(count+1);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="product-details-footer">
                            <LabelButton
                                label="Compre agora"
                                extraClass="product-details-buy-button" 
                                callback={()=>{
                                    console.log("buy")
                                }}
                            />
                        </div>
                </div>
            </div>
        </PageContainer>
    )
}