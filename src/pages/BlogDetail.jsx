import {
  Button,
  Chip,
  Input,
  List,
  ListItem,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import bg2 from "../assets/bg_2.jpg";
import work4 from "../assets/about.jpg";
import work2 from "../assets/bg_1.jpg";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useGetBlogsByIdQuery,
  usePostCommentByBlogIdMutation,
} from "../features/Api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Comments from "../components/Comments";
import Loading from "../components/Loading";
import { baseUrl } from "../features/constant";

const listItemsLabels = [
  { label: "jobs", value: 12 },
  { label: "Visual Assistant", value: 22 },
  { label: "Coffee", value: 37 },
  { label: "Drinks", value: 42 },
  { label: "Foods", value: 14 },
  { label: "Travel", value: 140 },
];

const BlogDetail = () => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const { data: blogsDetail, isLoading, error } = useGetBlogsByIdQuery(id);
  const [postComments, { isLoading: is_loading }] =
    usePostCommentByBlogIdMutation();

  const { user } = useSelector((store) => store.user);

  const onSubmit = async (val) => {
    try {
      await postComments({
        id: blogsDetail._id,
        body: {
          username: user.fullname,
          comment: val.comment,
          email: val.email,
        },
        token: user.token,
      }).unwrap();
      toast.success("commented successfully");
      reset();
    } catch (err) {
      // Handle error
      toast.error(err.data.message);

      console.log(err);
    }
  };

  if (isLoading || is_loading) {
    return <Loading/>
  }

  console.log(blogsDetail)
  return (
    <div className=" md:flex flex-col md:flex-row gap-14 p-12">
      <div className="w-full md:w-1/4 mb-8 md:mb-0  md:order-1">
        <div className="relative flex w-full gap-2 mb-4 md:w-max">
          <Input
            type="search"
            label="Type a keyword and enter"
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button size="sm" className="!absolute right-1 top-1 rounded">
            Search
          </Button>
        </div>
        <div className="">
          <h1>Categories</h1>
          {listItemsLabels.map((items, index) => (
            <>
              <List key={index}>
                <ListItem>
                  {items.label}
                  <ListItemSuffix>
                    <Chip
                      value={items.value}
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                    />
                  </ListItemSuffix>
                </ListItem>
              </List>
            </>
          ))}
        </div>

        <div>
          <h1>Recent Blog</h1>
          <div className="space-y-4 mt-2">
            <div className="flex gap-2">
              <img src={work2} alt="" className="h-20 w-20" />
              <h1>
                Even the all-powerful Pointing has no control about the blind
                texts
              </h1>
            </div>
            <div className="flex gap-2">
              <img src={work4} alt="" className="h-20 w-20" />
              <h1>
                Even the all-powerful Pointing has no control about the blind
                texts
              </h1>
            </div>
            <div className="flex gap-2">
              <img src={work2} alt="" className="h-20 w-20" />
              <h1>
                Even the all-powerful Pointing has no control about the blind
                texts
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-xl">Tag Cloud</h1>

          {listItemsLabels.map((list, index) => (
            <Button
              variant="outlined"
              size="sm"
              key={index}
              value={index}
              className="text-[10px] w-19 p-2 space-x-3"
            >
              {list.label}
            </Button>
          ))}
        </div>

        <div className="mt-6">
          <h1 className="text-xl">Paragraph</h1>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vitae
            dolorem accusamus quisquam ex illo architecto labore quae veritatis
            corporis! Obcaecati autem exercitationem quia et quam aliquid
            consequuntur ipsam reiciendis.
          </Typography>
        </div>
      </div>

      <div className="w-full md:w-3/4  md:order-2">
        {blogsDetail && (
          <>
            <h1 className="text-4xl mb-4">{blogsDetail.title}</h1>
            <p>{blogsDetail.discription}</p>

            <img src={`${baseUrl}${blogsDetail.image}`} alt="Background" />

            <h1 className="text-4xl mt-4">#2. Creative WordPress Themes</h1>

            <img src={bg2} alt="Work 4" />

            <p>{blogsDetail.discription}</p>

            <div className="mt-6">
              <Comments data={blogsDetail} />
            </div>
          </>
        )}

        <div>
          <h1 className="mt-6 text-xl">Leave a Comment</h1>
          <div className="flex flex-col justify-center items-center gap-4 mt-4 shadow-2xl bg-gray-100 p-6 md:w-[700px] mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <input
                {...register("name", { required: "Name is required" })}
                className="w-[300px] md:w-[600px] p-3 text-sm border border-black rounded"
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
                className="w-[300px] md:w-[600px] p-3 text-sm border border-black rounded"
                placeholder="Your Email"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}

              <textarea
                {...register("comment", { required: "Comment is required" })}
                placeholder="Comment"
                className="w-[300px] md:w-[600px] h-[200px] p-3 border border-black rounded"
              />
              {errors.comment && (
                <span className="text-red-500">{errors.comment.message}</span>
              )}

              <button
                className="bg-pink-400 text-white rounded p-4"
                type="submit"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogDetail;
