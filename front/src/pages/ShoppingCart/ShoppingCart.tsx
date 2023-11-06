import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { LabelButton } from "../../components/LabelButton/LabelButton";
import PageContainer from "../../components/PageContainer/PageContainer";

import "./ShoppingCart.css";
import { CartItem, getNumberOfItensInCart, updateNumberOfItens, validateShoppingCart } from "../../tools/shoppingCartFunctions";
import { updateShoppingCartCount } from "../../components/Layout/TopBar/TopBar";
import { alertError, alertSuccess } from "../../components/Alert/Alert";
import { comprar } from "./requests";
import { useNavigate } from "react-router-dom";
import { openLoginModal } from "../../components/Layout/ModalsProvider";

export interface Product {
    id: number,
    name: string,
    description: string,
    count: number,
    price: number,
    image: string,
    stock: number,
}

export default function ShoppingCart() {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const localCart = localStorage.getItem("shopping_cart");
        
        if(localCart) {
            const cart = JSON.parse(localCart) as CartItem[];
            validateShoppingCart(cart).then(response=>{
                const numberOfItens = getNumberOfItensInCart(response.cart);
                updateShoppingCartCount(numberOfItens);

                if(response.hasError) {
                    alertError("Alguns dos itens que você selecionou não estão mais disponíveis.")
                }
                
                const products = response.cart.map(item=>{
                    const product = response.products.find(product=>product.id===item.id);

                    return({
                        ...product,
                        count: item.quantity,
                    })
                });

                setProducts(products as Product[]);
            })
        }
    }, [])

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
                                                if(product.count > 1) {
                                                    const newProducts = products.map((item)=> {
                                                        return {
                                                            ...item,
                                                            count: item.id === product.id ? item.count-1 : item.count
                                                        }
                                                    });
                                                    updateNumberOfItens(product.id, product.count-1);
                                                    setProducts(newProducts);
                                                }
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
                                                if(product.count+1 <= product.stock) {
                                                    const newProducts = products.map((item)=> {
                                                        return {
                                                            ...item,
                                                            count: item.id === product.id ? item.count+1 : item.count
                                                        }
                                                    });
                                                    updateNumberOfItens(product.id, product.count+1);
                                                    setProducts(newProducts);
                                                }
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
                                            const filteredProducts = products.filter((item)=>item.id !== product.id);
                                            
                                            updateNumberOfItens(product.id, 0);
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
                                const userToken = localStorage.getItem("token");
                                const userExpireDate = localStorage.getItem("expire_token");

                                if(!userToken || !userExpireDate || (userToken && userExpireDate && (new Date(JSON.parse(userExpireDate))) < new Date())) {
                                    localStorage.removeItem("user");
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("expire_token");
                                    alertError("Faça login para finalizar a compra.");
                                    openLoginModal();
                                } else {
                                    if(products.length > 0) {
                                        const cart = products.map(product=>{
                                            return ({
                                                id: product.id,
                                                name: product.name,
                                                quantity: product.count,
                                            })
                                        });
                                        validateShoppingCart(cart).then(async response=>{
                                            if(response.hasError) {
                                                alertError("Alguns dos itens que você selecionou não estão mais disponíveis.");
                                                const numberOfItens = getNumberOfItensInCart(response.cart);
                                                updateShoppingCartCount(numberOfItens);

                                                const products = response.cart.map(item=>{
                                                    const product = response.products.find(product=>product.id===item.id);
                                
                                                    return({
                                                        ...product,
                                                        count: item.quantity,
                                                    })
                                                });
                                
                                                setProducts(products as Product[]);
                                            } else {
                                                const carrinho = products.map(product=>{
                                                    return ({
                                                        quantidade: product.count,
                                                        produto: {
                                                            id: product.id,
                                                        }
                                                    })
                                                });

                                                const success = await comprar({entity: {carrinho}});

                                                if(success) {
                                                    alertSuccess("Compra efetuada com successo!");
                                                    updateShoppingCartCount(0);
                                                    localStorage.removeItem("shopping_cart");
                                                    navigate({ 
                                                        pathname: "/home",
                                                    });
                                                }
                                            }
                                        })
                                    } else {
                                        alertError("Insira ao menos um item no carrinho para comprar.");
                                    }
                                }
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