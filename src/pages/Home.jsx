import PostCard from "../components/PostCard";

import { useEffect, useState } from "react";
import PostSkeleton from "../components/PostSkeleton";
import { ErrorComp } from "../components/index.js";
import postService from "../services/PostService.js";
import { Button } from "../components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { addArrOfPosts, removeAllPosts } from "../store/PostsSlice.js";
import { ToastContainer } from "react-toastify";

function Home({ error, loading, isEnd, incrementPage }) {
  const dispatch = useDispatch();
  // dispatch(removeAllPosts())
  const { posts } = useSelector((state) => state.post);

  if (error) {
    return (
      <div className=" h-screen w-full flex items-center justify-center">
        <ErrorComp statusCode={500} />
      </div>
    );
  }

  return (
    <>
      <main
        className=" flex flex-col items-center mt-2 h-fit shadow-md shadow-black mx-auto rounded-lg
    smm:w-[70%] sm:w-[60%] md:w-[55%] lg:w-[40%]  px-6 "
      >
        <div
          id="post-container"
          className=" h-fit rounded-sm mx-auto flex flex-col items-center gap-4
        w-full pt-4"
        >
          {posts &&
            posts.map((post) => (
              <PostCard
                key={post._id}
                authorDetails={post.authorDetails}
                _id={post._id}
                commentsCount={post.commentsCount}
                likesCount={post.likesCount}
                coverImage={post.coverImage}
                reads={post.reads}
                title={post.title}
              />
            ))}

          {loading ? (
            <div className=" w-full h-fit">
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </div>
          ) : null}
        </div>
        {isEnd ? (
          <div className="mb-20 mt-4 sm:mb-8 w-full flex items-center justify-center">
            <p className="text-lg text-center w-2/3">
              Finished scrolling? Now, go out and create your own story
            </p>
          </div>
        ) : (
          <Button
            type="button"
            className=" mb-20 sm:mb-12"
            onClick={incrementPage}
            children="load more"
          />
        )}
      </main>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition="Slide"
      />
    </>
  );
}

export default Home;
