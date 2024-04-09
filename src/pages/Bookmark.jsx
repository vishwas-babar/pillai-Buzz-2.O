import { useQuery } from "@tanstack/react-query";
import postService from "../services/PostService";
import { ErrorComp, PostCard } from "../components/index.js";
import { useState } from "react";

function Bookmarks(params) {
  const {
    isLoading,
    isError,
    error,
    data: bookmarkPosts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      postService
        .getAllBookmarks()
        .then((res) => {
          console.log(res.data?.bookmarkPosts);
          return res.data?.bookmarkPosts;
        })
        .catch((error) => {
          throw error;
        }),
  });

  if (isLoading) {
    return (
      <div className=" h-screen w-full flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className=" h-screen w-full flex items-center justify-center">
        <ErrorComp />
      </div>
    );
  }

  return (
    <main className=" flex flex-col items-center mt-24 h-fit shadow-md shadow-black mx-auto rounded-lg smm:w-[70%] sm:w-[60%] md:w-[55%] lg:w-[40%] px-6 dark:bg-gray-900 dark:border dark:border-gray-600">
      <div
        id="post-container"
        className=" h-fit rounded-sm mx-auto flex flex-col items-center gap-4
        w-full pt-4"
      >
        {bookmarkPosts.length < 1 ? (
          <div className=" h-screen w-full flex items-center justify-center">
            <h1 className=" dark:text-gray-400">You dont have any bookmarked posts</h1>
          </div>
        ) : (
          bookmarkPosts?.map((post) => (
            // <h1>this is the posts</h1>
            <PostCard
              key={post.bookmarkPost._id}
              authorDetails={{
                _id: post?._id,
                name: post?.name,
                userId: post?.userId,
                profilePhoto: post?.profilePhoto,
              }}
              _id={post.bookmarkPost._id}
              commentsCount={post.commentsCount}
              likesCount={post.likesCount}
              reads={post.bookmarkPost.reads}
              title={post.bookmarkPost.title}
              coverImage={post.bookmarkPost.coverImage}
            />
          ))
        )}
      </div>
    </main>
  );
}

export default Bookmarks;
