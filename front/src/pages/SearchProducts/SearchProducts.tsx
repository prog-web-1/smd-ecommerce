import { useSearchParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer/PageContainer";
import { ProductCard } from "../../components/ProductsCarousel/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { getFilteredProducts } from "./requests";

import "./SearchProducts.css";

export default function SearchProducts() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<Record<string, unknown>[]>([]);

    useEffect(()=>{
        const productName = searchParams.get("product_name");
        const categoryId = searchParams.get("category_id");
        const filters = {} as Record<string, unknown>;

        if(productName) {
            filters.nome = productName;
        }

        if(categoryId) {
            filters.categoria = categoryId;
        }

        getFilteredProducts({filters}).then(products=>{
            setProducts(products);
        });
    }, [])

    return (
        <PageContainer>
            <div className="search_product_page">
                { products.length > 0 ? 
                    <div>
                        {products.map(product=>{
                            return (
                                <ProductCard
                                    id={product.id as number}
                                    name={product.name as string}
                                    description={product.description as string}
                                    stock={product.stock as number}
                                    price={product.price as number}
                                    image={product.image as string}
                                />
                            )
                        })}
                    </div>
                :
                    <div className="search_product_page_no-data-container">Nenhum produto encontrado</div>
                }
            </div>
        </PageContainer>
    )
}