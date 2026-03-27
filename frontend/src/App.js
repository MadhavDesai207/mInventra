import React, { useState } from "react";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 50000, quantity: 2 },
    { id: 2, name: "Phone", price: 20000, quantity: 5 },
  ]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add Product (local state only)
  const addProduct = () => {
    if (!form.id || !form.name) return;

    setProducts([...products, form]);
    setForm({ id: "", name: "", price: "", quantity: "" });
  };

  // Delete Product
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🛒 Product Manager</h1>

      {/* Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          name="id"
          placeholder="ID"
          value={form.id}
          onChange={handleChange}
        />
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />

        <button onClick={addProduct} style={{ marginLeft: "10px" }}>
          Add Product
        </button>
      </div>

      {/* Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <button onClick={() => deleteProduct(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;