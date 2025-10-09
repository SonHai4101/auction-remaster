import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Loader } from "@/components/retroui/Loader";
import type { Product } from "@/constants/types";
import { useDeleteProduct } from "@/hooks/useProduct";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { PiTrashSimpleFill } from "react-icons/pi";
import {
  TbArrowBadgeLeftFilled,
  TbArrowBadgeRightFilled,
} from "react-icons/tb";
import { VscEdit } from "react-icons/vsc";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { mutate: deleteProduct, isPending: deletePending } =
    useDeleteProduct();

  const images = product?.images || [];

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);
  
  return (
    <Card key={product.id}>
      <div className="flex gap-4 items-center">
        <Card.Content className="relative flex-none">
          {product.images.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={product.images?.[currentImageIndex]?.id}
                src={
                  product.images?.[currentImageIndex]?.url ||
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

          {product.images.length > 1 && (
            <>
              <Button
                size="icon"
                className="absolute top-1/2 left-1.5 -translate-y-1/2 hover:-translate-y-2"
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? product.images.length - 1 : prev - 1
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
                    prev === product.images.length - 1 ? 0 : prev + 1
                  )
                }
              >
                <TbArrowBadgeRightFilled className="w-4 h-4" />
              </Button>
            </>
          )}
        </Card.Content>
        <Card.Header className="grow">
          <Card.Title>{product.title}</Card.Title>
          <Card.Description>{product.description}</Card.Description>
        </Card.Header>
        <Card.Content className="flex gap-2 flex-none mt-auto">
          <Button
            className="bg-destructive text-white hover:bg-destructive/90"
            onClick={() => deleteProduct(product.id)}
          >
            {deletePending ? (
              <div className="h-[150px] grid place-content-center">
                <Loader />
              </div>
            ) : (
              <>
                <PiTrashSimpleFill className="h-4 w-4 mr-2" /> Delete
              </>
            )}
          </Button>
          <Button
            className="bg-amber-600 text-white hover:bg-amber-500"
            onClick={() => onEdit(product)}
          >
            <VscEdit className="h-4 w-4 mr-2" /> Edit
          </Button>
        </Card.Content>
      </div>
    </Card>
  );
};
