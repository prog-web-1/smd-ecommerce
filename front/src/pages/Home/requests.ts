import { makeConnection } from "../../tools/makeConnection";

export async function homeRequest() {
  const method = "get";
  const suffix = "category";
  const otherQueryStrings = {
    offset: 0,
    limit: 10000,
    sort: "ASC",
    order: "nome",
  };

  const response = (await makeConnection({ method, suffix, otherQueryStrings }))
    .data as Record<string, unknown>;

  let categories = (response.data as Record<string, unknown>[]).map(
    (category) => {
      return {
        name: category.nome as string,
        products: (category.products as Record<string, unknown>[]).map(
          (product) => {
            return {
              id: product.id as number,
              name: product.nome as string,
              description: product.descricao as string,
              stock: product.quantidade as number,
              price: product.preco as number,
              image: product.foto as string,
            };
          }
        ),
      };
    }
  );

  categories = categories.map((category) => ({
    name: category.name,
    products: category.products.filter((product) => product.stock > 0),
  }));

  categories = categories.filter((category) => category.products.length > 0);

  categories.sort((a, b) => b.products.length - a.products.length);

  categories = categories.slice(0, 4);

  categories = categories.map((category) => ({
    name: category.name,
    products: category.products.sort((a, b) => b.stock - a.stock),
  }));

  return categories;
}
