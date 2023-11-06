import React from 'react';
import { MdListAlt, MdHome, MdOutlineSell } from "react-icons/md";
import { testUrl } from '../../../tools/testUrl';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import "./SideBar.css";
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';

type SidebarItem = {
    key: string;
    link: string;
    icon: JSX.Element;
    onClick?: React.MouseEventHandler;
    permission?: string;
    testSidebar?: string;
    label: string;
}

const items: SidebarItem[] = [
    {
        key: "reports",
        link: "/admin/reports",
        icon: <MdHome/>,
        label: "Relatórios",
    },
    {
        key: "users",
        link: "/admin/users",
        icon: <CgProfile/>,
        label: "Usuários",
    },
    {
        key: "purchases",
        link: "/admin/purchases",
        icon: <AiOutlineShoppingCart/>,
        label: "Vendas",
    },
    {
        key: "products",
        link: "/admin/products",
        icon: <MdOutlineSell/>,
        label: "Produtos",
    },
    {
        key: "categories",
        link: "/admin/categories",
        icon: <MdListAlt/>,
        label: "Categorias",
    },
]

function SideBar() {
    return (
        <div className={`side-bar`}>
            <div className="side-bar-body">
                {items.map(item => (
                    <Link 
                        key={item.key}
                        to={item.link}
                        className={ testUrl(item.key) || (item.testSidebar ? testUrl(item.testSidebar) : false) ? "side-bar-item-active" : "side-bar-item"}
                    >
                        {React.cloneElement(item.icon, {className: "side-bar-icon"})}
                        <div className="side-bar-item-text-content">{item.label}</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideBar;