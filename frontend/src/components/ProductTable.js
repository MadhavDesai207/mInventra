import React, { useMemo, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function ProductTable({ products = [], onDelete }) {
  const [globalFilter, setGlobalFilter] = useState("");

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);

  const stats = useMemo(() => {
    const totalQty = products.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      totalQty,
      totalValue,
    };
  }, [products]);

  const getStockSeverity = (qty) => {
    if (qty === 0) return "danger";
    if (qty <= 5) return "warning";
    return "success";
  };

  const getStockLabel = (qty) => {
    if (qty === 0) return "Out of Stock";
    if (qty <= 5) return "Low Stock";
    return "In Stock";
  };

  const idBody = (rowData) => (
    <span className="font-semibold text-gray-600">#{rowData.id}</span>
  );

  const nameBody = (rowData) => (
    <div className="flex flex-col">
      <span className="font-semibold text-gray-800">{rowData.name}</span>
      <small className="text-gray-400">Inventory Item</small>
    </div>
  );

  const priceBody = (rowData) => (
    <span className="font-semibold text-blue-600">
      {formatCurrency(rowData.price)}
    </span>
  );

  const quantityBody = (rowData) => (
    <Tag
      value={`${rowData.quantity} Units`}
      severity={getStockSeverity(rowData.quantity)}
      rounded
    />
  );

  const stockBody = (rowData) => (
    <Tag
      value={getStockLabel(rowData.quantity)}
      severity={getStockSeverity(rowData.quantity)}
      rounded
    />
  );

  const totalValueBody = (rowData) => (
    <span className="font-bold text-green-600">
      {formatCurrency(rowData.price * rowData.quantity)}
    </span>
  );

  const actionBody = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-eye"
        rounded
        text
        severity="info"
        tooltip="View"
      />
      <Button
        icon="pi pi-trash"
        rounded
        text
        severity="danger"
        tooltip="Delete"
        onClick={() => onDelete?.(rowData.id)}
      />
    </div>
  );

  const header = (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Product Inventory
        </h2>
        <p className="text-sm text-gray-500">
          Manage products efficiently
        </p>
      </div>

      <span className="p-input-icon-left w-full md:w-80">
        <i className="pi pi-search" />
        <InputText
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search products..."
          className="w-full"
        />
      </span>
    </div>
  );

  const footer = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
      <div className="bg-gray-50 rounded-xl px-4 py-3">
        <p className="text-gray-500">Products</p>
        <p className="font-bold text-lg">{products.length}</p>
      </div>

      <div className="bg-gray-50 rounded-xl px-4 py-3">
        <p className="text-gray-500">Total Quantity</p>
        <p className="font-bold text-lg">{stats.totalQty}</p>
      </div>

      <div className="bg-gray-50 rounded-xl px-4 py-3">
        <p className="text-gray-500">Inventory Value</p>
        <p className="font-bold text-lg text-green-600">
          {formatCurrency(stats.totalValue)}
        </p>
      </div>
    </div>
  );

  const emptyMessage = (
    <div className="text-center py-10">
      <i className="pi pi-inbox text-5xl text-gray-300 mb-3 block"></i>
      <p className="text-lg font-semibold text-gray-600">
        No Products Found
      </p>
      <small className="text-gray-400">
        Add products to start managing inventory
      </small>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4">
      <DataTable
        value={products}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 15, 20]}
        stripedRows
        showGridlines
        removableSort
        responsiveLayout="scroll"
        globalFilter={globalFilter}
        emptyMessage={emptyMessage}
        header={header}
        footer={footer}
        className="p-datatable-sm"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      >
        <Column field="id" header="ID" body={idBody} sortable />
        <Column field="name" header="Product Name" body={nameBody} sortable />
        <Column field="price" header="Price" body={priceBody} sortable />
        <Column
          field="quantity"
          header="Quantity"
          body={quantityBody}
          sortable
        />
        <Column header="Stock Status" body={stockBody} sortable />
        <Column header="Total Value" body={totalValueBody} sortable />
        <Column
          header="Actions"
          body={actionBody}
          style={{ width: "120px" }}
        />
      </DataTable>
    </div>
  );
}