import React, { useEffect, useMemo, useState } from 'react'
import { Product } from './types';
import { productApi } from './APIFunctions';
import { toast } from '@repo/ui/use-toast';
import { Label } from '@repo/ui/label';
import { Input } from '@repo/ui/input';
import { Textarea } from '@repo/ui/textarea';
import { Button } from '@repo/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Category } from '../categories/types';

type Checked = DropdownMenuCheckboxItemProps["checked"]

const ProductForm = ({ currentProduct, setIsEditOpen, storeId, setIsOpen, fetchProducts }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [currentCategory,setCurrentCategory] = useState<string>("");

  const fetchCategories = async () => {
    try {
      const res = await productApi.getCategoriesByStoreName();
      console.log(res.data);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
      toast({ title: "Error fetching categories", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

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


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData((prev) => ({ ...prev, price: Number.parseInt(e.target.value) || 0 }))}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="stock">Stock</Label>
        <Input
          id="stock"
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData((prev) => ({ ...prev, stock: Number.parseInt(e.target.value) }))}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
          required
        />
      </div>
      <div className="grid gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{currentCategory==="" ?"Select Category" : currentCategory}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {
              categories.map(category => (
                <DropdownMenuCheckboxItem
                key={category.id}
                onClick={(e)=>{
                  setCurrentCategory(category.name)
                  setFormData((prev) =>({...prev,categoryId : category.id as string}))}}
                >
                  {category.name}
                </DropdownMenuCheckboxItem>
              ))
            }

          </DropdownMenuContent>
        </DropdownMenu>

      </div>
      <Button type="submit" className="w-full">
        {currentProduct ? "Update Product" : "Add Product"}
      </Button>
    </form>
  )
}

export default ProductForm