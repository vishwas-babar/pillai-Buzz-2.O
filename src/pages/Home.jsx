import PostCard from "../components/PostCard";

import { useEffect, useState,  } from "react";
import PostSkeleton from "../components/PostSkeleton";
import { ErrorComp } from "../components/index.js";
import postService from "../services/PostService.js";
import { Button } from '../components/index.js';
import { useDispatch, useSelector } from "react-redux";
import { addArrOfPosts, removeAllPosts } from '../store/PostsSlice.js';


function Home(params) {

    const [page, setPage] = useState(1);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);


    const dispatch = useDispatch();

    const { posts } = useSelector(state => state.post)


    useEffect(() => {
        dispatch(removeAllPosts()) // :todo
        setLoading(true)
        setTimeout(() => {
            loadMorePostForHomePage();
        }, 2000);
    }, [page])

    function loadMorePostForHomePage() {

        setError(false);
        setLoading(true)
        postService.getPostForHomePage(page)
            .then(res => {
                console.log(res);
                // setPage(page + 1) // i think its wrong review it later
                setLoading(false)
                dispatch(addArrOfPosts(res.posts))
            })
            .catch(error => {
                console.log(error)
                setError(true)
            })
    }


    if (error) {
        return (
            <div className=" h-screen w-full flex items-center justify-center">
                <ErrorComp statusCode={500} />
            </div>
        )
    }


    return (
        <>
            <main className=" flex flex-col items-center mt-2 h-fit shadow-md shadow-black mx-auto rounded-lg
    smm:w-[70%] sm:w-[60%] md:w-[55%] lg:w-[40%]  px-6 ">
                <div id="post-container" className=" h-fit rounded-sm mx-auto flex flex-col items-center gap-4
        w-full pt-4">

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
                <Button
                    type="button"
                    className=" mb-20 sm:mb-12"
                    onClick={() => {
                        setPage(page + 1)
                    }}
                    children="load more"
                />
            </main>
        </>
    )
}

export default Home;