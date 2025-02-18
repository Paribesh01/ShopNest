"use client"

import * as React from "react"
import { ImageIcon } from "lucide-react"
import { Category } from "./types"

import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { Label } from "@repo/ui/label"

interface CategoryFormProps {
  category?: Category
  onSubmit: (data: any) => Promise<void>
}

export function CategoryForm({ category, onSubmit }: CategoryFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [categoryName,setCategoryName] = React.useState<string>(category?.name || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const data = {
      id: category?.id,
      name: categoryName,
    }
    await onSubmit(data)
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Category Name <span className="text-red-500">*</span>
        </Label>
        <Input id="name" name="name" required value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} placeholder="eg: Clothing" />
      </div>

      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
  )
}

