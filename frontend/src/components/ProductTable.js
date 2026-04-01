import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function ProductTable({ products, onDelete }) {
  const priceBody = (rowData) => `₹${rowData.price}`;

  const totalValueBody = (rowData) =>
    `₹${rowData.price * rowData.quantity}`;

  const actionBody = (rowData) => (
    <Button
      label="Delete"
      icon="pi pi-trash"
      className="p-button-danger p-button-sm"
      onClick={() => onDelete(rowData.id)}
    />
  );

  const emptyMessage = (
    <div className="text-center py-4 text-gray-500">
      No products available
    </div>
  );

  return (
    <div className="card shadow-md rounded-xl p-3">
      <DataTable
        value={products}
        paginator
        rows={5}
        responsiveLayout="scroll"
        emptyMessage={emptyMessage}
        className="p-datatable-sm"
      >
        <Column field="id" header="ID" sortable />
        <Column field="name" header="Name" sortable />
        <Column field="price" header="Price" body={priceBody} sortable />
        <Column field="quantity" header="Quantity" sortable />
        <Column
          header="Total Value"
          body={totalValueBody}
        />
        <Column header="Actions" body={actionBody} />
      </DataTable>
    </div>
  );
}