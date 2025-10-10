import { DynamicForm } from "@/components/admin/DynamicForm";
import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Loader } from "@/components/retroui/Loader";
import { Text } from "@/components/retroui/Text";
import { useCreateCategory, useGetAllCategories } from "@/hooks/admin/useAdmin";
import { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { useNavigate, Outlet, useLocation } from "react-router";

type CategoryForm = {
  name: string;
  description: string;
};

export const Categories = () => {
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
  const isChildRoute =
    location.pathname.startsWith("/admin-page/categories/") &&
    location.pathname !== "/admin-page/categories";
  return (
    <>
      {isChildRoute ? (
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
    </>
  );
};
