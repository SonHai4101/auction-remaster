import { Button } from "../retroui/Button";
import { Input } from "../retroui/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import type React from "react";
import { useEffect, useState } from "react";
import { Label } from "../retroui/Label";
import { Text } from "../retroui/Text";
import { Switch } from "../retroui/Switch";

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  multiple?: boolean;
  readOnly?: boolean;
};

interface DynamicFormProps {
  fields: Field[];
  onSubmit: (value: any) => void;
  onFileChange?: (file: File[]) => void;
  submitLabel?: string;
  defaultValues?: Record<string, any>;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  onFileChange,
  submitLabel = "Submit",
  defaultValues = {},
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  console.log("exitingImage", existingImages);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    if (onFileChange) {
      onFileChange(files);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit: SubmitHandler<any> = (data) => {
    onSubmit({
      ...data,
      existingImages,
      newImages: images,
    });
  };

  // useEffect(() => {
  //   reset(defaultValues);
  // }, [defaultValues, reset]);

  useEffect(() => {
    if (defaultValues.images && Array.isArray(defaultValues.images)) {
      setExistingImages(defaultValues.images);
    } else {
      setExistingImages([]);
    }
  }, [defaultValues.images]);

  return (
    <form
      className="flex flex-col gap-4 pb-5"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col p-4 gap-4">
        {fields.map((field, index) => {
          if (field.type === "file") {
            return (
              <>
                <div key={field.name}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    type="file"
                    multiple={field.multiple}
                    placeholder={field.placeholder}
                    {...register(field.name, { required: field.required })}
                    onChange={handleFileChange}
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm">
                      {field.label} is required
                    </p>
                  )}
                </div>
                {existingImages.length > 0 && (
                  <div className="mt-3 flex gap-2">
                    {existingImages.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Existing ${index + 1}`}
                          className="size-20 object-cover border-2 rounded-xl"
                        />
                        <button
                          onClick={() => removeExistingImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 items-center justify-center flex"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {images.length > 0 && (
                  <>
                    <Text>Upload Images</Text>
                    <div className="flex gap-2">
                      {images.map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(img)}
                            alt={`Selected ${index + 1}`}
                            className="size-20 object-cover border-2 rounded-xl"
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
                  </>
                )}
              </>
            );
          }
          // if current and next field are datetime-local -> render them in one row
          if (
            field.type === "datetime-local" &&
            fields[index + 1]?.type === "datetime-local"
          ) {
            return (
              <div key={field.name} className="flex gap-2 w-full">
                {[field, fields[index + 1]].map((f) => (
                  <div className="flex flex-col gap-2 w-full" key={f.name}>
                    <Label htmlFor={f.name}>
                      {f.label}{" "}
                      {f.required && <span className="text-red-500">*</span>}
                    </Label>
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

          if (field.type === "switch") {
            return (
              <div className="flex items-center space-x-2">
                <Label htmlFor="isAutoBid">Auto Bid</Label>
                <Switch id="isAutoBid" />
              </div>
            );
          }

          return (
            <>
              <div className="flex flex-col gap-2" key={field.name}>
                <Label htmlFor={field.name}>
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  readOnly={field.readOnly}
                  {...register(field.name, { required: field.required })}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">
                    {field.label} is required
                  </p>
                )}
              </div>
            </>
          );
        })}
      </div>
      <div className="flex justify-end px-4">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
};
