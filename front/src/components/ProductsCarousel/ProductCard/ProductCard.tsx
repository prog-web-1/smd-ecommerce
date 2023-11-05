import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { LabelButton } from "../../LabelButton/LabelButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ProductCard.css";
import { addItemToCart } from "../../../tools/shoppingCartFunctions";

interface IProductCardProps {
    id: number;
    name: string;
    description: string;
    stock: number,
    price: number,
    image: string;
}

export function ProductCard(props: IProductCardProps) {
    const [count, setCount] = useState(1);
    const navigate = useNavigate();

    return (
        <div className="product-card-container">
            <div className="product-card">
                <img className="product-card-image" src={props.image} alt={`Foto de ${props.name}`}/>
                <div className="product-card-footer">
                    <div className="product-card-data">
                        <div className="product-card-name">{props.name}</div>
                        <div className="product-card-price">R$ {props.price.toFixed(2)}</div>
                    </div>
                    <div className="product-card-data">
                        <div  className="product-count-container">
                            <HiMinusSm
                                className="shopping-cart-product-count-button"
                                onClick={()=>{
                                    if(count > 1) {
                                        setCount(count-1);
                                    }
                                }}
                            />
                            <input 
                                type="number"
                                value={count} 
                                className="shopping-cart-product-count-input"
                                disabled={true}
                            />
                            <HiPlusSm
                                className="shopping-cart-product-count-button"
                                onClick={()=>{
                                    if(count < props.stock) {
                                        setCount(count+1);
                                    }
                                }}
                            />
                        </div>
                        <div className="product-card-name">{props.stock} disponíveis</div>
                    </div>
                    <div className="product-card-button-container">
                        <div className="product-card-link" onClick={()=>{ navigate("/product/"+props.id); }}>Detalhes</div>
                        
                        <div style={{width: "100px"}}>
                            <LabelButton
                                label="Comprar"
                                callback={()=>{
                                    addItemToCart({id: props.id, name: props.name, quantity: count}, props.stock);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}