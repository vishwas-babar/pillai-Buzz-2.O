import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import postService from "../../services/PostService";
import Comment from "./Comment";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


function CommentsModal({ postId, view }) {
  const { register, handleSubmit, reset } = useForm();
  const [postComments, setPostComments] = useState(new Array());

  const isUserLoggedIn = useSelector((state) => state.user.status);
  const navigate = useNavigate();

  const {
    error,
    isError,
    data: comments,
    isLoading,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      postService
        .getAllComments(postId)
        .then((res) => {
          // console.log("the comments is: ");
          // console.log(res.comments);
          setPostComments(res.comments?.reverse());
          return res;
        })
        .catch((error) => {
          throw error;
        }),
  });

  const addComment = (data) => {


    if (!isUserLoggedIn) {
      alert("You need to login first");
      navigate("/login");
      return;
    }

    // passing the content
    postService
      .addCommentOnPost(postId, data)
      .then((res) => {
        // console.log("comment added on post: ", res);
        toast.success("comment added", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        const author = res.author;
        const addedComment = res.comment;

        const comment = {
          comments: {
            authorName: author.name,
            authorUserId: author.userId,
            authorProfilePhoto: author.profilePhoto,
            createdBy: addedComment?.createdBy,
            content: addedComment?.content,
            createdAt: addedComment?.createdAt,
            likes: addedComment?.likes,
            _id: addedComment?._id,
          },
          _id: postId,
        };

        const postCommentsCopy = postComments.slice();
        postCommentsCopy.unshift(comment);
        setPostComments(postCommentsCopy);
      })
      .catch((error) => {
        toast.error("failed to add comment!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        // console.log("error in posting a post: ", error);
      });

    reset();
  };

  return (
    <>
      <div
        id="comment-modal"
        className={`fixed top-36 z-40 h-full w-full flex-col overflow-hidden scroll-smooth rounded-lg bg-white sm:left-1/2 sm:w-3/4 sm:translate-x-[-50%] md:w-2/3 lg:w-1/2 dark:bg-gray-900 ${view ? "" : "hidden"} shadow-xl`}
      >
        {/* take comment input */}
        <form
          onSubmit={handleSubmit(addComment)}
          className="flex h-fit w-full items-center gap-2 p-3"
        >
          <label htmlFor="comment" />
          <textarea
            id="comment-input"
            role="text"
            type="text"
            className="w-full rounded-md border p-2 text-[16px] dark:bg-gray-800 dark:text-slate-200 dark:border-gray-700 dark:placeholder-slate-500"
            placeholder="add your thoughts here"
            {...register("content", {
              required: true,
              validate: (value) =>
                value.trim() !== "" || "content can not be empty spaces",
            })}
          />
          <button
            id="add-comment-btn"
            className="btn-primary flex items-center justify-center w-12 h-12 rounded-md dark:bg-gray-800 dark:text-slate-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-slate-300 dark:hover:border-gray-800"
            type="submit"
          >
            <i className="bx bx-send text-[20px]" />
          </button>
        </form>

        <div
          id="comment-section"
          className="h-fit w-full border-t dark:border-gray-500 p-2 flex flex-col gap-2"
        >
          {postComments.length > 0 ? (
            postComments?.map((comment) => (
              <Comment
                key={comment.comments?._id}
                authorName={comment.comments?.authorName}
                authorUserId={comment.comments?.authorUserId}
                authorProfilePhoto={comment.comments?.authorProfilePhoto}
                author_id={comment.comments?.author_id}
                content={comment.comments?.content}
                likes={comment.comments?.likes}
                _id={comment.comments?._id}
                postId={postId}
              />
            ))
          ) : (
            <div className="h-full w-2/3 flex items-center mx-auto mt-5 justify-center">
              <h1 className="text-center w-full dark:text-slate-400">
                No comments yet? Your opinion matters! Start the discussion now.
              </h1>
            </div>
          )}
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
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

export default CommentsModal;
