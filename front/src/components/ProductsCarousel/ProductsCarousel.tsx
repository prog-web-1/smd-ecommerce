import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { ProductCard } from './ProductCard/ProductCard';

import "./ProductsCarousel.css";

export interface ProductStock {
    id: number,
    name: string,
    description: string,
    stock: number,
    price: number,
    image: string,
}

interface IProductsCarouselProps {
    products: ProductStock[]
}

export default function ProductsCarousel(props: IProductsCarouselProps) {
    const [pages, setPages] = useState<ProductStock[][]>([]);

    useEffect(()=>{
        if(props.products) {
            const pages = dividirArrayEmGrupos(props.products, 4)
            setPages(pages);
        }
    }, [props.products])

    return (
        <div className='product-carousel-component'>
            <Carousel>
                {
                    pages.map(products=>{
                        return (
                            <div style={{display: "flex"}}>
                                {products.map((product=>{
                                    return (
                                        <ProductCard
                                            id={product.id}
                                            name={product.name}
                                            description={product.description}
                                            stock={product.stock}
                                            price={product.price}
                                            image={product.image}
                                        />
                                    )
                                }))}
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

function dividirArrayEmGrupos(array: ProductStock[], tamanhoGrupo: number) {
    const grupos = [];

    for (let i = 0; i < array.length; i += tamanhoGrupo) {
      grupos.push(array.slice(i, i + tamanhoGrupo));
    }

    return grupos;
}