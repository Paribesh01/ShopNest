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
  const [isLoading, setIsLoading] = React.useState(false)
  const [imagePreview, setImagePreview] = React.useState<string>(category?.image || "")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      id: category?.id,
      name: formData.get("name") as string,
      image:
        imagePreview ||
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-15%2009-13-05-Bc0ba743l2T6P8vLdzsBLnihgvCqzT.png", // In a real app, this would be the uploaded image URL
    }

    await onSubmit(data)
    setIsLoading(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, this would upload the file to your storage
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Category Name <span className="text-red-500">*</span>
        </Label>
        <Input id="name" name="name" required defaultValue={category?.name} placeholder="eg: Clothing" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">
          Category Image <span className="text-red-500">*</span>
        </Label>
        <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition-colors">
          <div className="flex flex-col items-center gap-2">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute -top-2 -right-2"
                  onClick={() => setImagePreview("")}
                >
                  <ImageIcon className="h-4 w-4" />
                  <span className="sr-only">Change image</span>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              </div>
            )}
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
  )
}

