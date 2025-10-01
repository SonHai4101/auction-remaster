import { DynamicForm } from "@/components/admin/DynamicForm";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Loader } from "@/components/retroui/Loader";
import { Text } from "@/components/retroui/Text";
import { useGetProductsByCategoryId } from "@/hooks/admin/useAdmin";
import { useUpload } from "@/hooks/useDefault";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/hooks/useProduct";
import { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { useParams } from "react-router";
import type { Product } from "@/constants/types";
import { ProductCard } from "./ProductCard";

type ProductForm = {
  categoryId: string;
  title: string;
  description: string;
  images?: string[];
};

export const CategoryDetail = () => {
  const { categoryId } = useParams();
  const productField = [
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
      required: false,
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
  const { mutate: updateProduct, isPending: updatePending } =
    useUpdateProduct();
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const onSubmit = async (data: ProductForm) => {
    // upload img
    let uploadedImages: string[] = [];
    if (images.length > 0) {
      const res = await uploadImg({ files: images });
      uploadedImages = res.data;
    }

    // creatProduct
    createProduct(
      {
        ...data,
        images: uploadedImages,
      },
      {
        onSuccess: () => {
          setImages([]);
          setOpen(false);
        },
      }
    );
  };

  const handleUpdateProduct = async (data: ProductForm) => {
    if (!editProduct) return;
    let uploadedNewImages: string[] = [];
    if (images.length > 0) {
      console.log("images 123", images);
      
      const res = await uploadImg({ files: images });
      uploadedNewImages = res.data;
    }

    updateProduct(
      {
        productId: editProduct.id,
        body: {
          categoryId: data.categoryId,
          title: data.title,
          description: data.description,
          images:
            uploadedNewImages.length > 0
              ? uploadedNewImages
              : editProduct.images.map((i) => i.url),
        },
      },
      {
        onSuccess: () => {
          setEditProduct(null);
          setImages([]);
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
          {open && (
            <Dialog.Content size={"md"}>
              <Dialog.Header position={"fixed"}>
                <Text as="h5">Create a new product</Text>
              </Dialog.Header>
              <DynamicForm
                fields={productField}
                onSubmit={onSubmit}
                submitLabel="Create"
                onFileChange={(file) => setImages(file)}
                defaultValues={{ categoryId: categoryId }}
              />
            </Dialog.Content>
          )}
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
              <ProductCard key={p.id} product={p} onEdit={setEditProduct} />
            ))
          ) : (
            <div className="h-[150px] grid place-content-center">
              <Text as="h4">No product found :'(</Text>
            </div>
          )}
          <Dialog
            open={!!editProduct}
            onOpenChange={(i) => !i && setEditProduct(null)}
          >
            <Dialog.Content size={"md"}>
              <Dialog.Header>
                <Text as="h5">Edit product</Text>
              </Dialog.Header>
              {editProduct && (
                <DynamicForm
                  key={editProduct.id}
                  fields={productField}
                  onSubmit={handleUpdateProduct}
                  submitLabel={updatePending ? "Saving..." : "Save"}
                  onFileChange={(file) => setImages(file)}
                  defaultValues={{
                    categoryId: categoryId,
                    title: editProduct.title,
                    description: editProduct.description,
                    images: editProduct.images?.map((i) => i.url) ?? [],
                  }}
                />
              )}
            </Dialog.Content>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
