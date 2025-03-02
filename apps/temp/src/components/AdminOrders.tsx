"use client";

import React, { useEffect, useState } from "react";
import OrderForm from "./OrderForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  MoreVertical,
  Search,
  Filter,
} from "lucide-react";
import { fetchOrders, updateOrderStatus } from "@/actions/order";
import Link from "next/link";
import { toast } from "react-toastify";

const statusOptions = ["processing", "cancelled", "shipped", "delivered"];

export default function AdminOrders({ products }: any) {
  const [orders, setOrders] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);

  // Set orders based on products when the component mounts or products change
  useEffect(() => {
    setOrders(products);
  }, [products]);

  const filteredOrders = orders.filter(
    (order: any) =>
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || order.status === statusFilter)
  );

  const totalRevenue = orders.reduce(
    (sum: any, order: any) => sum + order.total,
    0
  );
  const averageOrderValue = totalRevenue / orders.length || 0; // Prevent division by zero

  const handleStatusChange = async (orderId: any, newStatus: any) => {
    const updatedOrders = await updateOrderStatus({ orderId, status: newStatus });
    setOrders(updatedOrders);
    toast.success("Status Updated");
    setSelectedOrder(null);
  };

  const handleAddOrder = (newOrder: any) => {
    setOrders((prevOrders:any) => [
      ...prevOrders,
      { ...newOrder, id: `ORD${prevOrders.length + 1}`.padStart(6, "0") },
    ]);
    setIsAddOrderOpen(false);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${averageOrderValue.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter by Status: {statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                All
              </DropdownMenuItem>
              {statusOptions.map((status: any) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>
                  {new Date(order.createdDate).toLocaleDateString()}
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                      {statusOptions.map((status: any) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => handleStatusChange(order.id, status)}
                        >
                          Mark as {status}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedOrder && (
        <Dialog
          open={!!selectedOrder}
          onOpenChange={() => setSelectedOrder(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <h3 className="font-semibold">Customer: {selectedOrder.name}</h3>
              <p>
                Date: {new Date(selectedOrder.createdDate).toLocaleDateString()}
              </p>
              <p>Email: {selectedOrder.email}</p>
              <p>Phone: {selectedOrder.phone}</p>
              <p>Address: {selectedOrder.address}</p>
              <p>City: {selectedOrder.city}</p>
              <p>ZipCode: {selectedOrder.zipcode}</p>
              <p>Total: ${selectedOrder.total.toFixed(2)}</p>
              <h4 className="font-semibold mt-2">Items:</h4>
              <ul className="list-disc pl-5 space-y-4">
                {selectedOrder.product.map((item: any, index: any) => (
                  <li key={index} className="flex items-center space-x-4">
                    <Link
                      href={`/products/${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p>
                          Quantity: {item.quantity}, Price: $
                          {item.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <Label>Update Status</Label>
                <Select
                  defaultValue={selectedOrder.status}
                  onValueChange={(value) =>
                    handleStatusChange(selectedOrder.id, value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setSelectedOrder(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
