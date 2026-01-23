import mongoose from "mongoose";
import { email, z } from "zod";

export interface UserDocument {
  name: string;
  email: string;
  age: number;
  createdAt?: string;
  updatedAt?: string;
}

export const createUserValidation = z.object({
  body: z.object({
    name: z.string("Please enter a valid name").min(2),
    email: z.email("Please enter a valid email "),
    age: z.number("Age must be a positive number").min(0),
  }),
});

export type CreateUserTypeZ = z.infer<typeof createUserValidation>["body"];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: "Name is required" },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
