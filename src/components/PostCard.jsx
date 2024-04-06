import { useNavigate } from "react-router-dom";
import trialNewsImage from "../assets/news.jpeg";
import userpng from "../assets/user.png";
import { useEffect, useState } from "react";
import postService from "../services/PostService";
import { toast, Slide } from "react-toastify";
import { useSelector } from "react-redux";

function PostCard({
  authorDetails,
  _id,
  commentsCount,
  likesCount,
  reads,
  title,
  coverImage,
}) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const [postBookmarked, setPostBookmarkd] = useState(true);

  useEffect(() => {
    if (userData?.bookmarks?.includes(_id)) {
      setPostBookmarkd(true);
    }
  }, [_id]);

  const bookmarkPost = async () => {
    setPostBookmarkd((prev) => !prev);
    postService
      .bookmarkThePost(_id)
      .then((res) => {
        console.log(res.status);
        toast.success("added to bookmarks.", {
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
      })
      .catch((error) => {
        console.log("failed to bookmark the post", error.response?.status);
        if (error.response.status === 409) {
          // that means this post is already bookmarked
          setPostBookmarkd(true);
          toast.info("post is already bookmarked!", {
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
        } else {
          setPostBookmarkd((prev) => !prev);
        }
      });
  };

  return (
    <>
      <div
        id="post"
        className="h-fit flex flex-col w-full min-w-[90%] items-center rounded-md pt-0"
      >
        <div
          id="author-info"
          className="flex justify-start self-start bg-transparent"
          data-user_id={authorDetails._id}
          onClick={() => navigate(`/user/${authorDetails._id}`)}
        >
          <div className="size-14 ring-blue-600 flex justify-center items-center overflow-hidden">
            <img
              src={authorDetails.profilePhoto}
              className="h-full w-full rounded-full"
              alt=""
            />
          </div>
          <div className="ml-2 mt-2">
            <h2 className="md:text-[20px] text-[18px] font-serif leading-4 ">
              {authorDetails.name}
            </h2>
            <span className="text-[14px] mt-0">@{authorDetails.userId}</span>
          </div>
        </div>
        <hr />
        <div
          id="post-field"
          data-post_id={_id}
          className="w-full"
          onClick={() => navigate(`/post/${_id}`)}
        >
          <div className="ml-0 w-full">
            <h1
              role="heading"
              className="md:text-[22px] text-[20px] my-2 font-[500] leading-tight text-neutral-800"
            >
              {title}
            </h1>
          </div>
          <div className="border border-black aspect-video rounded-md w-full overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src={coverImage}
              alt=""
            />
          </div>
          <div className="mt-1 flex justify-between w-full relative">
            <div className=" flex justify-start w-full items-center">
              <a className="comments-btn ml-0">
                <i className="bx bx-message-rounded" />
                <span>{commentsCount}</span>
              </a>
              <a className="likes-btn ml-3">
                <i className="bx bx-heart" />
                <span>{likesCount}</span>
              </a>
              <a
                onClick={(e) => {
                  e.stopPropagation();
                  bookmarkPost();
                }}
                className={`bookmark-btn ml-4 ${postBookmarked ? " bg-custom-primary text-white" : ""}`}
              >
                <i className="bx bx-bookmark" />
              </a>
              <a className="reads-counts">{reads} reads</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
