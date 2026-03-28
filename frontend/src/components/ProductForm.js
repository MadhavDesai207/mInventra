import React, { useState } from "react";

export default function ProductForm({ onAdd }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.id || !form.name) return;

    onAdd({
      ...form,
      id: Number(form.id),
      price: Number(form.price),
      quantity: Number(form.quantity),
    });

    setForm({ id: "", name: "", price: "", quantity: "" });
  };

  return (
    <div className="mb-6 grid grid-cols-5 gap-2">
      <input name="id" placeholder="ID" value={form.id} onChange={handleChange} className="border p-2 rounded" />
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 rounded" />
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 rounded" />
      <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} className="border p-2 rounded" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white rounded px-4">
        Add
      </button>
    </div>
  );
}
