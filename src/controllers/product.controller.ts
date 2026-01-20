import type { Request, Response } from "express";
import * as productService from "../services/product.service";

export const createProduct = async (
  req: Request<{}, {}, productService.Product>,
  res: Response,
) => {
  try {
    const { type, name, price } = req.body;

    const newProduct = await productService.createProductService(
      type,
      name,
      price,
    );

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

export const getProductById = (req: Request, res: Response) => {
  const productId = req.params.id;
  res.json({ id: productId });
};

export const findAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.findAllProducts();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  const productId = req.params.id as string;
  const product = await productService.deleteProductService(productId);

  res.json(product);
};
