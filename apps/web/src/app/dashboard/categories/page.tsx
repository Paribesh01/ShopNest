"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Category } from "./types"
import { categoryApi } from "./APIFunctions"

import { Button } from "@repo/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/table"
import { useToast } from "@repo/ui/use-toast"
import { CategoryForm } from "./category-form"

// This would come from your database
const initialCategories: Category[] = [
  {
    id: 1,
    name: "Cold Drinks",
    storeId:
      "store-id-something",
  },
  {
    id: 2,
    name: "Fruit",
    storeId:
      "store-id-something",
  },
]

export default function categories() {
  const router = useRouter()
  const { toast } = useToast()
  const [categories, setCategories] = React.useState<Category[]>(initialCategories)
   const [isLoading, setIsLoading] = React.useState(true)
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null)

  const fetchCategories = async () => {
    try {
      const res = await categoryApi.getAll();
      setCategories(res.data);
    } catch (error) {
      toast({ title: "Error fetching categories", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(()=>{
    fetchCategories();
  },[])

  const handleAdd = async (data: Omit<Category, "id">) => {
    // In a real app, this would be an API call
    const newCategory = {
      id: categories.length + 1,
      ...data,
    }
    setCategories([...categories, newCategory])
    setIsAddOpen(false)
  }

  const handleEdit = async (data: Category) => {
    // In a real app, this would be an API call
    setCategories(categories.map((c) => (c.id === data.id ? data : c)))
    setSelectedCategory(null)
  }

  const handleDelete = async (id: number) => {
    // In a real app, this would be an API call
    setCategories(categories.filter((c) => c.id !== id))
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Store Categories</h1>
        <Button onClick={() => setIsAddOpen(true)} className="bg-purple-600 hover:bg-purple-700">
          Add Category
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-16">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <span>{category.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedCategory(category)}>
                    <span className="sr-only">Edit</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(category.id)}
                  >
                    <span className="sr-only">Delete</span>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <CategoryForm onSubmit={handleAdd} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Category Details</DialogTitle>
          </DialogHeader>
          {selectedCategory && <CategoryForm category={selectedCategory} onSubmit={handleEdit} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

