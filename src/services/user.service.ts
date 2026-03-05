import { UserModel } from "../models/user.model";
import { AppError } from "../utils/app.error";
import { pool } from "../config/db";

export interface Users {
  id: string;
  name: string;
  email: string;
  createdat: string;
  updatedat: string;
}

export const createUser = async (data: Partial<Users>) => {
  const query =
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, createdat, updatedat";
  const values = [data.name, data.email];
  const result = await pool.query<Partial<Users>>(query, values);
  if (!result.rows[0]) {
    throw new AppError("Failed to create user", 500);
  }
  return result.rows[0];
};

export const findAllUsers = async () => {
  const results = await pool.query<Partial<Users>>(
    "SELECT id, name, email, createdat, updatedat FROM users",
  );
  console.log(results);

  if (results.rows.length === 0) {
    throw new AppError("No users found", 404);
  }
  return results.rows;
};

export const getUserById = async (id: string) => {
  const getUserId = await UserModel.findById(id);
  if (!getUserId) {
    throw new AppError("User not found", 404);
  }
  return getUserId;
};

export const updateById = async (id: string, updateData: Partial<Users>) => {
  const fields = Object.keys(updateData);
  const values = Object.values(updateData);
  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");
  const query = `UPDATE users SET ${setClause} WHERE id = ${id} RETURNING id, name, email, createdat, updatedat`;
  const result = await pool.query<Partial<Users>>(query, values);
  if (!result.rows[0]) {
    throw new AppError("Failed to update user", 500);
  }
  return result.rows[0];
};

export const deleteUserService = async (id: string) => {
  const deleteUser = await UserModel.findByIdAndDelete(id);
  if (!deleteUser) {
    throw new AppError("Couldn't delete it", 404);
  }
  return deleteUser;
};
