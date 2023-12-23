import React from "react";
import { useForm } from "react-hook-form";

const CommentForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div>
      <div>
        <h1 className="mt-6 text-xl">Leave a Comment</h1>
        <div className="flex flex-col justify-center items-center gap-4 mt-4 shadow-2xl bg-gray-100 p-6 md:w-[700px] mx-auto">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 text-sm border border-black rounded"
              placeholder="Name"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}

            <input
              {...register("email", {
                required: "Email is required",
                pattern: /^\S+@\S+$/i,
              })}
              className="w-full p-3 text-sm border border-black rounded"
              placeholder="Your Email"
              type="email"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}

            <textarea
              {...register("comment", {
                required: "Comment is required",
              })}
              placeholder="Comment"
              className="w-full h-[200px] p-3 border border-black rounded"
            />
            {errors.comment && (
              <span className="text-red-500">{errors.comment.message}</span>
            )}

            <button
              className="bg-pink-400 text-white rounded p-4 mt-4"
              type="submit"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
