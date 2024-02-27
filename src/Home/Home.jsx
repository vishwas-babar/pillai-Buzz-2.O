import PostCard from "./PostCard";

import { useEffect, useState } from "react";
import axios from 'axios';


function Home(params) {

    const [page, setPage] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [postsForHomePage, setPostForHomePage] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMorePostForHomePage();
    }, [])

    function loadMorePostForHomePage() {

        console.log('getting the data from backend')
        axios.get(`http://127.0.0.1:8000/api/post/load?page=${page}&postsPerPage=${postsPerPage}`)
            .then((res) => {
                console.log(res.data);
                setPage(page + 1);
                const posts = res.data.posts;
                setPostForHomePage(posts);
                setLoading(false);
                // removePostLoadingSkeleton();


                // add post data to page
                // posts.forEach(post => {
                //     // addPostToPage(post);
                // });

                // set the event listeners to all profile field and post field 
                // setEventListenersToPosts(document.querySelectorAll('#post'));

            })
            .catch((error) => {
                console.log('error occured');
                console.log(error);
            })
    }


    if (loading) {
        return <div className=" mt-44 bg-red text-white">Loading...</div>
    }

    return (
        <>
            <main className=" flex flex-col items-center mt-2 h-fit shadow-md shadow-black mx-auto rounded-lg
    smm:w-[70%] sm:w-[60%] md:w-[55%] lg:w-[40%]  px-6 ">
                <div id="post-container" className=" h-fit rounded-sm mx-auto flex flex-col items-center gap-4
        w-full pt-4">
                
                    {postsForHomePage.map((post) => {

                        return <PostCard
                            key={post._id}
                            authorDetails={post.authorDetails}
                            _id={post._id}
                            commentsCount={post.commentsCount}
                            likesCount={post.likesCount}
                            coverImage={post.coverImage}
                            reads={post.reads}
                            title={post.title}
                        />
                    })}
                </div>
            </main>
        </>
    )
}

export default Home;