import mongoose from "mongoose";
export interface ProductDocument {
  type: string;
  name: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

const productSchema = new mongoose.Schema(
  {
    type: { type: String, required: "Type is required" },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: "Price is required" },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model<ProductDocument>(
  "Product",
  productSchema,
);
