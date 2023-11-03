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
import Layout from "../components/Layout/Layout";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import AdminUsers from "../pages/AdminUsers/AdminUsers";

function Router() {
    const userIsAuth = localStorage.getItem("admin")

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><Home/></Layout>}/>
                <Route path="home" element={<Layout><Home/></Layout>}/>
                <Route path="product/:id" element={<Layout><Product/></Layout>}/>
                <Route path="shopping_history" element={<Layout><ShoppingHistory/></Layout>}/>
                <Route path="shopping_cart" element={<Layout><ShoppingCart/></Layout>}/>
                <Route path="search_products" element={<Layout><SearchProducts/></Layout>}/>
                <Route path="admin/categories" element={userIsAuth ? <Layout><AdminLayout><AdminCategories/></AdminLayout></Layout> : <AdminLogin/>}/>
                <Route path="admin/products" element={userIsAuth ? <Layout><AdminLayout><AdminProducts/></AdminLayout></Layout> : <AdminLogin/>}/>
                <Route path="admin/purchases" element={userIsAuth ? <Layout><AdminLayout><AdminPurchases/></AdminLayout></Layout> : <AdminLogin/>}/>
                <Route path="admin/reports" element={userIsAuth ? <Layout><AdminLayout><AdminReports/></AdminLayout></Layout> : <AdminLogin/>}/>
                <Route path="admin" element={userIsAuth ? <Layout><AdminLayout><AdminReports/></AdminLayout></Layout> : <AdminLogin/>}/>
                <Route path="admin/users" element={userIsAuth ? <Layout><AdminLayout><AdminUsers/></AdminLayout></Layout> : <AdminLogin/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;