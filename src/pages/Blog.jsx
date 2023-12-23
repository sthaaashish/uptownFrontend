import React, { useState } from "react";
import { CircularPagination } from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import HeadingLine from "../components/HeadingLine";
import { baseUrl } from "../features/constant";
import { Typography } from "@material-tailwind/react";
import { useGetAllBlogsQuery } from "../features/Api";
import FadeIn from "../components/FadeIn";
import Loading from "../components/Loading";

export const BlogItem = ({blogdata, onClick }) => (
  <div onClick={onClick} className="p-4 cursor-pointer">
    <div className="mb-2">
      <h1 className="overflow-hidden max-h-12 text-lg">
        {blogdata.title}
      </h1>
    </div>
    <div className="mb-2">
      <img
        src={`${baseUrl}${blogdata.property_image}`}
        className="w-full h-[200px] object-cover"
        alt={blogdata.title}
      />
    </div>
    <Typography>{blogdata.discription.substring(0, 100)}...</Typography>
  </div>
);

export const BlogSection = ({ data, onClick }) => (
  <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-12">
    {data.map((blogdata, index) => (
      <FadeIn key={index} delay={index * 0.2} direction="up">
        <BlogItem blogdata={blogdata} onClick={() => onClick(blogdata._id)} />
      </FadeIn>
    ))}
  </div>
);

const Blog = () => {
  const nav = useNavigate();
  const { isLoading, data, error } = useGetAllBlogsQuery();
  const[currentPage,setCurrentPage]=useState(1);
  const cardsPerPage=8


  const lastIndex=currentPage * cardsPerPage;
  const firstIndex=lastIndex - cardsPerPage;

const currentData= data && data?.slice(firstIndex, lastIndex)

const nPages =Math.ceil(data?.length /cardsPerPage)

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BlogSection data={currentData} onClick={(id) => nav(`/blogDetails/${id}`)} />
      <div className="flex justify-center mb-6">
        <CircularPagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </div>
    </>
  );
};

export default Blog;

export function HomeBlogs() {
  const nav = useNavigate();
  const { isLoading, data, error } = useGetAllBlogsQuery();

  if (isLoading) {
    return <Loading />;
  }

  const newData = data?.slice(0, 4);

  return (
    <>
      <div>
        <HeadingLine heading={"Recent Blogs"} />
      </div>
      <h1 className="text-4xl text-center mt-4">Blogs</h1>
      <BlogSection data={newData} onClick={(id) => nav(`/blogDetails/${id}`)} />
    </>
  );
}
