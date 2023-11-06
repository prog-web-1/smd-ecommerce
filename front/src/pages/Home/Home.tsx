import PageContainer from "../../components/PageContainer/PageContainer";
import { useEffect, useState } from "react";
import ProductsCarousel, { ProductStock } from "../../components/ProductsCarousel/ProductsCarousel";
import { homeRequest } from "./requests";

import "./Home.css";

export default function Home() {
    const [categories, setCategories] = useState<{name: string, products: ProductStock[]}[]>([]);

    useEffect(()=>{
        homeRequest().then(categories=>{
            setCategories(categories);
        });
    }, [])

    return (
        <PageContainer>
            <div style={{paddingBottom: "20px"}}>
                {
                    categories.map(category=>{
                        return (
                            <div className="home-category-box">
                                <div className="home-category-title"><strong>{category.name}</strong></div>
                                <ProductsCarousel products={category.products} />
                            </div>
                        )
                    })
                }
            </div>
        </PageContainer>
    )
}