import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import ShoppingHistory from "../pages/ShoppingHistory/ShoppingHistory";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import SearchProducts from "../pages/SearchProducts/SearchProducts";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="home" element={<Home/>}/>
                <Route path="product/:id" element={<Product/>}/>
                <Route path="shopping_history" element={<ShoppingHistory/>}/>
                <Route path="shopping_cart" element={<ShoppingCart/>}/>
                <Route path="search_products" element={<SearchProducts/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;