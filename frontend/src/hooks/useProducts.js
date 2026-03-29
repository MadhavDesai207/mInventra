import { useState,useEffect } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 50000, quantity: 2 },
    { id: 2, name: "Phone", price: 20000, quantity: 5 },
  ]);

  useEffect(() => {
  const saved = localStorage.getItem("products");
  if (saved) setProducts(JSON.parse(saved));
}, []);

useEffect(() => {
  localStorage.setItem("products", JSON.stringify(products));
}, [products]);

 const addProduct = (product) => {
  setProducts((prev) => {
    const exists = prev.find((p) => p.id === product.id);
    if (exists) {
      alert("Product with this ID already exists!");
      return prev;
    }
    return [...prev, product];
  });
};

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return { products, addProduct, deleteProduct };
}