import mongoose from "mongoose";
import { APP_URL } from "../config";

const schema = mongoose.Schema;

const productSchema = new schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    countInStock: { type: Number, required: true },
    numOfReviews: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true, id: false }
);
export default mongoose.model("Product", productSchema, "products");
