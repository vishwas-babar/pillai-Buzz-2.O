import { useNavigate, useParams } from "react-router-dom";
import {
  LikeCmtShrBkmr,
  PostReadComp,
  CommentsModal,
} from "../components/index.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorComp } from "../components/index.js";
import { Button } from "../components/index.js";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import postService from "../services/PostService.js";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Post() {
  const { id: postId } = useParams();

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const [likesCount, setLikesCount] = useState(0);
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [postBookmarked, setPostBookmarkd] = useState(true);
  const [isPostliked, setIsPostliked] = useState(true)


  const {
    isError,
    error,
    data: post,
    isLoading,
  } = useQuery({
    queryKey: ["post"],
    queryFn: () =>
      postService
        .getSinglePost(postId)
        .then((res) => {
          setLikesCount(res.likesCount);
          return res;
        })
        .catch((error) => {
          throw error;
        }),
  });

  useEffect(() => {
    if (userData?.bookmarks?.includes(postId)) {
      setPostBookmarkd(true);
    }

    // check if the user already liked post or not
    // console.log("this is post", post.postContent.likes.includes(userData._id));
    if (post?.postContent?.likes?.includes(userData?._id)) {
      setIsPostliked(true);
    }else{
      setIsPostliked(false);
    }
  }, [postId, post]);

  

  const likePost = () => {

    // if post is already liked then dont send any request to backend
    if (isPostliked) {
      return;
    }

    setLikesCount((prev) => prev + 1);
    setIsPostliked(true);
    postService.likeThePost(postId)
    .catch((error) => {
      console.log("error when liking the post: ", error);
      setLikesCount((prev) => prev - 1);
      setIsPostliked(false);
    });
  };

  const shareThePost = () => {
    const postLink = window.location.href;
    console.log(postLink);

    // Get the current page URL
    const currentUrl = window.location.href;

    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = currentUrl;
    document.body.appendChild(tempInput);

    // Select the URL text
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the URL to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    toast.info("copied to clipboard", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };

  if (isError) {
    return (
      <div>
        <ErrorComp statusCode={500} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className=" h-screen w-full flex items-center justify-center dark:bg-gray-900 dark:text-slate-200">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="mt-24 dark:bg-gray-900">
      {userData?._id === post?.author?._id ? (
        <Button
          className="absolute mt-4 rounded-md right-6"
          children="Edit"
          onClick={() => navigate(`/edit-post/${postId}`)}
        />
      ) : null}
      <PostReadComp author={post?.author} postContent={post?.postContent} />

      <LikeCmtShrBkmr
        postContent={post?.postContent}
        likesCount={likesCount}
        likePost={likePost}
        toggleCommentsModal={() => {
          setCommentsModalOpen(!commentsModalOpen);
          setOverlay(!overlay);
        }}
        postBookmarked={postBookmarked}
        bookmarkPost={() => setPostBookmarkd(!postBookmarked)}
        shareThePost={shareThePost}
        isPostLiked={isPostliked}
      />

      <CommentsModal postId={postId} view={commentsModalOpen} />

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

      <div
        onClick={() => {
          setCommentsModalOpen(!commentsModalOpen);
          setOverlay(!overlay);
        }}
        className={`w-full h-full fixed left-0 top-0 bg-black opacity-50 z-20 ${overlay ? "" : "hidden"}`}
      ></div>
    </div>
  );
}

// this is custom query for fetching the api it gives the state of api request error/ loading/ data
export const useCustomQuery = async (pathUrl) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  (async () => {
    try {
      setError(false);
      setIsLoading(true);
      const response = await axios.get(pathUrl);

      if (response) {
        setData(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    }
  })();

  return { data, isLoading, error };
};

export default Post;
