import React from "react";

export default function ProductTable({ products, onDelete }) {
  return (
    <table className="w-full border border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Quantity</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="text-center">
            <td className="border p-2">{p.id}</td>
            <td className="border p-2">{p.name}</td>
            <td className="border p-2">₹{p.price}</td>
            <td className="border p-2">{p.quantity}</td>
            <td className="border p-2">
              <button
                onClick={() => onDelete(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}