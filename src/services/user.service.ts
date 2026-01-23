import { UserDocument, UserModel } from "../models/user.model";
import { AppError } from "../utils/app.error";

export interface User {
  name: string;
  email: string;
  isAdmin: boolean;
}

export const createUser = async (name: string, email: string, age: number) => {
  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    throw new Error("User with this email already exists");
  }

  const newUser: UserDocument = {
    name,
    email,
    age,
  };

  const created = await UserModel.create(newUser);
  return created;
};
export const findAllUsers = async () => {
  const users = await UserModel.find();

  if (users.length === 0) {
    return {
      message: "No users found",
    };
  }

  return users;
};

export const getUserById = async (id: string) => {
  const getUserId = await UserModel.findById(id);

  if (!getUserId) {
    throw new Error("User not found");
  }
  return getUserId;
};

export const updateById = async (
  id: string,
  updateData: Partial<UserDocument>,
) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }
  return updatedUser;
};
export const deleteUserService = async (id: string) => {
  const userToDelete = await UserModel.findById(id);

  if (!userToDelete) {
    throw new AppError("User not found", 404);
  }

  await UserModel.findByIdAndDelete(userToDelete._id);
  return userToDelete;
};
