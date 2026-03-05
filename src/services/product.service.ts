import { AppError } from "../utils/app.error";
import { pool } from "../config/db";

export interface Products {
  id: string;
  name: string;
  price: number;
  createdat: string;
  updatedat: string;
}

export const createProduct = async (data: Partial<Products>) => {
  const query =
    "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id, name, price, createdat, updatedat";

  const values = [data.name, data.price];
  const result = await pool.query<Partial<Products>>(query, values);
  if (!result.rows[0]) {
    throw new AppError("Failed to create product", 500);
  }
  return result.rows[0];
};

export const findAllProducts = async () => {
  const results = await pool.query<Partial<Products>>(
    "SELECT id, name, price, createdat, updatedat FROM products",
  );
  console.log(results);

  if (results.rows.length === 0) {
    throw new AppError("No products found", 404);
  }
  return results.rows;
};

export const getProductById = async (id: string) => {
  const getProductId = await pool.query<Partial<Products>>(
    "SELECT id, name, price, createdat, updatedat FROM products WHERE id = $1",
    [id],
  );
  if (getProductId.rows.length === 0) {
    throw new AppError("Product not found", 404);
  }
  return getProductId.rows[0];
};

export const updateById = async (id: string, updateData: Partial<Products>) => {
  const fields = Object.keys(updateData);
  const values = Object.values(updateData);
  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");
  const query = `UPDATE products SET ${setClause} WHERE id = $1 RETURNING id, name, price, createdat, updatedat`;
  const result = await pool.query<Partial<Products>>(query, [id, ...values]);
  if (!result.rows[0]) {
    throw new AppError("Failed to update product", 500);
  }
  return result.rows[0];
};

export const deleteProductService = async (id: string) => {
  const deleteProduct = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id],
  );
  if (deleteProduct.rows.length === 0) {
    throw new AppError("Product not found", 404);
  }
  return deleteProduct.rows[0];
};
