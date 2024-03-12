import PostCard from "../components/PostCard";

import { useEffect, useState } from "react";
import PostSkeleton from "../components/PostSkeleton";
import { ErrorComp } from "../components/index.js";
import postService from "../services/PostService.js";
import { Button } from "../components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { addArrOfPosts, removeAllPosts } from "../store/PostsSlice.js";

function Home({ error, loading, isEnd, incrementPage }) {
  // const [page, setPage] = useState(1);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [isEnd, setIsEnd] = useState(false);

  const dispatch = useDispatch();
  // dispatch(removeAllPosts())
  const { posts } = useSelector((state) => state.post);

  // useEffect(() => { // when components mount first time then clear the post state
  //     console.log("clearing the all post from state")
  //     // dispatch(removeAllPosts())
  // }, [])

  // useEffect(() => {
  //     setLoading(true)
  //     setTimeout(() => {
  //         loadMorePostForHomePage();
  //     }, 2000); // :todo
  // }, [page])

  // function loadMorePostForHomePage() {

  //     setError(false);
  //     setLoading(true)
  //     postService.getPostForHomePage(page)
  //         .then(res => {
  //             console.log(res);
  //             setLoading(false)
  //             dispatch(addArrOfPosts(res.posts))

  //             if (res.posts?.length === 0) {
  //                 setIsEnd(true);
  //             }
  //         })
  //         .catch(error => {
  //             console.log(error)
  //             setError(true)
  //         })
  // }

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
    </>
  );
}

export default Home;
