import { ProductDocument, ProductModel } from "../models/product.model";
export interface Product {
  type: string;
  name: string;
  price: number;
}

export const createProductService = async (
  type: string,
  name: string,
  price: number,
) => {
  const existingProduct = await ProductModel.findOne({ name });
  if (existingProduct) {
    throw new Error("Product with this name already exists");
  }

  const newProduct: ProductDocument = {
    type,
    name,
    price,
  };

  const created = await ProductModel.create(newProduct);
  return created;
};

export const findAllProducts = async () => {
  const products = await ProductModel.find();

  if (products.length === 0) {
    return {
      message: "No products found",
    };
  }

  return products;
};

export const deleteProductService = async (id: string) => {
  const productToDelete = await ProductModel.findById(id);

  if (!productToDelete) {
    return { message: "Product not found" };
  }

  await ProductModel.findByIdAndDelete(productToDelete._id);
  return productToDelete;
};
