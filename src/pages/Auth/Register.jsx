import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { useUserRegisterMutation } from "../../features/authApi";

function Register() {
  const nav = useNavigate();
  const [userRegister, { isLoading, error }] = useUserRegisterMutation();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await userRegister(data).unwrap();
      toast.success("Successfully Registered");
      nav(-1);
    } catch (err) {
      toast.error(err.data.message);
    }
  };


  if (isLoading) {
    return <Loading/>
  }

  return (
    <section className="gradient-form h-full ">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full shadow-2xl rounded-lg bg-slate-400  space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm -space-y-px ">
              <div className="p-3">
                <input
                  {...register("fullname", {
                    required: "FullName is required",
                  })}
                       className=" w-full p-3  text-sm border border-black rounded "
                  placeholder="Your Name"
                />
                {errors.fullname && (
                  <span className="text-red-500">
                    {errors.fullname.message}
                  </span>
                )}
              </div>
              <div className="p-3">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^\S+@\S+$/i,
                  })}
                  className=" w-full p-3  text-sm border border-black rounded "
                  placeholder="Your Email"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="p-3">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className=" w-full p-3  text-sm border border-black rounded "
                  placeholder="enter password"
                  type="password"
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="px-3 space-x-1">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <div className="p-3">
              <button
                type="submit"
                className="group  relative w-full flex justify-center bg-gradient-to-r from-pink-700 via-pink-600 to-pink-800 hover:bg-gradient-to-br   py-2 px-4 border border-transparent text-lg text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Register
              </button>
            </div>
            <div className="flex pb-6 justify-center">
              <p>Already have an account?</p>
              <button className="underline" onClick={() => nav(`/login`)}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
