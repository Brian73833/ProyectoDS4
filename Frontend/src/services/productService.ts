import type { Product } from "../models/responses/Product";
import { config } from "../config";

export const getImageUrl = (path: string | null | undefined) => {
  if (!path) return "https://via.placeholder.com/400x500?text=No+Image";
  if (path.startsWith("http")) return path;
  return `${config.api.url}/${path}`;
};

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${config.api.url}/api/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}
