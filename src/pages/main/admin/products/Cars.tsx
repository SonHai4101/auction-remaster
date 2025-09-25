import { DynamicForm } from "@/components/admin/DynamicForm";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Text } from "@/components/retroui/Text";
import { useUpload } from "@/hooks/useDefault";
import React, { useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { useParams } from "react-router";

export const Cars = () => {
  const { categoryId } = useParams();
  const categoryField = [
    {
      name: "categoryId",
      label: "Category Id",
      required: true,
      placeholder: "Type category name",
      readOnly: true,
    },
    {
      name: "title",
      label: "Title",
      required: true,
      placeholder: "Type product title",
    },
    {
      name: "description",
      label: "Description",
      required: true,
      placeholder: "Type product description",
    },
    {
      name: "images",
      label: "Images",
      type: "file",
      required: true,
      placeholder: "Type category description",
    },
  ];
  const [images, setImages] = useState<File[]>([]);
  const { mutate: uploadImg } = useUpload();
  const [open, setOpen] = useState(false);
  const onSubmit = () => {
    // createCategory(data, {
    //   onSuccess: () => {
    //     setOpen(false);
    //   },
    // });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (images.length === 0) return;
    uploadImg(
      { files: images },
      {
        onSuccess: (data) => {
          console.log("my images", data);
        },
      }
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <CustomBreadcrumb startFrom="categories" />
        <Dialog open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <Button>
              <TiPlus />
              &nbsp;Create
            </Button>
          </Dialog.Trigger>
          <Dialog.Content size={"md"}>
            <Dialog.Header position={"fixed"}>
              <Text as="h5">Create a new product</Text>
            </Dialog.Header>
            <DynamicForm
              fields={categoryField}
              onSubmit={onSubmit}
              submitLabel="Create"
              defaultValues={{ categoryId: categoryId }}
            />
          </Dialog.Content>
        </Dialog>
      </div>
      <div>
        <Label htmlFor="pokemon">Upload Images</Label>
        <Input
          multiple
          accept="image/*"
          type="file"
          id="images"
          placeholder="Upload here"
          onChange={handleFileChange}
        />
        <Button onClick={handleUpload}>Upload</Button>
      </div>
      <div>
        <Text as="h3">Your images here</Text>
        {images.length > 0 && (
          <div className="mt-3 flex gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Selected ${index + 1}`}
                  className="size-10 object-cover rounded-xl"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 items-center justify-center flex"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
