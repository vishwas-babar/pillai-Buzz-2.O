import React from 'react'

function CommentModal() {
    return (
        <div
            id="comment-modal"
            className="fixed top-36 z-40 h-full w-full flex-col overflow-hidden scroll-smooth rounded-lg bg-white sm:left-1/2 sm:w-3/4 sm:translate-x-[-50%] md:w-2/3 lg:w-1/2"
        >
            {/* take comment input */}
            <div className="flex h-fit w-full items-center gap-2 p-3">
                <label htmlFor="comment" />
                <input
                    id="comment-input"
                    role="text"
                    type="text"
                    className="w-full rounded-md border p-2 text-[16px]"
                    placeholder="add your thoughts here"
                />
                <a
                    id="add-comment-btn"
                    className="btn-primary flex items-center justify-center"
                >
                    <i className="bx bx-send text-[20px]" />
                </a>
            </div>

            <div id="comment-section" className="h-full w-full border-t p-2 flex flex-col gap-2">
                <CommentModal />
            </div>
        </div>

    )
}

export default CommentModal 