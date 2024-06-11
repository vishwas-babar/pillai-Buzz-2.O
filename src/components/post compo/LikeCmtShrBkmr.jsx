function LikeCmtShrBkmr({
  postContent,
  likesCount,
  likePost,
  toggleCommentsModal,
  postBookmarked,
  bookmarkPost,
  shareThePost,
  isPostLiked,
}) {
  return (
    <div className="w-80 h-12 bg-slate-200 self-center fixed z-10 mx-auto bottom-5 left-1/2 translate-x-[-50%] rounded-[30px] shadow-md flex items-center justify-around gap-2 dark:bg-gray-900 dark:shadow-white dark:shadow-sm dark:text-slate-200">
      <a
        id="like-btn"
        className={`size-10 rounded-md cursor-pointer  flex items-center justify-center transition-all duration-300 ease-in-out gap-1`}
        onClick={likePost}
      >
        <svg
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6 stroke-current   ${isPostLiked ? 'text-red-500 fill-current dark:text-red-500': ''}`}
        >
          <path
            d="M11 19C12 19 21 14.0002 21 7.00043C21 3.50057 18 1.04405 15 1.00065C13.5 0.978943 12 1.50065 11 3.00059C10 1.50065 8.47405 1.00065 7 1.00065C4 1.00065 1 3.50057 1 7.00043C1 14.0002 10 19 11 19Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            
          />
        </svg>

        <span> {likesCount} </span>
      </a>
      <a
        onClick={toggleCommentsModal}
        id="comment-btn"
        className="size-10 rounded-md cursor-pointer  flex items-center justify-center transition-all duration-300 ease-in-out active:bg-custom-primary "
      >
        <i className="bx bx-comment text-[25px]" />
      </a>
      <a
        onClick={bookmarkPost}
        id="bookmark-btn"
        className={`size-10 rounded-md cursor-pointer  flex items-center justify-center transition-all duration-300 ease-in-out active:bg-custom-primary dark:text-slate-200 ${postBookmarked ? "text-white bg-custom-primary" : " text-gray-900"}`}
      >
        <i className="bx bx-bookmark text-[25px] transition-all duration-300 ease-in-out" />
      </a>
      <a
        onClick={shareThePost}
        id="share-btn"
        className="size-10 rounded-md cursor-pointer  flex items-center justify-center transition-all duration-300 ease-in-out active:bg-custom-primary "
      >
        <i className="bx bx-share-alt text-[25px]" />
      </a>
    </div>
  );
}

export default LikeCmtShrBkmr;
