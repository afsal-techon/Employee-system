import Input from "./UI/Input";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormButtons from "./UI/FormButtons";
import { FaUpload, FaTimes } from "react-icons/fa";

const branchSchema = yup.object({
  name: yup.string().required("Branch name is required"),
  phone: yup.string().required("Phone number required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  address: yup.string().required("Address is required"),
});

const BranchForm = ({ onSubmit, onCancel, initialData = {}, isSubmitting = false }) => {
   

    const [ logo , setLogo ] = useState(initialData.log || null);
    const [logoPreview , setLogoPreview] = useState(initialData.logoPreview  || null)


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
      logo: initialData.logo || "",
    },
    mode: "onChange", // Validate on change to enable/disable submit
  });

  const formValues = watch();

    // Handle logo file selection
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, WebP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
        setLogo(file);
        setValue('logo', file); // Set the file in react-hook-form
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const handleRemoveLogo = () => {
    setLogo(null);
    setLogoPreview(null);
    setValue('logo', null);
    // Reset file input
    const fileInput = document.getElementById('logo-upload');
    if (fileInput) fileInput.value = '';
  };

  // Handle form submission
  const handleFormSubmit = (data) => {
    // Create FormData to handle file upload
    const formData = new FormData();
    
    // Append all form fields
    Object.keys(data).forEach(key => {
      if (key === 'logo' && logo) {
        formData.append('logo', logo);
      } else if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    // If no logo was selected but there's a preview (editing mode), keep the existing logo
    if (!logo && logoPreview && initialData.logo) {
      formData.append('logo', initialData.logo);
    }

    onSubmit(formData);
  };

  // Trigger file input click
  const triggerFileInput = () => {
    document.getElementById('logo-upload').click();
  };





  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className=" space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Branch Information */}

        <Input
          label="Branch Name"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Enter branch name"
        />

     {/* Logo Upload Section */}
      <div className="flex flex-col items-center space-y-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Branch Logo
        </label>
        
        <div className="relative">
          {/* Logo Preview */}
          <div 
            onClick={triggerFileInput}
            className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50"
          >
            {logoPreview ? (
              <div className="relative w-full h-full">
                <img 
                  src={logoPreview} 
                  alt="Branch logo preview" 
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveLogo();
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <FaUpload size={24} className="mx-auto mb-2" />
                <span className="text-xs">Click to upload logo</span>
              </div>
            )}
          </div>

          {/* Hidden file input */}
          <input
            id="logo-upload"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleLogoChange}
            className="hidden"
          />
        </div>
      </div>

           <Input
          label="City"
          {...register("city")}
          error={errors.city?.message}
          placeholder="Enter the city"
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
      </div>

      <FormButtons
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        submitText="Save"
      />
    </form>
  );
};

export default BranchForm;
