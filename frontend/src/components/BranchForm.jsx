import Input from "./UI/Input";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormButtons from "./UI/FormButtons";

const branchSchema = yup.object({
  name: yup.string().required("Branch name is required"),
  phone: yup.string().required("Phone number required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  zipCode: yup
    .string()
    .matches(/^[0-9\-]*$/, "Zip code can only contain numbers and hyphens"),
});

const BranchForm = ({ onSubmit, onCancel, initialData = {}, isSubmitting = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(branchSchema),
    defaultValues: {
      name: initialData.name || "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      address: initialData.address || "",
      city: initialData.city || "",
      zipCode: initialData.zipCode || "",
    },
    mode: "onChange", // Validate on change to enable/disable submit
  });

  const formValues = watch();
  console.log(formValues, "data");

  const formSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onsubmit={handleSubmit(formSubmit)} className=" space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Branch Information */}

        <Input
          label="Branch Name"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Enter branch name"
          required
        />

        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="Enter email address"
          required
        />

        <Input
          label="Phone Number"
          {...register("phone")}
          error={errors.phone?.message}
          placeholder="Enter phone number"
          required
        />

        <Input
          label="City"
          {...register("city")}
          error={errors.city?.message}
          placeholder="Enter the city"
          required
        />
      </div>

      {/* Address Information */}

      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Address"
          {...register("address")}
          error={errors.address?.message}
          placeholder="Enter full address"
          required
        />

        <Input
          label="Zip Code"
          {...register("zipCode")}
          error={errors.zipCode?.message}
          placeholder="Enter zip code"
        />
      </div>

      <FormButtons
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        submitText="Save"
        submitDisabled={!isValid}
      />
    </form>
  );
};

export default BranchForm;
