import { useState } from "react";
import { FadeLoader } from "react-spinners";

import "./Loader.css";

export let openLoader: ()=>void;
export let closeLoader: ()=>void;

let loadingIndex = 0;

export function Loader() {
    const [loaderPile, setLoaderPile] = useState(0);

    openLoader = ()=>{
        loadingIndex = loadingIndex+1;
        setLoaderPile(loadingIndex);
    }

    closeLoader = ()=>{
        loadingIndex = loadingIndex-1;
        setLoaderPile(loadingIndex);
    }

    return (
        <div 
            className="loader-blur"
            style={{
                display: loaderPile > 0 ? "flex" : "none",
                zIndex: 20,
            }}
        >
            <FadeLoader color={"#020080"} loading={true} height={15} width={5} />
        </div>
    )
}