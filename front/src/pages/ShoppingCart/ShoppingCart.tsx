import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { LabelButton } from "../../components/LabelButton/LabelButton";
import PageContainer from "../../components/PageContainer/PageContainer";

import "./ShoppingCart.css";

export interface Product {
    id: string,
    name: string,
    description: string,
    count: number,
    price: number,
    image: string,
}

const data = [
    {
        id: "1",
        name: "Sapato",
        description: "Um sapato muito bonito",
        count: 3,
        price: 15.20,
        image: "https://media.istockphoto.com/id/685779142/pt/foto/red-tshirt-clothes.jpg?s=1024x1024&w=is&k=20&c=ucA-J_IS2avss1xgGo7Ms_CFRQE6Aw0T0jkQPaSVmrs="
    },
    {
        id: "2",
        name: "Outro Sapato",
        description: "Outro sapato muito bonito",
        count: 1,
        price: 10.20,
        image: "https://www.louie.com.br/loja/image/cache/data/colecao-2019/viccini/OLIVE/OLIVE%20V%201-550x550.jpg"
    },
    {
        id: "3",
        name: "Sapato",
        description: "Um sapato muito bonito",
        count: 2,
        price: 1.20,
        image: "https://www.louie.com.br/loja/image/cache/data/colecao-2019/viccini/OLIVE/OLIVE%20V%201-550x550.jpg"
    },
    {
        id: "4",
        name: "Sapato",
        description: "Um sapato muito bonito",
        count: 3,
        price: 10.20,
        image: "https://www.louie.com.br/loja/image/cache/data/colecao-2019/viccini/OLIVE/OLIVE%20V%201-550x550.jpg"
    },
    {
        id: "5",
        name: "Sapato",
        description: "Um sapato muito bonito",
        count: 3,
        price: 10.20,
        image: "https://www.louie.com.br/loja/image/cache/data/colecao-2019/viccini/OLIVE/OLIVE%20V%201-550x550.jpg"
    },
    {
        id: "6",
        name: "Sapato",
        description: "Um sapato muito bonito",
        count: 3,
        price: 10.20,
        image: "https://www.louie.com.br/loja/image/cache/data/colecao-2019/viccini/OLIVE/OLIVE%20V%201-550x550.jpg"
    },
]

export default function ShoppingCart() {
    const [products, setProducts] = useState<Product[]>(data);

    return (
        <PageContainer>
                {products.map((product, index)=>{
                    return (
                        <div className="shopping-cart-product-box">
                            <div className="shopping-cart-section">
                                <div>
                                    <div className="shopping-cart-product-title">{product.name}</div>
                                    <img src={product.image} alt={`Foto de ${product.name}`} className="shopping-cart-product-image"/>
                                </div>
                                <div>
                                    <div className="shopping-cart-column-name">Descrição</div>
                                    <div>{product.description}</div>
                                </div>
                            </div>
                            <div className="shopping-cart-secondary-section">
                                <div className="shopping-cart-product-column">
                                    <div className="shopping-cart-column-name">Quantidade</div>
                                    <div className="shopping-cart-product-count-container">
                                        <HiMinusSm
                                            className="shopping-cart-product-count-button"
                                            onClick={()=>{
                                                const newProducts = products.map((item)=> {
                                                    return {
                                                        ...item,
                                                        count: item.id === product.id && item.count > 1 ? item.count-1 : item.count
                                                    }
                                                });
                                                setProducts(newProducts);
                                            }}
                                        />
                                        <input 
                                            type="number"
                                            value={product.count} 
                                            className="shopping-cart-product-count-input"
                                            disabled={true}
                                        />
                                        <HiPlusSm 
                                            className="shopping-cart-product-count-button"
                                            onClick={()=>{
                                                const newProducts = products.map((item)=> {
                                                    return {
                                                        ...item,
                                                        count: item.id === product.id ? item.count+1 : item.count
                                                    }
                                                });
                                                setProducts(newProducts);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="shopping-cart-product-column">
                                    <div className="shopping-cart-column-name">Preço</div>
                                    <div>{`R$ ${(product.price).toFixed(2)}`}</div>
                                </div>
                                <div className="shopping-cart-product-column">
                                    <div className="shopping-cart-column-name">Subtotal</div>
                                    <div>{`R$ ${(product.price*product.count).toFixed(2)}`}</div>
                                </div>
                                <div className="shopping-cart-remove-button-container">
                                    <FaRegTrashAlt 
                                        className="shopping-cart-remove-icon" 
                                        onClick={()=>{
                                            const filteredProducts = products.filter((product, idx)=>idx !== index);
                                            setProducts(filteredProducts);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="shopping-cart-footer">
                    <div style={{ width: "300px", alignItems: "flex-end", display: "flex", flexDirection: "column" }}>
                        <div style={{ fontWeight: 600, fontSize: "20px", marginBottom: "20px" }}>{`Total: R$ ${calcTotal(products)}`}</div>
                        <LabelButton
                            label="Comprar"  
                            extraClass="form-login-button" 
                            callback={()=>{
                                console.log("comprado")
                            }}
                        />
                    </div>
                </div>
        </PageContainer>
    )
}

function calcTotal(products: Product[]) {
    let soma = 0;

    for (let i = 0; i < products.length; i++) {
        soma += products[i].price * products[i].count;
    }

    return soma.toFixed(2);
}