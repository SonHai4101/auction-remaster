import { DynamicForm } from "@/components/admin/DynamicForm";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Dialog } from "@/components/retroui/Dialog";
import { Loader } from "@/components/retroui/Loader";
import { Text } from "@/components/retroui/Text";
import { useCreateCategory, useGetAllCategories } from "@/hooks/admin/useAdmin";
import { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { useNavigate, Outlet, useLocation, useMatch, Link } from "react-router";

type CategoryForm = {
  name: string;
  description: string;
};

const categoryField = [
  {
    name: "name",
    label: "Category Name",
    required: true,
    placeholder: "Type category name",
  },
  {
    name: "description",
    label: "Description",
    required: true,
    placeholder: "Type category description",
  },
];

const categoryImage = [
  { key: "car", src: "/icon/car.png" },
  { key: "furniture", src: "/icon/furniture.png" },
  { key: "electronic", src: "/icon/electronic.png" },
];

export const Categories = () => {
  const isAdmin = !!useMatch("/admin-page/*");

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data: allCategories, isLoading } = useGetAllCategories();
  const { mutate: createCategory } = useCreateCategory();

  const onSubmit = (data: CategoryForm) => {
    createCategory(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };
  // Show Outlet for any child route under /admin-page/categories (not the base path itself)
  const isChildRouteAdmin =
    location.pathname.startsWith("/admin-page/categories/") &&
    location.pathname !== "/admin-page/categories";

  const isChildRouteUser =
    location.pathname.startsWith("/categories/") &&
    location.pathname !== "/categories/";
  return (
    <>
      {isAdmin ? (
        <div>
          {isChildRouteAdmin ? (
            <Outlet />
          ) : (
            <div>
              <div className="flex justify-between">
                <Text as="h2">Categories</Text>
                <Dialog open={open} onOpenChange={setOpen}>
                  <Dialog.Trigger asChild>
                    <Button>
                      <TiPlus />
                      &nbsp;Create
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content size={"md"}>
                    <Dialog.Header position={"fixed"}>
                      <Text as="h5">Create a new category</Text>
                    </Dialog.Header>
                    <DynamicForm
                      fields={categoryField}
                      onSubmit={onSubmit}
                      submitLabel="Create"
                    />
                  </Dialog.Content>
                </Dialog>
              </div>
              <section className="w-full mt-5 grid grid-rows-[repeat(auto-fit, 1fr)] grid-cols-[repeat(3,1fr)] gap-2">
                {isLoading && <Loader />}
                {allCategories &&
                  allCategories?.map((category) => (
                    <div
                      key={category.id}
                      className="border-2 border-dashed h-[100px] grid place-content-center hover:cursor-pointer hover:underline"
                      onClick={() =>
                        navigate(`/admin-page/categories/${category.id}`)
                      }
                    >
                      <Text as="h3">{category.name}</Text>
                    </div>
                  ))}
              </section>
            </div>
          )}
        </div>
      ) : (
        <div>
          {isChildRouteUser ? (
            <Outlet />
          ) : (
            <section className="bg-background py-16 border-b-4 border-black">
              <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="mb-12">
                  <h1 className="text-5xl md:text-6xl font-black text-black mb-2">
                    All Categories
                  </h1>
                  <p className="text-lg font-bold text-black">
                    Browse our extensive collection of auction categories
                  </p>
                  <div className="w-24 h-1 bg-accent mt-4"></div>
                </div>

                {/* Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allCategories &&
                    allCategories.map((category) => {
                      const image = categoryImage.find((img) =>
                        category.name.toLowerCase().includes(img.key)
                      ) || { src: "/icon/item-icon.png" };
                      return (
                        <Link
                          key={category.id}
                          to={`/categories/${category.id}`}
                        >
                          <Card className="w-full">
                            <Card.Header className="bg-amber-300">
                              <Card.Title className="flex justify-between items-center mb-0">
                                {category.name}
                                <img
                                  className="w-[40px] h-[40px]"
                                  src={image.src}
                                  alt={category.name}
                                />
                              </Card.Title>
                            </Card.Header>
                            <Card.Header>
                              <Card.Description>
                                {category.description}
                              </Card.Description>
                            </Card.Header>
                            <Card.Content>
                              <Button>VIEW AUCTIONS</Button>
                            </Card.Content>
                          </Card>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
};
