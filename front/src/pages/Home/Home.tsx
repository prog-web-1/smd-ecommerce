import PageContainer from "../../components/PageContainer/PageContainer";
import { useEffect, useState } from "react";
import ProductsCarousel, { ProductStock } from "../../components/ProductsCarousel/ProductsCarousel";

import "./Home.css";
import { homeRequest } from "./requests";

const data = [
    {
        id: "1",
        name: "Sapato",
        description: "Um sapato muito bonito",
        stock: 3,
        price: 15.20,
        image: "https://media.istockphoto.com/id/685779142/pt/foto/red-tshirt-clothes.jpg?s=1024x1024&w=is&k=20&c=ucA-J_IS2avss1xgGo7Ms_CFRQE6Aw0T0jkQPaSVmrs="
    },
];

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