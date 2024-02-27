import profilepng from '../assets/user.png';
import newsimg from '../assets/news.jpeg';
import { useState } from 'react';

function PostReadComp(params) {

    const [post, setPost] = useState({
        name: "vishwas babar",
        userid: "vishwas_vb9",
        date: "22 feb 2024",
        heading: "whats happening in pillai! the big secret",
        description: "in the pillai college nothing is happening as usual just attendig the reggural lectures and going to college this is my shedule and nothing else"
    })


    return (
        <main className="w-full h-fit pt-4 pb-20 px-3 mb-16 sm:w-3/4 sm:mx-auto md:w-3/5 lg:w-1/2 overflow-x-hidden">
            <div className="mt-6 break-words px-4 text-center font-heading text-3xl font-extrabold text-slate-900 md:mt-10 md:px-5 md:text-4xl lg:px-8 xl:px-20 xl:text-5xl mb-8 md:mb-14">
                <h1 id="heading" className="text-3xl my-6 font-bold">{post.heading}</h1>
            </div>
            <div
                id="author-div"
                className="flex items-center gap-2 w-full justify-center"
            >
                {/* <img class="size-9 rounded-full" src="../public/images/user.png" alt=""> */}
                <img
                    id="author-profile-photo"
                    className="size-9 rounded-full"
                    src={profilepng}
                    alt=""
                />
                <span id="author" className="text-[20px]" >{post.name}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <span id="post-date" >{post.date}</span>
            </div>
            <div className="w-full h-fit rounded-md overflow-hidden my-5 border border-black shadow-custom-shadow-1 flex justify-center">
                {/* <img src="../public/images/news.jpeg" alt=""> */}
                <img id="post-cover-image" src={newsimg} alt="" />
            </div>
            <div id="description" className="">{post.description}</div>
        </main>

    )
}


export default PostReadComp;