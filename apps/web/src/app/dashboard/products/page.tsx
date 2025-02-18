"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const { toast } = useToast()

  // Replace with your actual store From recoil atom or some context
  const storeId = "cf89e91e-96f6-48df-ab82-d02667c3fc35"  // Temporarily hardcoded

  const initialProductState: Product = {
    id: 0,
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: "",
    categoryId: "",
  }

  const [formData, setFormData] = useState<Product>(initialProductState)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const data = await productApi.getProductByStore(storeId)
      setProducts(data.data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch products",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const sanitizedData = {
      ...formData,
      price: Number(formData.price) || 0,
      stock: Number(formData.stock) || 0,
    }

    try {
      if (currentProduct) {
        console.log(formData);
        await productApi.update(currentProduct.id.toString(), sanitizedData)
        toast({
          title: "Success",
          description: "Product updated successfully",
        })
        setIsEditOpen(false)
      } else {
        await productApi.createProduct(storeId, sanitizedData)
        toast({
          title: "Success",
          description: "Product created successfully",
        })
        setIsOpen(false)
      }
      fetchProducts()
      setFormData(initialProductState)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Operation failed",
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

  const ProductForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) || 0 })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="stock">Stock</Label>
        <Input
          id="stock"
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: Number.parseInt(e.target.value) })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="categoryId">Category ID</Label>
        <Input
          id="categoryId"
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {currentProduct ? "Update Product" : "Add Product"}
      </Button>
    </form>
  )

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
            <ProductForm />
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

