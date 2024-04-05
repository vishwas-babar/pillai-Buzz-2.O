import React, { useEffect, useState } from "react";
import { ErrorComp, Loader, PostForm } from "../components/index.js";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import postService from "../services/PostService.js";


function EditPost() {
  const { id } = useParams();
  const [uploadingPost, setUploadingPost] = useState(false)

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["post"],
    queryFn: () => postService.getSinglePost(id),
  });
  const userData = useSelector((state) => state.user?.userData);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1>Loading</h1>
      </div>
    );
  }

  // if (userData?._id !== data.postContent?.author) {
  //    return (<div className="w-full h-screen flex items-center justify-center">
  //         <h1 className='text-3xl'>unauthorized for this page</h1>
  //     </div>)
  // }

  if (isError) {
    return <ErrorComp statusCode={500} />;
  }

  return (
    <div className=" mt-16">
      <PostForm setUploadingPost={setUploadingPost} post={data?.postContent} />
      {uploadingPost && <Loader children={"Creating post..."} />}
    </div>
  );
}

export default EditPost;
