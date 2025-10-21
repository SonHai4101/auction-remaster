import { DynamicForm } from "@/components/admin/DynamicForm";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Loader } from "@/components/retroui/Loader";
import { Text } from "@/components/retroui/Text";
import {
  useGetAuctionsByCategoryId,
  useGetCategoryById,
  useGetProductsByCategoryId,
} from "@/hooks/admin/useAdmin";
import { useUpload } from "@/hooks/useDefault";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProduct";
import { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { useMatch, useParams } from "react-router";
import type { Product } from "@/constants/types";
import { ProductCard } from "./ProductCard";
import { AuctionCard } from "@/components/AuctionCard";
import { notifyError, notifySuccess } from "@/components/CustomToast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useCreateBid } from "@/hooks/useBid";

type ProductForm = {
  categoryId: string;
  title: string;
  description: string;
  images?: string[];
};

type BiddingForm = {
  auctionId: string;
  amount: number;
  isAutoBid: boolean;
  maxAmount: number;
};

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

const bidField = [
  {
    name: "auctionId",
    label: "Auction ID",
    required: true,
    placeholder: "",
    readOnly: true,
  },
  {
    name: "amount",
    label: "Amount",
    required: true,
    placeholder: "Enter your amount",
  },
  {
    name: "isAutoBid",
    label: "Auto Bit",
    required: false,
    type: "switch",
  },
  {
    name: "maxAmount",
    label: "Your maximum payment amount",
    required: false,
    placeholder: "Enter the maximum you can pay",
  },
];

export const CategoryDetail = () => {
  const { categoryId } = useParams();
  const [images, setImages] = useState<File[]>([]);
  const { mutateAsync: uploadImg } = useUpload();
  const { mutate: createProduct } = useCreateProduct();
  const { data: products, isLoading: productsLoading } =
    useGetProductsByCategoryId(categoryId || "undefined");
  const [open, setOpen] = useState(false);
  const { mutate: updateProduct, isPending: updatePending } =
    useUpdateProduct();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [selectAuction, setSelectAuction] = useState<string | null>(null);
  const { data: categoryDetail } = useGetCategoryById(
    categoryId || "undefined"
  );

  
  const { data: auctionById, isLoading: loadingAuctionById } =
    useGetAuctionsByCategoryId(categoryId || "undefined");

      console.log("data", auctionById);
  const isAdmin = !!useMatch("/admin-page/*");
  const { mutate: createBid, isPending: pendingBid } = useCreateBid();
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

  const handleBid = (data: BiddingForm) => {
    createBid(
      {
        auctionId: data.auctionId,
        body: {
          amount: Number(data.amount),
          isAutoBid: data.isAutoBid,
          maxAmount: Number(data.maxAmount),
        },
      },
      {
        onSuccess: () => {
          setSelectAuction(null);
          notifySuccess("Bid placed successfully");
        },
        onError(error) {
          notifyError(getErrorMessage(error));
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
    <>
      {isAdmin ? (
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
                <Dialog.Content size="auto">
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
            <div className="mt-5 p-2 flex flex-col gap-3 overflow-auto max-h-screen border-4 border-double">
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
                <Dialog.Content size={"auto"}>
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
      ) : (
        <section className="bg-background py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-black text-black mb-2">
                {categoryDetail?.name}
              </h1>
              <p className="text-lg font-bold text-black">
                Browse our extensive collection of auction categories
              </p>
              <div className="w-24 h-1 bg-accent mt-4"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loadingAuctionById ? (
                <div className="h-[150px] grid place-content-center col-span-full">
                  <Loader />
                </div>
              ) : auctionById ? (
                auctionById.map((auction) => (
                  <AuctionCard
                    key={auction.id}
                    auction={auction}
                    onBid={setSelectAuction}
                    type="user"
                  />
                ))
              ) : (
                <div className="h-[150px] col-span-full grid place-content-center">
                  <Text as="h4">No auctions at the moment :'(</Text>
                </div>
              )}
              <Dialog
                open={!!selectAuction}
                onOpenChange={(i) => !i && setSelectAuction(null)}
              >
                <Dialog.Content size={"md"}>
                  <Dialog.Header>
                    <Text as="h5">Create Bid</Text>
                  </Dialog.Header>
                  {selectAuction && (
                    <DynamicForm
                      key={selectAuction}
                      fields={bidField}
                      onSubmit={handleBid}
                      submitLabel={pendingBid ? "Bidding..." : "Bid"}
                      defaultValues={{ auctionId: selectAuction }}
                    />
                  )}
                </Dialog.Content>
              </Dialog>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
