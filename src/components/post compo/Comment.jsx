import React from 'react'

function Comment({userName, userId, profilePhoto, }) {
    return (
        <div
            id="comment-section"
            className="h-full w-full border-t p-2 flex flex-col gap-2"
        >
            <div
                id="comment"
                className="flex flex-col"
                data-comment-id="dasfadf56ygvvb5er"
            >
                <div className="flex gap-2">
                    <img className="size-10 rounded-full" src={profilePhoto} alt="" />
                    <div className="rounded-md rounded-tl-none bg-slate-200 px-2 py-3 w-full flex flex-col gap-3">
                        <div className="flex items-center justify-start">
                            <div className="flex flex-col ml-2">
                                <h2
                                    id="commented-user-name"
                                    className="leading-3 text-[16px] font-[500]"
                                >
                                   {userName}
                                </h2>
                                <span id="commented-user-id" className="leading-3 mt-1 text-[12px]">
                                    @{userId}
                                </span>
                            </div>
                        </div>
                        <div className="text-[15px]" id="comment-content">
                            this aticle is so helpfull i am waiting for next one
                        </div>
                    </div>
                </div>
                <a
                    id="comment-like-btn"
                    className="ml-[55px] w-fit flex items-center gap-3 cursor-pointer"
                >
                    <span className="text-[14px]">Like</span>
                    <div className="size-1 rounded-full bg-black" />
                    <div className="flex items-center justify-center gap-1">
                        <img
                            className="size-[18px] transition-all duration-300 ease-linear scale-on-click"
                            src="/images/blue-like-ic.png"
                            alt=""
                        />
                        <span id="likes-count" className="text-[12px]">
                            0
                        </span>
                    </div>
                </a>
            </div>
        </div>

    )
}

export default Comment