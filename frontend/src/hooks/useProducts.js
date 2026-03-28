import { useState } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 50000, quantity: 2 },
    { id: 2, name: "Phone", price: 20000, quantity: 5 },
  ]);

  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return { products, addProduct, deleteProduct };
}