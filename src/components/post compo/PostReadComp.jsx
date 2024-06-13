import "./PostReadComp.css";
import { useState } from "react";
import parse from "html-react-parser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PostReadComp({ author, postContent }) {
  const [post, setPost] = useState();
  const [postcreatedat, setPostcreatedat] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // eg. 5 apr 2023
    const date = new Date(postContent?.createdAt);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const day = date.getDate();
    setPostcreatedat(`${day} ${month} ${year}`);

  }, [postContent]);

  return (
    <main className="w-full h-fit pt-4 pb-20 px-3 mb-16 sm:w-3/4 sm:mx-auto md:w-3/5 lg:w-1/2 overflow-x-hidden dark:bg-gray-900">
      <div className="mt-6 break-words px-4 text-center font-heading text-3xl font-extrabold text-slate-900 md:mt-10 md:px-5 md:text-4xl lg:px-8 xl:px-20 xl:text-5xl mb-8 md:mb-14">
        <h1 id="heading" className="text-3xl my-6 font-bold dark:text-slate-200">
          {postContent?.title}
        </h1>
      </div>
      <div
        id="author-div"
        className="flex items-center gap-2 w-full justify-center cursor-pointer dark:text-gray-300"
        onClick={() => navigate(`/user/${author?._id}`)}
      >
        {/* <img class="size-9 rounded-full" src="../public/images/user.png" alt=""> */}
        <img
          id="author-profile-photo"
          className="size-9 rounded-full"
          src={author?.profilePhoto}
          alt=""
        />
        <span id="author" className="text-[20px] dark:text-gray-300 ">
          {author?.name}
        </span>
      </div>
      <div className="w-full flex items-center justify-center">
        <span id="post-date" className=" dark:text-gray-400">{postcreatedat}</span>
      </div>
      <div className="w-full h-fit rounded-md overflow-hidden my-5 border border-black shadow-custom-shadow-1 flex justify-center dark:border dark:border-gray-500">
        <img id="post-cover-image" src={postContent?.coverImage} alt="" />
      </div>
      <div id="description" className=" Un-reset dark:text-gray-300 text-white">
        {postContent && postContent.discription
          ? parse(postContent.discription.toString())
          : ""}
      </div>
    </main>
  );
}

export default PostReadComp;
