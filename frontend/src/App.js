import React, { useState, useMemo } from "react";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import useProducts from "./hooks/useProducts";

export default function App() {
  const { products, addProduct, deleteProduct } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Product Manager</h1>

      <input
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      <ProductForm onAdd={addProduct} />

      <ProductTable products={filteredProducts} onDelete={deleteProduct} />
    </div>
  );
}