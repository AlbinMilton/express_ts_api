// import { UserDocument, UserModel } from "../models/user.model";
import { AppError } from "../utils/app.error";
import { pool } from "../config/db";

export interface Orders {
  id: string;
  user_id: string;
  createdat: string;
  updatedat: string;
}

export const createOrder = async (data: Partial<Orders>) => {
  const query =
    "INSERT INTO Orders (user_id) VALUES ($1) RETURNING id, user_id, createdat, updatedat";

  const values = [data.user_id];
  const result = await pool.query<Partial<Orders>>(query, values);
  if (!result.rows[0]) {
    throw new AppError("Failed to create order", 500);
  }
  return result.rows[0];
};

export const findAllOrders = async () => {
  const results = await pool.query<Partial<Orders>>(
    "SELECT id, user_id, createdat, updatedat FROM orders",
  );
  console.log(results);

  if (results.rows.length === 0) {
    throw new AppError("No orders found", 404);
  }
  return results.rows;
};

export const getOrderById = async (id: string) => {
  const getOrderById = await pool.query<Partial<Orders>>(
    "SELECT id, user_id, createdat, updatedat FROM orders WHERE id = $1",
    [id],
  );
  if (getOrderById.rows.length === 0) {
    throw new AppError("Order not found", 404);
  }
  return getOrderById.rows[0];
};

export const updateById = async (id: string, updateData: Partial<Orders>) => {
  const fields = Object.keys(updateData);
  const values = Object.values(updateData);
  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");
  const query = `UPDATE orders SET ${setClause} WHERE id = ${id} RETURNING id, user_id, createdat, updatedat`;
  const result = await pool.query<Partial<Orders>>(query, values);
  if (!result.rows[0]) {
    throw new AppError("Failed to update order", 500);
  }
  return result.rows[0];
};

export const deleteOrderService = async (id: string) => {
  const deleteOrder = await pool.query(
    "DELETE FROM orders WHERE id = $1 RETURNING *",
    [id],
  );
  if (deleteOrder.rows.length === 0) {
    throw new AppError("Order not found", 404);
  }
  return deleteOrder.rows[0];
};
