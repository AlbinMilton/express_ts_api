import type { Request, Response } from "express";

export const getProducts = (req: Request, res: Response) => {
  const products = [
    { id: 1, name: "Shoe", price: 50 },
    { id: 2, name: "Bag", price: 100 },
  ];
  res.status(200).json(products);
};

export const createProduct = (req: Request, res: Response) => {
  const { name, price } = req.body;

  res.status(201).json({
    message: "Product Created",
    data: { price, name },
  });
};

export const getProductById = (req: Request, res: Response) => {
  const productId = req.params.id;
  res.json({ id: productId });
};
