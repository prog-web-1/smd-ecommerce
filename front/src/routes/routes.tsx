import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import ShoppingHistory from "../pages/ShoppingHistory/ShoppingHistory";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import SearchProducts from "../pages/SearchProducts/SearchProducts";
import AdminLayout from "../components/AdminLayout/AdminLayout";
import AdminCategories from "../pages/AdminCategories/AdminCategories";
import AdminProducts from "../pages/AdminProducts/AdminProducts";
import AdminPurchases from "../pages/AdminPurchases/AdminPurchases";
import AdminReports from "../pages/AdminReports/AdminReports";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

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
                <Route path="admin/categories" element={<AdminLayout><AdminCategories/></AdminLayout>}/>
                <Route path="admin/products" element={<AdminLayout><AdminProducts/></AdminLayout>}/>
                <Route path="admin/purchases" element={<AdminLayout><AdminPurchases/></AdminLayout>}/>
                <Route path="admin/reports" element={<AdminLayout><AdminReports/></AdminLayout>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;