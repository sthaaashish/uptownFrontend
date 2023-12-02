import {
  faEnvelope,
  faMap,
  faPhone,
  faVoicemail,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { usePostDetailsandMessagesMutation } from "../features/Api";

const Contact = () => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useSelector((store) => store.user);
  const [sendMessage, { isLoading, error }] =
    usePostDetailsandMessagesMutation();
  const onSubmit = async (val) => {
    try {
      await sendMessage({
        body: {
          fullname: val.fullname,
          message: val.message,
          email: val.email,
          subject: val.subject,
        },
        token: user.token,
      }).unwrap();
      toast.success("message sent successfully");
      reset();
    } catch (err) {
      toast.error(err.message);

      console.log(err);
    }
  };

  if (isLoading) {
    return <Loading/>
  }
  return (
    <div className="p-12 mt-6">
      <div className="flex flex-wrap justify-center mx-auto gap-12">
        <div className="flex flex-col">
          <FontAwesomeIcon icon={faMap} />
          <h2 className="text-center">Address:</h2>
          <Typography>
            198 West 21th Street, Suite 721 <br></br>New York NY 10016
          </Typography>
        </div>
        <div className="flex flex-col">
          <FontAwesomeIcon icon={faPhone} />
          <h2 className="text-center">Phone:</h2>
          <Typography>+ 1235 2355 98</Typography>
        </div>
        <div className="flex flex-col">
          <FontAwesomeIcon icon={faEnvelope} />
          <h2 className="text-center">Email:</h2>
          <Typography>info@yoursite.com</Typography>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-2xl mt-8 p-8">
          If you got any questions <br></br>please do not hesitate to send us a
          message
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center gap-4 mt-4 shadow-2xl bg-gray-100 p-6 md:w-[700px] mx-auto">
            <input
              {...register("fullname", { required: "FullName is required" })}
              className=" w-[300px] md:w-[600px] p-3  text-sm border border-black rounded "
              placeholder="Your Name"
            />
            {errors.fullname && (
              <span className="text-red-500">{errors.fullname.message}</span>
            )}
            <input
              {...register("email", {
                required: "Email is required",
                pattern: /^\S+@\S+$/i,
              })}
              className=" w-[300px] md:w-[600px] p-3  text-sm border border-black rounded "
              placeholder="Your Email"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
            <input
              {...register("subject", { required: "Subject is required" })}
              className=" w-[300px] md:w-[600px] p-3  text-sm border border-black rounded "
              placeholder="subject"
            />
            {errors.subject && (
              <span className="text-red-500">{errors.subject.message}</span>
            )}
            <textarea
              {...register("message", { required: "Message is required" })}
              placeholder="Message"
              className="w-[300px] md:w-[600px] h-[200px] p-3   border border-black rounded "
            />
            {errors.message && (
              <span className="text-red-500">{errors.message.message}</span>
            )}
            <button
              className="bg-pink-400 text-white rounded p-4"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
