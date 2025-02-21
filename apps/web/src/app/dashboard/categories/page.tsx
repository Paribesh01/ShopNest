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

export default function categories() {
  const router = useRouter()
  const { toast } = useToast()
  const [categories, setCategories] = React.useState<Category[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null)

  // TODO: you should get this store information from recoil atom or some context
  const [storeId, setStoreId] = React.useState<string>("1d3fe66f-50ac-4a02-a94c-20e7681d2f2e");// It is hardcoded temporarily 

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

  React.useEffect(() => {
    fetchCategories();
  }, [])

  const handleAdd = async (data: { name: string }) => {
    try {
      const newCategory = await categoryApi.create(storeId, { name: data.name });
      setCategories([...categories, newCategory.data]);
      toast({ title: "Category added successfully!" });
    } catch (error) {
      toast({ title: "Failed to add category", description: error.message, variant: "destructive" });
    } finally {
      setIsAddOpen(false);
    }
  };

  const handleEdit = async (data: Category) => {
    try {
      const updatedCategory = await categoryApi.update(data.id.toString(), { name: data.name });

      setCategories(categories.map((c) => (c.id === data.id ? { ...c, name: updatedCategory.updatedCategory.name } : c)));
      setSelectedCategory(null);

      toast({ title: "Category updated successfully", variant: "success" });
    } catch (error) {
      toast({ title: "Error updating category", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await categoryApi.delete(id);
      setCategories(categories.filter((c) => c.id !== id));
      toast({ title: "Category Deleted successfully", variant: "success" });
    } catch (error) {
      console.log(error);
      toast({ title: "Error Deleting category", description: error.message, variant: "destructive" });
    }
  }

  return (
    <div className="container mx-auto py-12 px-6">
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-semibold text-gray-800">Store Categories</h1>
      <Button 
        onClick={() => setIsAddOpen(true)} 
        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md transition"
      >
        Add Category
      </Button>
    </div>
  
    <div className="overflow-hidden border rounded-lg shadow-sm">
      <Table className="w-full bg-white border-collapse">
        <TableHeader className="bg-gray-100 text-gray-700">
          <TableRow>
            <TableHead className="w-16 text-left px-4 py-3 font-medium">#</TableHead>
            <TableHead className="text-left px-4 py-3 font-medium">Name</TableHead>
            <TableHead className="w-24 text-left px-4 py-3 font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id} className="border-b hover:bg-gray-50 transition">
              <TableCell className="px-4 py-3">{category.id}</TableCell>
              <TableCell className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-800">{category.name}</span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:bg-gray-200 p-2 rounded-md transition"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <span className="sr-only">Edit</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-gray-600"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-100 hover:text-red-700 p-2 rounded-md transition"
                    onClick={() => handleDelete(category.id)}
                  >
                    <span className="sr-only">Delete</span>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  
    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Category</DialogTitle>
        </DialogHeader>
        <CategoryForm onSubmit={handleAdd} />
      </DialogContent>
    </Dialog>
  
    <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Category Details</DialogTitle>
        </DialogHeader>
        {selectedCategory && <CategoryForm category={selectedCategory} onSubmit={handleEdit} />}
      </DialogContent>
    </Dialog>
  </div>
  
  )
}

