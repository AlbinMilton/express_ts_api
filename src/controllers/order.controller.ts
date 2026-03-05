import { Request, Response, NextFunction } from "express";
import * as orderService from "../services/order.service";

export const createOrder = async (
  req: Request<{}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    console.log(data);
    const newOrder = await orderService.createOrder(data);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const findAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await orderService.findAllOrders();
    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.status(200).json(order);
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
    const changeOrder = await orderService.updateById(req.params.id, req.body);
    res.status(200).json(changeOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrderById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orderId = req.params.id as string;
    const order = await orderService.deleteOrderService(orderId);
    res.json(order);
  } catch (error) {
    next(error);
  }
};
