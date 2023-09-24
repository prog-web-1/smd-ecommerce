import PageContainer from "../../components/PageContainer/PageContainer";
import { ProductCard } from "../../components/ProductsCarousel/ProductCard/ProductCard";
import "./SearchProducts.css";

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

export default function SearchProducts() {
    return (
        <PageContainer>
            <div className="search_product_page">
                {data.map(product=>{
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
                })}
            </div>
        </PageContainer>
    )
}