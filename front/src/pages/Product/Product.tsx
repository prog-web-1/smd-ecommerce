import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer/PageContainer";
import { LabelButton } from "../../components/LabelButton/LabelButton";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { useEffect, useState } from "react";
import { getProductById } from "./requests";
import { addItemToCart } from "../../tools/shoppingCartFunctions";

import "./Product.css";

const data = {
    id: 0,
    name: "",
    description: "",
    stock: 0,
    price: 0,
    image: "",
};

export default function Product() {
    let { id } = useParams();

    const [product, setProduct] = useState(data);
    const [count, setCount] = useState(1);

    useEffect(()=>{
        if(id) {
            getProductById(id).then(product=>{
                setProduct(product);
            })
        }
    }, [])

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
                        <div  className="product-details-stock-container">
                            {`${product.stock} disponíveis`}
                        </div>
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
                                    addItemToCart({id: product.id, name: product.name, quantity: count}, product.stock);
                                }}
                            />
                        </div>
                </div>
            </div>
        </PageContainer>
    )
}