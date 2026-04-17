import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function ProductTable({ products = [], onDelete }) {
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const priceBody = (rowData) => (
    <span className="font-medium text-blue-600">
      {formatCurrency(rowData.price)}
    </span>
  );

  const quantityBody = (rowData) => (
    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
      {rowData.quantity}
    </span>
  );

  const totalValueBody = (rowData) => (
    <span className="font-semibold text-green-600">
      {formatCurrency(rowData.price * rowData.quantity)}
    </span>
  );

  const actionBody = (rowData) => (
    <Button
      icon="pi pi-trash"
      label="Delete"
      className="p-button-danger p-button-sm"
      outlined
      onClick={() => onDelete(rowData.id)}
    />
  );

  const header = (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-800">
        Product Inventory
      </h2>
      <span className="text-sm text-gray-500">
        Total Items: {products.length}
      </span>
    </div>
  );

  const emptyMessage = (
    <div className="text-center py-6 text-gray-500">
      <i className="pi pi-inbox text-3xl mb-2 block"></i>
      No products available
    </div>
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 border border-gray-100">
      <DataTable
        value={products}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 15]}
        stripedRows
        showGridlines
        responsiveLayout="scroll"
        emptyMessage={emptyMessage}
        header={header}
        className="p-datatable-sm"
      >
        <Column field="id" header="ID" sortable style={{ width: "80px" }} />
        <Column field="name" header="Product Name" sortable />
        <Column field="price" header="Price" body={priceBody} sortable />
        <Column
          field="quantity"
          header="Quantity"
          body={quantityBody}
          sortable
        />
        <Column header="Total Value" body={totalValueBody} sortable />
        <Column
          header="Actions"
          body={actionBody}
          style={{ width: "140px" }}
        />
      </DataTable>
    </div>
  );
}