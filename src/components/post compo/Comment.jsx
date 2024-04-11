import React, { useState } from "react";
import likeIcon from "../../assets/blue-like-ic.png";
import postService from "../../services/PostService";
import { useNavigate } from "react-router-dom";

function Comment({
  authorName,
  authorUserId,
  authorProfilePhoto,
  author_id,
  content,
  likes,
  _id,
  postId,
}) {
  const [likesCount, setLikesCount] = useState(likes.length);
  const navigate = useNavigate();

  const likeTheComment = async () => {
    try {
      setLikesCount((prev) => prev + 1);
      const res = await postService.likeTheComment(postId, _id);

      if (!res) {
        throw new Error("failed to like the post!");
      }
      // console.log(res);
    } catch (error) {
      // console.log(error);
      setLikesCount((prev) => prev - 1);
    }
  };

  const openAuthorProfile = () => {
    navigate(`/user/${author_id}`);
  };

  return (
    <div
      id="comment"
      className="flex flex-col dark:bg-slate-800 rounded-md p-3 w-full gap-3"
      key={_id}
      data-comment-id="dasfadf56ygvvb5er"
    >
      <div className="flex gap-2 dark:bg-transparent">
        <img
          onClick={openAuthorProfile}
          className="size-10 cursor-pointer rounded-full  "
          src={authorProfilePhoto}
          alt=""
        />
        <div className="rounded-md rounded-tl-none bg-slate-200 px-2 py-3 w-full flex flex-col gap-3 dark:bg-gray-900">
          <div className="flex items-center justify-start">
            <div className="flex flex-col ml-2">
              <h2
                id="commented-user-name"
                className="leading-3 text-[16px] font-[500] dark:text-slate-300  "
              >
                {authorName}
              </h2>
              <span
                id="commented-user-id"
                className="leading-3 mt-1 text-[12px] dark:text-gray-400" 
              >
                @{authorUserId}
              </span>
            </div>
          </div>
          <div className="text-[15px] dark:text-gray-300"
          id="comment-content ">
            {content}
          </div>
        </div>
      </div>
      <a
        id="comment-like-btn"
        className="ml-[55px] w-fit flex items-center gap-3 cursor-pointer dark:text-gray-300"
        onClick={likeTheComment}
      >
        <span className="text-[14px]">Like</span>
        <div className="size-1 rounded-full bg-black dark:bg-white" />
        <div className="flex items-center justify-center gap-1">
          <img
            className="size-[18px] transition-all duration-300 ease-linear scale-on-click"
            src={likeIcon}
            alt=""
          />
          <span id="likes-count" className="text-[12px]">
            {likesCount}
          </span>
        </div>
      </a>
    </div>
  );
}

export default Comment;
