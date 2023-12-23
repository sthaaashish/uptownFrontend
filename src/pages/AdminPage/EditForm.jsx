import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading";
import { useUpdatePropertyMutation } from "../../features/Api";
import { baseUrl } from "../../features/constant";

const EditForm = ({ data }) => {
  const [updateProperty, { isLoading, error }] = useUpdatePropertyMutation();
  const { user } = useSelector((store) => store.user);
  const nav = useNavigate();

  const propertyData = data[0];
  const [propertyPhoto, setPropertyPhoto] = useState([]);

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
  });

  const {
    handleSubmit,
    setValue,
    register,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //seting Default value
  useEffect(() => {
    setValue("property_name", propertyData.property_name || "");
    setValue("property_detail", propertyData.property_detail || "");
    setValue("property_price", propertyData.property_price || "");
    setValue("property_image", null); 
    setValue("property_beds", propertyData.property_beds || "");
    setValue("property_floorArea", propertyData.property_floorArea || "");
    setValue("property_bathrooms", propertyData.property_bathrooms || "");
    setValue("property_address", propertyData.property_address || "");
    setValue("preview", `${baseUrl}${propertyData.property_image}`);
  }, [propertyData, setValue]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile) {
      setPropertyPhoto(selectedFile);
      setValue("property_image", selectedFile);
      setValue("preview", URL.createObjectURL(selectedFile));
    }
  };


  const submitForm = async (val) => {

    let formData = new FormData();
    formData.append("property_name", val.property_name);
    formData.append("property_detail", val.property_detail);
    formData.append("property_price", Number(val.property_price));
    formData.append("property_floorArea", Number(val.property_floorArea));
    formData.append("property_beds", Number(val.property_beds));
    formData.append("property_bathrooms", Number(val.property_bathrooms));
    formData.append("property_address", val.property_address);
    formData.append("property_image", propertyPhoto || null);


    try {
      if (val.property_image === null) {
        await updateProperty({
          body: formData,
          token: user.token,
          id: propertyData._id,
        });
        toast.success("property updated successfully");
        nav(-1);
      } else {
        formData.append("property_image", val.property_image[0]);
        formData.append("imagePath", propertyData.property_image);

        await updateProperty({
          body: formData,
          token: user.token,
          id: propertyData._id,
        });
        toast.success("property updated successfully");
        nav(-1);
      }
    } catch (err) {

      toast.error(err.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="">
        <h1 className="text-2xl text-center mt-8 p-8">
          Update Property Details
        </h1>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col   gap-4 mt-4 shadow-2xl bg-gray-100 p-6 md:w-[650px] mx-auto">
            <Controller
              name="property_name"
              control={control}
              render={({ field, field: { onChange }, fieldState }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    className="w-full p-3 text-sm border border-black rounded"
                    onChange={onChange}
                  />
                  {fieldState.error && (
                    <h1 className="mt-2 text-red-600">
                      {fieldState.error.message}
                    </h1>
                  )}
                </>
              )}
            />
            <div className="grid grid-cols-2 gap-4  overflow-hidden">
              <div>
                <Controller
                  name="property_price"
                  control={control}
                  render={({ field, field: { onChange }, fieldState }) => (
                    <>
                      <input
                        {...field}
                        className="w-full p-3 text-sm border border-black rounded"
                        onChange={onChange}
                      />
                      {fieldState.error && (
                        <h1 className="mt-2 text-red-600">
                          {fieldState.error.message}
                        </h1>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <Controller
                  name="property_floorArea"
                  control={control}
                  render={({ field, field: { onChange }, fieldState }) => (
                    <>
                      <input
                        {...field}
                        className="w-full p-3 text-sm border border-black rounded"
                        onChange={onChange}
                      />
                      {fieldState.error && (
                        <h1 className="mt-2 text-red-600">
                          {fieldState.error.message}
                        </h1>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <Controller
                  name="property_beds"
                  control={control}
                  render={({ field, field: { onChange }, fieldState }) => (
                    <>
                      <input
                        {...field}
                        className="w-full p-3 text-sm border border-black rounded"
                        onChange={onChange}
                      />
                      {fieldState.error && (
                        <h1 className="mt-2 text-red-600">
                          {fieldState.error.message}
                        </h1>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <Controller
                  name="property_bathrooms"
                  control={control}
                  render={({ field, field: { onChange }, fieldState }) => (
                    <>
                      <input
                        {...field}
                        className="w-full p-3 text-sm border border-black rounded"
                        onChange={onChange}
                      />
                      {fieldState.error && (
                        <h1 className="mt-2 text-red-600">
                          {fieldState.error.message}
                        </h1>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            <div className="text-left ">
              <div className="text-left">
                <p className="text-left">Select an Image</p>
                
                <input
                  className=""
                  name="property_image"
                  type="file"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                />
              </div>
              <div className="border  border-gray-600 h-[150px] my-1 w-[400px]">
                {watch("preview") && (
                  <img
                    src={watch("preview")}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                )}
              </div>
            </div>
            <Controller
              name="property_address"
              control={control}
              render={({ field, field: { onChange }, fieldState }) => (
                <>
                  <input
                    {...field}
                    className="w-full p-3 text-sm border border-black rounded"
                    onChange={onChange}
                  />
                  {fieldState.error && (
                    <h1 className="mt-2 text-red-600">
                      {fieldState.error.message}
                    </h1>
                  )}
                </>
              )}
            />
            <Controller
              name="property_detail"
              control={control}
              render={({ field, field: { onChange }, fieldState }) => (
                <>
                  <input
                    {...field}
                    className="w-full h-[200px] p-3 border border-black rounded"
                    onChange={onChange}
                  />
                  {fieldState.error && (
                    <h1 className="mt-2 text-red-600">
                      {fieldState.error.message}
                    </h1>
                  )}
                </>
              )}
            />
            <button
              className="bg-pink-400 text-white rounded p-4"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditForm;
