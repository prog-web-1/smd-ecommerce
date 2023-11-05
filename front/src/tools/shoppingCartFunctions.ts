import { alertError, alertSuccess } from "../components/Alert/Alert";
import { updateShoppingCartCount } from "../components/Layout/TopBar/TopBar";
import { makeConnection } from "./makeConnection";

export interface CartItem {
    id: number,
    name: string,
    quantity: number,
}

export function addItemToCart(productToAdd: CartItem, productStock: number) {
    const localCart = localStorage.getItem("shopping_cart");
    let cart: CartItem[] = [];

    if(localCart) {
        cart = JSON.parse(localCart) as CartItem[];
    }

    const itemInCart = cart.find(item=>item.id===productToAdd.id);

    if((itemInCart && itemInCart.quantity+productToAdd.quantity > productStock) || (productToAdd.quantity > productStock)) {
        alertError("Não é possível adicionar uma quantidade de itens maior do que o estoque.");
    } else {
        if(itemInCart) {
            cart = cart.map(item=>{
                return ({
                    ...item,
                    quantity: item.id === productToAdd.id ? item.quantity+productToAdd.quantity : item.quantity,
                })
            })
        } else {
            cart.push(productToAdd);
        }

        localStorage.setItem("shopping_cart", JSON.stringify(cart));

        if(updateShoppingCartCount) {
            const numberOfItem = getNumberOfItensInCart(cart);
            updateShoppingCartCount(numberOfItem);
        }

        alertSuccess("Item adicionado ao carrinho.");
    }
}

export function getNumberOfItensInCart(cart: CartItem[]) {
    let soma = 0;

    cart.forEach(item=>{
        soma = soma+item.quantity;
    })

    return soma;
}

export function updateNumberOfItens(productId: number, quantity: number) {
    let cart = JSON.parse(localStorage.getItem("shopping_cart") as string) as CartItem[];
    const newCartData = [] as CartItem[];

    cart.forEach(item=>{
        if((item.id === productId && quantity > 0) || item.id !== productId) {
            newCartData.push({
                ...item,
                quantity: item.id === productId ? quantity : item.quantity,
            })
        }
    })

    localStorage.setItem("shopping_cart", JSON.stringify(newCartData));

    if(updateShoppingCartCount) {
        const numberOfItem = getNumberOfItensInCart(newCartData);
        updateShoppingCartCount(numberOfItem);
    }
}

export async function validateShoppingCart(cart: CartItem[], silent?: boolean) {
    let hasError = false;
    const ids = cart.map(item=>item.id);
    const requests = ids.map(id=>getProductById(id.toString(), silent));
    const result = await Promise.all(requests);
    const validatedCartData = [] as CartItem[];
    
    cart.forEach(item=>{
        const productData = result.find(product=>product.id === item.id);

        if(!productData || (productData && productData.stock < item.quantity)) {
            hasError = true;
            if(productData && productData.stock > 0) {
                validatedCartData.push({
                    ...item,
                    quantity: productData.stock,
                })
            }
        } else {
            validatedCartData.push(item);
        }
    });

    return ({
        products: result,
        cart: validatedCartData,
        hasError: hasError,
    })
}

export async function getProductById(entityId: string, silent?: boolean) {
    const method = "get";
    const suffix = "product";

    const response = (await makeConnection({method, suffix, entityId, silent})).data as Record<string, unknown>;

    return {
        id: response.id as number,
        name: response.nome as string,
        description: response.descricao as string,
        stock: response.quantidade as number,
        price: response.preco as number,
        image: response.foto as string,
    };
}