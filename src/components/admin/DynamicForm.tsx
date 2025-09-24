import { Text } from "../retroui/Text";
import { Dialog } from "../retroui/Dialog";
import { Button } from "../retroui/Button";
import { TiPlus } from "react-icons/ti";
import { Input } from "../retroui/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toIOSTime } from "@/utils/ConvertUnit";
import { useCreateAuction } from "@/hooks/admin/useAdmin";
import type React from "react";

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

interface DynamicFormProps {
  fields: Field[];
  onSubmit: (value: any) => void;
  submitLabel?: string;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  submitLabel = "Submit",
}) => {
  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm();

  const handleFormSubmit: SubmitHandler<any> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      className="flex flex-col gap-4 pb-5"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col p-4 gap-4">
        {/* {fields.map((field) => (
          <div className="flex flex-col gap-2" key={field.name}>
            <label htmlFor={field.name}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <Input
              id={field.name}
              type={field.type || "text"}
              placeholder={field.placeholder}
              {...register(field.name, { required: field.required })}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm">{field.label} is required</p>
            )}
          </div>
        ))} */}
        {fields.map((field, index) => {
          // if current and next field are datetime-local -> render them in one row
          if (
            field.type === "datetime-local" &&
            fields[index + 1]?.type === "datetime-local"
          ) {
            return (
              <div key={field.name} className="flex gap-2 w-full">
                {[field, fields[index + 1]].map((f) => (
                  <div className="flex flex-col gap-2 w-full" key={f.name}>
                    <label htmlFor={f.name}>
                      {f.label}{" "}
                      {f.required && <span className="text-red-500">*</span>}
                    </label>
                    <Input
                      id={f.name}
                      type="datetime-local"
                      placeholder={f.placeholder}
                      {...register(f.name, { required: f.required })}
                    />
                    {errors[f.name] && (
                      <p className="text-red-500 text-sm">
                        {field.label} is required
                      </p>
                    )}
                  </div>
                ))}
              </div>
            );
          }

          // skip the "second" datetime-local because we already rendered it above
          if (
            field.type === "datetime-local" &&
            fields[index - 1]?.type === "datetime-local"
          ) {
            return null;
          }

          return (
            <div className="flex flex-col gap-2" key={field.name}>
              <label htmlFor={field.name}>
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <Input
                id={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                {...register(field.name, { required: field.required })}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm">
                  {field.label} is required
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-end px-4">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
};
