import FormGroup from "../../FormGroup/FormGroup";
import { FaSearch, FaFilter } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Popover from "@material-ui/core/Popover";
import { useEffect, useState } from "react";
import { openLoginModal, openProfileModal } from "../ModalsProvider";
import { testUrl } from "../../../tools/testUrl";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../tools/logout";
import { openDeleteAccountModal } from "../DeleteAccountModal/DeleteAccountModal";
import { getCategoriesOptions } from "./requests";
import { alertError } from "../../Alert/Alert";

import "./TopBar.css";
import { CartItem, getNumberOfItensInCart, validateShoppingCart } from "../../../tools/shoppingCartFunctions";

export let updateShoppingCartCount: (value: number)=>void;

export default function TopBar() {
    const [filterEl, setFilterEl] = useState<HTMLElement | null>(null);
    const [filtersIsOpen, setFiltersIsOpen] = useState(false);
    const [userEl, setUserEl] = useState<HTMLElement | null>(null);
    const [userPopoverIsOpen, setUserPopoverIsOpen] = useState(false);
    const [shoppingCartEl, setShoppingCartEl] = useState<HTMLElement | null>(null);
    const [shoppingCartIsOpen, setShoppingCartIsOpen] = useState(false);
    const [shoppingCartCount, setShoppingCartCount] = useState(0);
    const [userIsAuth, setUserIsAuth] = useState(false);
    const [categories, setCategories] = useState<{value: string, label: string}[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [textFilter, setTextFilter] = useState("");
    const navigate = useNavigate();

    updateShoppingCartCount = (value: number)=>{
        setShoppingCartCount(value);
    }

    useEffect(()=>{
        const userToken = localStorage.getItem("token");
        const userExpireDate = localStorage.getItem("expire_token");
        
        if(userToken && userExpireDate && (new Date(JSON.parse(userExpireDate))) < new Date()) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("expire_token");
            window.location.reload();
        }
    }, [])

    useEffect(()=>{
        const localCart = localStorage.getItem("shopping_cart");
        
        if(localCart) {
            const cart = JSON.parse(localCart) as CartItem[];
            validateShoppingCart(cart, true).then(response=>{
                const numberOfItens = getNumberOfItensInCart(response.cart);
                setShoppingCartCount(numberOfItens);
            })
        } else {
            setShoppingCartCount(0);
        }
    }, [])

    useEffect(()=>{
        const user = localStorage.getItem("user");

        if(user) {
            setUserIsAuth(true);
        }

        getCategoriesOptions().then(categories=>{
            setCategories(categories);
        })
    }, [])

    return (
        <div className="top-bar">
            {testUrl("admin") ?
                    <div className="top-bar-container-admin">
                        <Link className="top-bar-logo" to={"/admin/reports"}>SMD Express</Link>
                        <div className="top-bar-icon-container">
                            <CgProfile 
                                className="top-bar-icon" 
                                onClick={(e)=>{
                                    if(userIsAuth) {
                                        setUserEl(e.currentTarget as unknown as HTMLElement);
                                        setUserPopoverIsOpen(!userPopoverIsOpen);
                                    } else {
                                        openLoginModal();
                                    }
                                }} 
                            />
                            <Popover
                                className="top-bar-filter-popover"
                                anchorEl={userEl}
                                open={userPopoverIsOpen}
                                id={userPopoverIsOpen ? "user-popup-popover" : undefined}
                                onClose={() => {
                                    setUserEl(null);
                                    setUserPopoverIsOpen(false);
                                }}
                                transformOrigin={{
                                    horizontal: "left",
                                    vertical: "top",
                                }}
                                anchorOrigin={{
                                    horizontal: "left",
                                    vertical: "bottom",
                                }}
                            >
                                <div className="top-bar-shopping-cart-link-container">
                                    <div className="top-bar-shopping-cart-link" 
                                        onClick={()=>{ 
                                            openProfileModal();
                                            setUserEl(null);
                                            setUserPopoverIsOpen(false);
                                        }}
                                    >
                                        Meu perfil
                                    </div>
                                </div>
                                <div className="top-bar-shopping-cart-link-container">
                                    <div 
                                        className="top-bar-shopping-cart-link" 
                                        onClick={()=>{ 
                                            openDeleteAccountModal();
                                            setUserEl(null);
                                            setUserPopoverIsOpen(false);
                                        }}
                                    >
                                        Deletar conta
                                    </div>
                                </div>
                                <div className="top-bar-shopping-cart-link-container">
                                    <div 
                                    className="top-bar-shopping-cart-link" 
                                        onClick={()=>{ 
                                            logout();
                                        }}
                                    >
                                        Sair
                                    </div>
                                </div>
                            </Popover>
                        </div>
                    </div>
                :
                    <div className="top-bar-container">
                        <Link className="top-bar-logo" to={"/home" }>SMD Express</Link>
                        <form
                            className="top-bar-form"
                            onSubmit={(e)=>{
                                e.preventDefault();
                                let queryString = "";

                                if(selectedCategory) {
                                    queryString = queryString+`category_id=${selectedCategory}`;
                                }

                                if(textFilter && textFilter.length > 0) {
                                    if(queryString.length > 0) {
                                        queryString = queryString+"&";
                                    }
                                    queryString = queryString+`product_name=${textFilter}`;
                                }
                                if(selectedCategory || (textFilter && textFilter.length > 0)) {
                                    navigate({ 
                                        pathname: "/search_products",
                                        search: `?${queryString}`,
                                    });
                                } else {
                                    alertError("Insira os dados do produto que deseja buscar.");
                                }
                            }}
                        >
                            <button 
                                type="button"
                                className="top-bar-filter-button"
                                onClick={(e)=>{
                                    setFilterEl(e.currentTarget);
                                    setFiltersIsOpen(!filtersIsOpen);
                                }}
                            >
                                <FaFilter/>
                            </button>
                            <Popover
                                className="top-bar-filter-popover"
                                anchorEl={filterEl}
                                open={filtersIsOpen}
                                id={filtersIsOpen ? "filter-popover" : undefined}
                                onClose={() => {
                                    setFilterEl(null);
                                    setFiltersIsOpen(false);
                                }}
                                transformOrigin={{
                                    horizontal: "left",
                                    vertical: "top",
                                }}
                                anchorOrigin={{
                                    horizontal: "left",
                                    vertical: "bottom",
                                }}
                            >
                                {
                                    categories.map(category=>{
                                        return (
                                            <div className="top-bar-filter-checkbox-container" onClick={()=>{document.getElementById(category.label)?.click()}}>
                                                <input 
                                                    id={category.label} 
                                                    checked={category.value === selectedCategory} 
                                                    className="top-bar-filter-checkbox" 
                                                    type="checkbox" 
                                                    onChange={(e)=>{
                                                        if(e.target.checked) {
                                                            setSelectedCategory(category.value);
                                                        } else {
                                                            setSelectedCategory(undefined);
                                                        }
                                                    }} 
                                                />
                                                {category.label}
                                            </div>
                                        )
                                    })
                                }
                            </Popover>
                            <div className="top-bar-search-container">
                                <FormGroup
                                    type="text"
                                    id="search-project"
                                    placeholder="Busque um produto..."
                                    size="100"
                                    inputContainerExtraClass="top-bar-search-input-container"
                                    inputExtraClass="top-bar-search-input"
                                    onChange={(value)=>{
                                        setTextFilter(value as string);
                                    }}
                                />
                                <button className="top-bar-search-button" type="submit">
                                    <FaSearch/>
                                </button>
                            </div>
                        </form>
                        <div className="top-bar-buttons-container">
                            <div className="top-bar-icon-container">
                                {shoppingCartCount ? <div className="top-bar-shopping-cart-count">{shoppingCartCount}</div> : ""}
                                <AiOutlineShoppingCart 
                                    className="top-bar-icon" 
                                    onClick={(e)=>{
                                        setShoppingCartEl(e.currentTarget as unknown as HTMLElement);
                                        setShoppingCartIsOpen(!filtersIsOpen);
                                    }} 
                                />
                                <Popover
                                    className="top-bar-filter-popover"
                                    anchorEl={shoppingCartEl}
                                    open={shoppingCartIsOpen}
                                    id={shoppingCartIsOpen ? "shopping-cart-popover" : undefined}
                                    onClose={() => {
                                        setShoppingCartEl(null);
                                        setShoppingCartIsOpen(false);
                                    }}
                                    transformOrigin={{
                                        horizontal: "left",
                                        vertical: "top",
                                    }}
                                    anchorOrigin={{
                                        horizontal: "left",
                                        vertical: "bottom",
                                    }}
                                >
                                    <div className="top-bar-shopping-cart-link-container">
                                        <Link className="top-bar-shopping-cart-link" to={"/shopping_cart" }>{`Meu carrinho (${shoppingCartCount})`}</Link>
                                    </div>
                                    <div className="top-bar-shopping-cart-link-container">
                                        <Link className="top-bar-shopping-cart-link" to={"/shopping_history"}>Histórico de compras</Link>
                                    </div>
                                </Popover>
                            </div>
                            <div className="top-bar-icon-container">
                                <CgProfile 
                                    className="top-bar-icon" 
                                    onClick={(e)=>{
                                        if(userIsAuth) {
                                            setUserEl(e.currentTarget as unknown as HTMLElement);
                                            setUserPopoverIsOpen(!userPopoverIsOpen);
                                        } else {
                                            openLoginModal();
                                        }
                                    }} 
                                />
                                <Popover
                                    className="top-bar-filter-popover"
                                    anchorEl={userEl}
                                    open={userPopoverIsOpen}
                                    id={userPopoverIsOpen ? "user-popup-popover" : undefined}
                                    onClose={() => {
                                        setUserEl(null);
                                        setUserPopoverIsOpen(false);
                                    }}
                                    transformOrigin={{
                                        horizontal: "left",
                                        vertical: "top",
                                    }}
                                    anchorOrigin={{
                                        horizontal: "left",
                                        vertical: "bottom",
                                    }}
                                >
                                    <div className="top-bar-shopping-cart-link-container">
                                        <div 
                                            className="top-bar-shopping-cart-link" 
                                            onClick={()=>{ 
                                                openProfileModal();
                                                setUserEl(null);
                                                setUserPopoverIsOpen(false);
                                            }}
                                        >
                                            Meu perfil
                                        </div>
                                    </div>
                                    <div className="top-bar-shopping-cart-link-container">
                                        <div 
                                            className="top-bar-shopping-cart-link" 
                                            onClick={()=>{ 
                                                openDeleteAccountModal();
                                                setUserEl(null);
                                                setUserPopoverIsOpen(false);
                                            }}
                                        >
                                            Deletar conta
                                        </div>
                                    </div>
                                    <div className="top-bar-shopping-cart-link-container">
                                        <div 
                                            className="top-bar-shopping-cart-link" 
                                            onClick={()=>{ 
                                                logout();
                                            }}
                                        >
                                            Sair
                                        </div>
                                    </div>
                                </Popover>
                            </div>
                    </div>
                </div>
            }
        </div>
    )
}