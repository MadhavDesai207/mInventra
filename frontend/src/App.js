import React from "react";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import useProducts from "./hooks/useProducts";

export default function App() {
  const { products, addProduct, deleteProduct } = useProducts();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Product Manager</h1>

      <ProductForm onAdd={addProduct} />

      <ProductTable products={products} onDelete={deleteProduct} />
    </div>
  );
}