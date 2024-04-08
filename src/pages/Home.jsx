import PostCard from "../components/PostCard";

import { useEffect, useState } from "react";
import PostSkeleton from "../components/PostSkeleton";
import { ErrorComp } from "../components/index.js";
import postService from "../services/PostService.js";
import { Button } from "../components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { addArrOfPosts, removeAllPosts } from "../store/PostsSlice.js";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";



function Home({ error, loading, isEnd, incrementPage }) {
  const dispatch = useDispatch();
  // dispatch(removeAllPosts())
  const { posts } = useSelector((state) => state.post);
  const authStatus = useSelector((state) => state.user.userData);
  const authStatusLoading = useSelector((state) => state.user.loading);

  if (!authStatusLoading && !authStatus) {
    return (
      <div className=" h-screen w-full flex items-center justify-center">
        <h1 className=" text-2xl">You need to login first </h1>
        <Link to={"/login"} type="button" className=" bg-custom-primary rounded-md ml-2 px-4 py-2 text-slate-200">Login</Link>
      </div>
    );
  }

  if (!authStatusLoading && error) {
    return (
      <div className=" h-screen w-full flex items-center justify-center dark:bg-gray-600">
        <ErrorComp statusCode={500} />
      </div>
    );
  }

  return (
    <div className=" min-h-screen w-full dark:bg-gray-900 mt-0 absolute">
      <Helmet>
        <meta name="google-site-verification" content="GCKchu9mr9qAr7zmmkJMih5uA76Near5qumbzLio1ws" />
      </Helmet>
      <main
        className=" flex flex-col items-center mt-24 h-fit shadow-md shadow-black mx-auto rounded-lg
    smm:w-[70%] sm:w-[60%] md:w-[55%] lg:w-[40%] px-2 sm:px-6 dark:bg-gray-900 dark:shadow-none dark:border dark:border-gray-600"
      >
        <div
          id="post-container"
          className=" h-fit rounded-sm mx-auto flex flex-col items-center gap-4
        w-full pt-4 dark:bg-transparent"
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
    </div>
  );
}

export default Home;
