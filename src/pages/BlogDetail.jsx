import {
  Button,
  Input,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import {  useParams } from "react-router-dom";
import {
  useGetAllBlogsQuery,
  useGetBlogsByIdQuery,
  usePostCommentByBlogIdMutation,
} from "../features/Api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Comments from "../components/Comments";
import Loading from "../components/Loading";
import { baseUrl } from "../features/constant";
import FadeIn from "../components/FadeIn";
import CommentForm from "../components/CommentForm";

const listItemsLabels = [
  { label: "jobs", value: 12 },
  { label: "Visual Assistant", value: 22 },
  { label: "Coffee", value: 37 },
  { label: "Drinks", value: 42 },
  { label: "Foods", value: 14 },
  { label: "Travel", value: 140 },
];

const BlogDetail = () => {
  const { id } = useParams();
  const [filterCategory, setFilterCategory] = useState("");
  const { data: blogsDetail, isLoading, error } = useGetBlogsByIdQuery(id);
  const { data: blog_Data, isLoading: blog_isLoading } = useGetAllBlogsQuery();
  const [postComments, { isLoading: is_loading }] = usePostCommentByBlogIdMutation();
  const { user } = useSelector((store) => store.user);

  const filterBlogs = blog_Data?.filter((blogs) =>
    filterCategory
      ? blogs.category.toLowerCase() === filterCategory.toLowerCase()
      : true
  );
  const handleFilterChange = (val) => {
    setFilterCategory(val);
  };

 

  //shuffling and generating random blogs
  const shuffleBlogs = (items) => {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  };
  const randomBlogs = shuffleBlogs(blog_Data ? [...blog_Data] : []).slice(0, 3);

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
      toast.error(err.data.message);
    }
  };

  if (isLoading || is_loading || blog_isLoading) {
    return <Loading />;
  }

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
          <List>
            <ListItem onClick={() => handleFilterChange("Land")}>Land</ListItem>
            <ListItem onClick={() => handleFilterChange("Housing")}>
              Housing
            </ListItem>
            <ListItem onClick={() => handleFilterChange("office")}>
              Office
            </ListItem>
            <ListItem onClick={() => handleFilterChange("Apartments")}>
              Apartments
            </ListItem>
            <ListItem onClick={() => handleFilterChange("Investment")}>
              Investment
            </ListItem>
          </List>
        </div>

        <div>
          <h1>Recent Blog</h1>
          <div className="space-y-4 mt-2">
            {randomBlogs.map((newBlogs) => (
              <div className="flex gap-2">
                <img
                  src={`${baseUrl}${newBlogs.property_image}`}
                  alt=""
                  className="h-20 w-20"
                />
                <h1>{newBlogs.title}</h1>
              </div>
            ))}
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
        {filterCategory ? (
          <div className="md:grid">
            {filterBlogs.map((items, index) => (
              <FadeIn delay={index * 0.2} direction={"up"}>
             <div className="p-4" >
                  <h1>{items.title}</h1>
                  <img
                    src={`${baseUrl}${items.property_image}`}
                    className="w-[400px] h-[300px]"
                  />
                  <Typography>
                    {items.discription.substring(0, 100)}...
                  </Typography>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div>
            {blogsDetail && (
              <>
                <h1 className="text-4xl mb-4">{blogsDetail.title}</h1>
                <p>{blogsDetail.discription}</p>

                <img
                  src={`${baseUrl}${blogsDetail.property_image}`}
                  alt="Background"
                  className="w-full"
                />
                <div className="mt-6">
                  <Comments data={blogsDetail} />
                </div>
              </>
            )}
            <div>
              <CommentForm onSubmit={onSubmit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BlogDetail;
