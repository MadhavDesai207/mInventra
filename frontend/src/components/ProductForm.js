import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";

export default function ProductForm({ onAdd }) {
  const toast = useRef(null);

  const [form, setForm] = useState({
    id: null,
    name: "",
    price: null,
    quantity: null,
  });

  const [errors, setErrors] = useState({});

  // ✅ Validation
  const validate = () => {
    const newErrors = {};

    if (!form.id) newErrors.id = "ID required";
    if (!form.name) newErrors.name = "Name required";
    if (!form.price || form.price <= 0) newErrors.price = "Invalid price";
    if (!form.quantity || form.quantity <= 0)
      newErrors.quantity = "Invalid quantity";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  const handleSubmit = () => {
    if (!validate()) {
      toast.current.show({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fix the form",
      });
      return;
    }

    onAdd(form);

    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Product added",
    });

    setForm({ id: null, name: "", price: null, quantity: null });
    setErrors({});
  };

  return (
    <Card title="Add Product" className="mb-4 shadow-2">
      <Toast ref={toast} />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">

        {/* ID */}
        <div>
          <InputNumber
            value={form.id}
            onValueChange={(e) =>
              setForm({ ...form, id: e.value })
            }
            placeholder="ID"
            className="w-full"
          />
          {errors.id && <small className="text-red-500">{errors.id}</small>}
        </div>

        {/* Name */}
        <div>
          <InputText
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Product Name"
            className="w-full"
          />
          {errors.name && <small className="text-red-500">{errors.name}</small>}
        </div>

        {/* Price */}
        <div>
          <InputNumber
            value={form.price}
            onValueChange={(e) =>
              setForm({ ...form, price: e.value })
            }
            mode="currency"
            currency="INR"
            locale="en-IN"
            placeholder="Price"
            className="w-full"
          />
          {errors.price && <small className="text-red-500">{errors.price}</small>}
        </div>

        {/* Quantity */}
        <div>
          <InputNumber
            value={form.quantity}
            onValueChange={(e) =>
              setForm({ ...form, quantity: e.value })
            }
            placeholder="Quantity"
            className="w-full"
          />
          {errors.quantity && (
            <small className="text-red-500">{errors.quantity}</small>
          )}
        </div>

        {/* Button */}
        <div className="flex items-center">
          <Button
            label="Add"
            icon="pi pi-plus"
            onClick={handleSubmit}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
}