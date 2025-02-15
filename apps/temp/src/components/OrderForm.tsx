"use client";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Input } from "./ui/input";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";

export default function OrderForm({ onSubmit }: any) {
  const statusOptions = ["Processing", "Shipped", "Delivered", "Cancelled"];

  const [formData, setFormData] = useState({
    customer: "",
    date: new Date().toISOString().split("T")[0],
    total: "",
    status: "Processing",
    items: [{ name: "", quantity: 1, price: "" }],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index: any, field: any, value: any) => {
    const newItems: any = [...formData.items];
    newItems[index][field] = value;
    setFormData((prev: any) => ({
      ...prev,
      items: newItems,
      total: newItems
        .reduce((sum: any, item: any) => sum + item.quantity * item.price, 0)
        .toFixed(2),
    }));
  };

  const addItem = () => {
    setFormData((prev: any) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, price: "" }],
    }));
  };

  const removeItem = (index: any) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev: any) => ({
      ...prev,
      items: newItems,
      total: newItems
        .reduce((sum: any, item: any) => sum + item.quantity * item.price, 0)
        .toFixed(2),
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="customer">Customer Name</label>
        <Input
          id="customer"
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          name="status"
          value={formData.status}
          onValueChange={(value) =>
            handleChange({ target: { name: "status", value } })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status: any) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Items</Label>
        {formData.items.map((item, index) => (
          <div key={index} className="flex space-x-2 mt-2">
            <Input
              placeholder="Item name"
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", parseInt(e.target.value))
              }
              required
              min="1"
            />
            <Input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) =>
                handleItemChange(index, "price", parseFloat(e.target.value))
              }
              required
              min="0"
              step="0.01"
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeItem(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addItem} className="mt-2">
          Add Item
        </Button>
      </div>
      <div>
        <Label htmlFor="total">Total</Label>
        <Input id="total" name="total" value={formData.total} readOnly />
      </div>
      <DialogFooter>
        <Button type="submit">Add Order</Button>
      </DialogFooter>
    </form>
  );
}
