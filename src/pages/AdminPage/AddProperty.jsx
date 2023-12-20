import React from "react";
import { useAddPropertyMutation } from "../../features/Api";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading";

const AddProperty = () => {
  const [addProperty, { isLoading, error }] = useAddPropertyMutation();
  const { user } = useSelector((store) => store.user);
  const nav = useNavigate();

  const validationSchema = Yup.object().shape({
    property_name: Yup.string()
      .required("Property Name is required")
      .max(30, "Max 30 characters"),
    property_price: Yup.number()
      .required("Property Price is required")
      .min(100000, "Minimum 100000")
      .max(500000000, "Maximum 500000000"),
    property_floorArea: Yup.number()
      .required("Property FloorArea is required")
      .min(600, "Minimum 600")
      .max(10000, "Maximum 10000"),
    property_beds: Yup.number()
      .required("Property beds is required")
      .min(1, "Minimum 1")
      .max(20, "Maximum 20"),
    property_bathrooms: Yup.number()
      .required("Property bathrooms is required")
      .min(1, "Minimum 1")
      .max(20, "Maximum 20"),
    property_address: Yup.string().required("Address is required"),

    property_detail: Yup.string().required("Property detail is required"),

    property_image: Yup.mixed()
      .test("required", "You need to provide a file", (value) => {
        return value && value.length;
      })
      .test("fileSize", "The file is too large", (value, context) => {
        return value && value[0] && value[0].size <= 200000;
      })
      .test("type", "We only support jpeg", function (value) {
        return value && value[0] && value[0].type === "image/jpeg";
      }),
  });

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submitForm = async (val) => {
    console.log("Submitting form", val);
    let formData = new FormData();
    formData.append("property_name", val.property_name);
    formData.append("property_detail", val.property_detail);
    formData.append("property_price", Number(val.property_price));
    formData.append("property_image", val.property_image);
    formData.append("property_floorArea", Number(val.property_floorArea));
    formData.append("property_beds", Number(val.property_beds));
    formData.append("property_bathrooms", Number(val.property_bathrooms));
    formData.append("property_address", val.property_address);

    try {
      await addProperty({
        body: formData,
        token: user.token,
      }).unwrap();
      toast.success("property added successfully");
      nav(-1);
    } catch (err) {
      toast.error(err);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    setValue("property_image", file);

    const reader = new FileReader();
    reader.onload = () => {
      setValue("preview", reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl mt-8 p-8">Add Property</h1>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col justify-center items-center gap-4 mt-4 shadow-2xl bg-gray-100 p-6 md:w-[700px] mx-auto">
            <input
              {...register("property_name")}
              className="w-[300px] md:w-[600px] p-3 text-sm border border-black rounded"
              placeholder="Property Name"
            />
            {errors.property_name && (
              <span className="text-red-500">
                {errors.property_name.message}
              </span>
            )}
            <div className="grid grid-cols-2 gap-4 gap-x-24 overflow-hidden">
              <div>
                <input
                  {...register("property_price")}
                  className="w-[250px] p-3 text-sm border border-black rounded"
                  placeholder="Property Price"
                />
                {errors.property_price && (
                  <span className="text-red-500 text-[10px]">
                    {errors.property_price.message}
                  </span>
                )}
              </div>

              <div>
                <input
                  {...register("property_floorArea")}
                  className="w-[250px] p-3 text-sm border border-black rounded"
                  placeholder="Enter FloorArea"
                />
                {errors.property_floorArea && (
                  <span className="text-red-500 text-[10px]">
                    {errors.property_floorArea.message}
                  </span>
                )}
              </div>

              <div>
                <input
                  {...register("property_beds")}
                  className="w-[250px] p-3 text-sm border border-black rounded"
                  placeholder="Enter Beds"
                />
                {errors.property_beds && (
                  <span className="text-red-500 text-[10px]">
                    {errors.property_beds.message}
                  </span>
                )}
              </div>

              <div>
                <input
                  {...register("property_bathrooms")}
                  className="w-[250px] p-3 text-sm border border-black rounded"
                  placeholder="Enter bathrooms"
                />
                {errors.property_bathrooms && (
                  <span className="text-red-500 text-[10px]">
                    {errors.property_bathrooms.message}
                  </span>
                )}
              </div>
            </div>

            <div className="text-left">
              <div>
                <p>Select an Image</p>
                <input
                  {...register("property_image")}
                  onChange={handleImageChange}
                  type="file"
                />
                <div className="border border-gray-600 h-[150px] my-1 w-full">
                  {watch("preview") && (
                    <img
                      src={watch("preview")}
                      alt=""
                      className="object-cover h-full w-full"
                    />
                  )}
                </div>
              </div>
            </div>
            <input
              {...register("property_address")}
              className="w-[300px] md:w-[600px] p-3 text-sm border border-black rounded"
              placeholder="Enter address"
            />
            {errors.property_address && (
              <span className="text-red-500">
                {errors.property_address.message}
              </span>
            )}

            <textarea
              {...register("property_detail")}
              placeholder="Enter property detail"
              className="w-[300px] md:w-[600px] h-[200px] p-3 border border-black rounded"
            />
            {errors.property_detail && (
              <span className="text-red-500">
                {errors.property_detail.message}
              </span>
            )}

            <button
              className="bg-pink-400 text-white rounded p-4"
              type="submit"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProperty;
