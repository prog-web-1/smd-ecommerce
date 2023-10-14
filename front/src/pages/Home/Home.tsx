import PageContainer from "../../components/PageContainer/PageContainer";
import { useState } from "react";
import ProductsCarousel from "../../components/ProductsCarousel/ProductsCarousel";

import "./Home.css";

const data = [
    {
        id: "1",
        name: "Sapato",
        description: "Um sapato muito bonito",
        stock: 3,
        price: 15.20,
        image: "https://media.istockphoto.com/id/685779142/pt/foto/red-tshirt-clothes.jpg?s=1024x1024&w=is&k=20&c=ucA-J_IS2avss1xgGo7Ms_CFRQE6Aw0T0jkQPaSVmrs="
    },
    {
        id: "2",
        name: "Outro Sapato",
        description: "Outro sapato muito bonito",
        stock: 1,
        price: 10.20,
        image: "https://www.louie.com.br/loja/image/cache/data/colecao-2019/viccini/OLIVE/OLIVE%20V%201-550x550.jpg"
    },
    {
        id: "3",
        name: "Sapato",
        description: "Um sapato muito bonito",
        stock: 2,
        price: 1.20,
        image: "https://www.louie.com.br/loja/image/cache/data/colecao-2019/viccini/OLIVE/OLIVE%20V%201-550x550.jpg"
    },
    {
        id: "4",
        name: "Sapato",
        description: "Um sapato muito bonito",
        stock: 3,
        price: 10.20,
        image: "https://www.louie.com.br/loja/image/cache/data/colecao-2019/viccini/OLIVE/OLIVE%20V%201-550x550.jpg"
    },
    {
        id: "5",
        name: "Sapato",
        description: "Um sapato muito bonito",
        stock: 3,
        price: 10.20,
        image: "https://www.louie.com.br/loja/image/cache/data/colecao-2019/viccini/OLIVE/OLIVE%20V%201-550x550.jpg"
    },
    {
        id: "6",
        name: "Sapato",
        description: "Um sapato muito bonito",
        stock: 3,
        price: 10.20,
        image: "https://www.louie.com.br/loja/image/cache/data/colecao-2019/viccini/OLIVE/OLIVE%20V%201-550x550.jpg"
    },
    {
        id: "7",
        name: "Sapato",
        description: "Um sapato muito bonito",
        stock: 3,
        price: 10.20,
        image: "https://www.louie.com.br/loja/image/cache/data/colecao-2019/viccini/OLIVE/OLIVE%20V%201-550x550.jpg"
    },
    {
        id: "8",
        name: "Sapato",
        description: "Um sapato muito bonito",
        stock: 3,
        price: 10.20,
        image: "https://www.louie.com.br/loja/image/cache/data/colecao-2019/viccini/OLIVE/OLIVE%20V%201-550x550.jpg"
    },
];

const categoriesData = [
    {
        name: "Recomendados",
        products: data,
    },
    {
        name: "Categoria 1",
        products: data,
    },
    {
        name: "Categoria 2",
        products: data,
    },
    {
        name: "Categoria 3",
        products: data,
    },
    {
        name: "Categoria 4",
        products: data,
    },
]

export default function Home() {
    const [categories, setCategories] = useState(categoriesData);

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