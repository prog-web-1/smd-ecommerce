import { ReactNode } from 'react';
import { Loader } from '../Loader/Loader';
import { Alert } from '../Alert/Alert';
import TopBar from './TopBar/TopBar';

import "./Layout.css";
import { ModalsProvider } from './ModalsProvider';

interface ILayoutProps {
    children: ReactNode;
}

function Layout(props: ILayoutProps) {
    return(
        <div className="page-container">
            <Loader/>
            <Alert/>
            <TopBar/>
            <ModalsProvider/>
            <div className="content-box">
                {props.children}
            </div>
        </div>
    ) 
}

export default Layout;