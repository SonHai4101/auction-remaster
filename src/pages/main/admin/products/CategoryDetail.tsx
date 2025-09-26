import { DynamicForm } from "@/components/admin/DynamicForm";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Dialog } from "@/components/retroui/Dialog";
import { Loader } from "@/components/retroui/Loader";
import { Text } from "@/components/retroui/Text";
import { useGetProductsByCategoryId } from "@/hooks/admin/useAdmin";
import { useUpload } from "@/hooks/useDefault";
import { useCreateProduct } from "@/hooks/useProduct";
import React, { useState } from "react";
import {
  TbArrowBadgeLeftFilled,
  TbArrowBadgeRightFilled,
} from "react-icons/tb";
import { TiPlus } from "react-icons/ti";
import { useParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { PiTrashSimpleFill } from "react-icons/pi";
import { VscEdit } from "react-icons/vsc";

type ProductForm = {
  categoryId: string;
  title: string;
  description: string;
  images?: string[];
};

export const CategoryDetail = () => {
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
      multiple: true,
      placeholder: "Add product images",
    },
  ];
  const [images, setImages] = useState<File[]>([]);
  const { mutateAsync: uploadImg } = useUpload();
  const { mutate: createProduct } = useCreateProduct();
  const { data: products, isLoading: productsLoading } =
    useGetProductsByCategoryId(categoryId || "undefined");
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const onSubmit = async (data: ProductForm) => {
    let uploadedImages: string[] = [];
    if (images.length > 0) {
      const res = await uploadImg({ files: images });
      uploadedImages = res.data;
    }
    createProduct(
      {
        ...data,
        images: uploadedImages,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <div className="">
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
              onFileChange={(file) => setImages(file)}
              defaultValues={{ categoryId: categoryId }}
            />
          </Dialog.Content>
        </Dialog>
      </div>
      <div className="">
        <Text as="h3">List of Items</Text>
        <div className="mt-5 p-2 flex flex-col gap-3 overflow-auto max-h-[610px] border-4 border-double">
          {productsLoading ? (
            <div className="h-[150px] grid place-content-center">
              <Loader />
            </div>
          ) : products && products.length > 0 ? (
            products.map((p) => (
              <Card key={p.id}>
                <div className="flex gap-4 items-center">
                  <Card.Content className="relative flex-none">
                    {p.images.length > 0 ? (
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={p.images[currentImageIndex].id}
                          src={
                            p.images[currentImageIndex].url ||
                            "/icon/item-icon.png"
                          }
                          alt={`Post image ${currentImageIndex + 1}`}
                          className="size-48 object-cover border-2"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.2 }}
                        />
                      </AnimatePresence>
                    ) : (
                      <img
                        src="/icon/item-icon.png"
                        className="size-48 object-cover border-2"
                        alt="Gameboy"
                      />
                    )}

                    {p.images.length > 1 && (
                      <>
                        <Button
                          size="icon"
                          className="absolute top-1/2 left-1.5 -translate-y-1/2 hover:-translate-y-2"
                          onClick={() =>
                            setCurrentImageIndex((prev) =>
                              prev === 0 ? p.images.length - 1 : prev - 1
                            )
                          }
                        >
                          <TbArrowBadgeLeftFilled className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          className="absolute top-1/2 right-1.5 -translate-y-1/2 hover:-translate-y-2"
                          onClick={() =>
                            setCurrentImageIndex((prev) =>
                              prev === p.images.length - 1 ? 0 : prev + 1
                            )
                          }
                        >
                          <TbArrowBadgeRightFilled className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </Card.Content>
                  <Card.Header className="grow">
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Description>{p.description}</Card.Description>
                  </Card.Header>
                  <Card.Content className="flex gap-2 flex-none mt-auto">
                    <Button className="bg-destructive text-white hover:bg-destructive/90">
                      <PiTrashSimpleFill className="h-4 w-4 mr-2" /> Delete
                    </Button>
                    <Button className="bg-amber-600 text-white hover:bg-amber-500">
                      <VscEdit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                  </Card.Content>
                </div>
              </Card>
            ))
          ) : (
            <div className="h-[150px] grid place-content-center">
              <Text as="h4">No product found :'(</Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
