import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { classNames } from "primereact/utils";

export default function ProductForm({ onAdd }) {
  const toast = useRef(null);
  const [form, setForm] = useState({
    id: null,
    name: "",
    price: null,
    quantity: null,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.id) newErrors.id = "ID required";
    if (!form.name.trim()) newErrors.name = "Name required";
    if (form.price === null || form.price <= 0) newErrors.price = "Invalid price";
    if (form.quantity === null || form.quantity <= 0) newErrors.quantity = "Invalid quantity";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      toast.current.show({
        severity: "warn",
        summary: "Validation",
        detail: "Please complete all fields correctly.",
        life: 3000,
      });
      return;
    }
    onAdd(form);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Product added to inventory",
      life: 3000,
    });
    setForm({ id: null, name: "", price: null, quantity: null });
    setErrors({});
  };

  return (
    <Card title="Product Details" className="shadow-4 border-round-xl mb-4">
      <Toast ref={toast} />
      <div className="grid p-fluid">
        {/* ID Field */}
        <div className="col-12 md:col-2 mt-4">
          <FloatLabel>
            <InputNumber
              id="prod-id"
              value={form.id}
              useGrouping={false}
              onValueChange={(e) => setForm({ ...form, id: e.value })}
              className={classNames({ "p-invalid": errors.id })}
            />
            <label htmlFor="prod-id">Product ID</label>
          </FloatLabel>
          {errors.id && <small className="p-error ml-1">{errors.id}</small>}
        </div>

        {/* Name Field */}
        <div className="col-12 md:col-4 mt-4">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-tag"></i>
            </span>
            <FloatLabel>
              <InputText
                id="prod-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={classNames({ "p-invalid": errors.name })}
              />
              <label htmlFor="prod-name">Product Name</label>
            </FloatLabel>
          </div>
          {errors.name && <small className="p-error ml-1">{errors.name}</small>}
        </div>

        {/* Price Field */}
        <div className="col-12 md:col-3 mt-4">
          <FloatLabel>
            <InputNumber
              id="prod-price"
              value={form.price}
              onValueChange={(e) => setForm({ ...form, price: e.value })}
              mode="currency"
              currency="INR"
              locale="en-IN"
              className={classNames({ "p-invalid": errors.price })}
            />
            <label htmlFor="prod-price">Price</label>
          </FloatLabel>
          {errors.price && <small className="p-error ml-1">{errors.price}</small>}
        </div>

        {/* Quantity Field */}
        <div className="col-12 md:col-3 mt-4">
          <FloatLabel>
            <InputNumber
              id="prod-qty"
              value={form.quantity}
              onValueChange={(e) => setForm({ ...form, quantity: e.value })}
              showButtons
              buttonLayout="horizontal"
              step={1}
              decrementButtonClassName="p-button-secondary"
              incrementButtonClassName="p-button-secondary"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              className={classNames({ "p-invalid": errors.quantity })}
            />
            <label htmlFor="prod-qty" className="ml-5">Quantity</label>
          </FloatLabel>
          {errors.quantity && <small className="p-error ml-1">{errors.quantity}</small>}
        </div>

        {/* Action Button */}
        <div className="col-12 flex justify-content-end mt-2">
          <Button
            label="Add Product"
            icon="pi pi-check"
            onClick={handleSubmit}
            className="p-button-raised p-button-success w-full md:w-auto px-6"
          />
        </div>
      </div>
    </Card>
  );
}