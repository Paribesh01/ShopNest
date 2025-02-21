"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import type { Product } from "./types"
import { productApi } from "./APIFunctions"
import { Button } from "@repo/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/table"
import { Input } from "@repo/ui/input"
import { Label } from "@repo/ui/label"
import { Textarea } from "@repo/ui/textarea"
import { useToast } from "@repo/ui/use-toast"
import ProductForm from "./Product-form"

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const { toast } = useToast()

  // Replace with your actual store From recoil atom or some context
  const storeId = "1d3fe66f-50ac-4a02-a94c-20e7681d2f2e"  // Temporarily hardcoded

  const initialProductState: Product = useMemo<Product>(() => ({
    id: 0,
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: "",
    categoryId: "",
  }), []);

  const [formData, setFormData] = useState<Product>(initialProductState);

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const data = await productApi.getProductByStore(storeId);
      console.log(data.data);
      setProducts(data.data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch products",
      })
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await productApi.delete(id)
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
      fetchProducts()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product",
      })
    }

  }

  const handleEdit = (product: Product) => {
    setCurrentProduct(product)
    setFormData(product)
    setIsEditOpen(true)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            {/* <ProductForm /> */}
            <ProductForm
              currentProduct={currentProduct}
              setIsEditOpen={setIsEditOpen}
              storeId={storeId}
              setIsOpen={setIsOpen}
              fetchProducts={fetchProducts} />
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm />
        </DialogContent>
      </Dialog>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

