import { ReactNode } from 'react';

import "./PageContainer.css";

interface IPageContainerProps {
    children: ReactNode;
}

export default function PageContainer(props: IPageContainerProps) {
    return (
        <div className="default-page-container">
            <div className="default-page-container-content">
                {props.children}
            </div>
        </div>
    )
}