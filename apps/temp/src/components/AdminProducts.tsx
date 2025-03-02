"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Package, DollarSign, MoreVertical, Plus, Search } from "lucide-react";
import ProductForm from "./ProductForm";
import {
  DeleteProduct,
  GetAllProducts,
  ProductCreate,
  UpdateProduct,
} from "@/actions/product";
import { toast } from "react-toastify";

export default function AdminProducts() {
  const [products, setProducts] = useState<any>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await GetAllProducts();
      setProducts(product);
      console.log(product);
    };
    fetchProduct();
  }, [0]);

  // const handelEditing = async () => {
  //   setEditingProduct();
  // };

  const handleAddProduct = async (newProduct: any) => {
    // setProducts([...products, { ...newProduct);

    const added = await ProductCreate(newProduct);
    setProducts(added);

    setIsAddProductOpen(false);
    toast.success("Added");
  };

  const handleEditProduct = async (editedProduct: any) => {
    // setProducts(
    //   products.map((p: any) => (p.id === editedProduct.id ? editedProduct : p))
    // );
    const { id, ...editedProd } = editedProduct;

    const edited = await UpdateProduct(editedProd, id);
    console.log("edited");
    setProducts(edited);
    console.log(edited);
    setEditingProduct(null);

    toast.success("Edited");
  };

  const handleDeleteProduct = async (id: any) => {
    const deleted = await DeleteProduct(id);
    setProducts(deleted);
    toast.success("Deleted");
  };

  const filteredProducts = products.filter(
    (product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {products
                .reduce((sum: any, product: any) => sum + product.price, 0)
                .toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSubmit={handleAddProduct} product={undefined} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>stock</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock} ps</TableCell>
                <TableCell className="max-w-xs truncate">
                  {product.description}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => setEditingProduct(product)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingProduct && (
        <Dialog
          open={!!editingProduct}
          onOpenChange={() => setEditingProduct(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              onSubmit={handleEditProduct}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
