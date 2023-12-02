import React from "react";
import { CircularPagination } from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import HeadingLine from "../components/HeadingLine";
import { baseUrl } from "../features/constant";
import { Typography } from "@material-tailwind/react";
import { useGetAllBlogsQuery } from "../features/Api";
import FadeIn from "../components/FadeIn";
import Loading from "../components/Loading";

const BlogItem = ({ blogdata, onClick }) => (
  <div onClick={onClick} className="p-4">
    <h1>{blogdata.title}</h1>
    <img src={`${baseUrl}${blogdata.image}`} className="w-[400px] h-[300px]" />
    <Typography>{blogdata.discription.substring(0, 100)}...</Typography>
  </div>
);

const BlogSection = ({  data, onClick }) => (
  <>
  
    <FadeIn delay={0.2} direction={"up"}>
      <div className="md:grid grid-cols-4 p-12">
        {data &&
          data.map((blogdata, index) => (
            <BlogItem
              key={index}
              blogdata={blogdata}
              onClick={() => onClick(blogdata._id)}
            />
          ))}
      </div>
    </FadeIn>
  </>
);

const Blog = () => {
  const nav = useNavigate();
  const { isLoading, data, error } = useGetAllBlogsQuery();

  if (isLoading) {
    return <Loading/>
  }

  return (
    <>
      <BlogSection
        title="Blogs"
        data={data}
        onClick={(id) => nav(`/blogDetails/${id}`)}
      />
      <div className="flex justify-center mb-6">
        <CircularPagination />
      </div>
    </>
  );
};

export default Blog;




export function HomeBlogs() {
  const nav = useNavigate();
  const { isLoading, data, error } = useGetAllBlogsQuery();

  if (isLoading) {
    return <Loading/>
  }

  return (
    <>
      <div>
      <HeadingLine heading={"Recent Blogs"} />
    </div>
    <h1 className="text-4xl text-center mt-4">Blogs</h1>
      <BlogSection
        data={data}
        onClick={(id) => nav(`/blogDetails/${id}`)}
      />
    </>
  );
}
