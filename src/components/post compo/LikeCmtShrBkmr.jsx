function LikeCmtShrBkmr({
  postContent,
  likesCount,
  likePost,
  toggleCommentsModal,
  postBookmarked,
  bookmarkPost,
  shareThePost,
}) {
  return (
    <div className="w-80 h-12 bg-slate-200 self-center fixed z-10 mx-auto bottom-5 left-1/2 translate-x-[-50%] rounded-[30px] shadow-md flex items-center justify-around gap-2">
      <a
        id="like-btn"
        className="size-10 rounded-md cursor-pointer  flex items-center justify-center transition-all duration-300 ease-in-out active:bg-custom-primary "
        onClick={likePost}
      >
        <i className="bx bx-like text-[25px]" />
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
        className={`size-10 rounded-md cursor-pointer  flex items-center justify-center transition-all duration-300 ease-in-out active:bg-custom-primary ${postBookmarked ? "text-white bg-custom-primary" : " text-gray-900"}`}
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
