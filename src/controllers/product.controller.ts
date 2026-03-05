import { Request, Response, NextFunction } from "express";
import * as productService from "../services/product.service";

export const createProduct = async (
  req: Request<{}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    console.log(data);
    const newProduct = await productService.createProduct(data);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const findAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await productService.findAllProducts();
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const changeProduct = await productService.updateById(
      req.params.id,
      req.body,
    );
    res.status(200).json(changeProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req.params.id as string;
    const product = await productService.deleteProductService(productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
};
