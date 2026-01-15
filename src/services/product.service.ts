export interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Shoe", price: 50 },
  { id: 2, name: "Bag", price: 100 },
];

export const createProduct = async (
  name: string,
  price: number
): Promise<Product> => {
  return new Promise((resolve, reject) => {
    const exsistingProduct = products.find((product) => product.name === name);
    setTimeout(() => {
      if (exsistingProduct) {
        reject(new Error("Product already exists"));
        return;
      }
      const newProduct: Product = {
        id: products.length + 1,
        name,
        price,
      };
      products.push(newProduct);
      resolve(newProduct);
    }, 100);
  });
};

export const findAllProducts = async (): Promise<Product[]> => {
  return products;
};
