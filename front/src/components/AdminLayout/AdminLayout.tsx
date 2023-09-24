import { ReactNode } from 'react';
import SideBar from './SideBar/SideBar';

import "./AdminLayout.css";

interface IAdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout(props: IAdminLayoutProps) {
    return (
        <div className={"admin-layout-body"}>
            <SideBar />
            <div className={"admin-layout-content"}>
                {props.children}
            </div>
        </div>
    )
}