import { useSelector } from "react-redux";
import { Button } from "./index.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Notification({
    type,
    userId,
    user_id,
    post_id,
    readStatus,
    message,
    createdAt,
    toggleNotificationComp,
}) {
    const navigate = useNavigate();
    const [createdDate, setCreatedDate] = useState("");

    useEffect(() => {
        console.log(createdAt)
        const date = new Date(createdAt)

        const formatedDate = date.toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true
        })

        setCreatedDate(formatedDate)
    }, [createdAt])

    switch (type) {
        case "createPost":
            return (
                // <div
                //     className="p-4 flex cursor-pointer justify-between bg-white text-gray-900 shadow rounded mb-2 transition-all duration-200 hover:scale-[1.03] items-center"
                //     onClick={() => {
                //         navigate(`/post/${post_id}`);

                //         return toggleNotificationComp();
                //     }}
                // >
                //     {/* <i className="fas fa-user-plus mr-2"></i> */}
                //     <span>
                //         <span
                //             className=" font-bold underline"
                //             onClick={(e) => {
                //                 e.stopPropagation();
                //                 navigate(`/user/${user_id}`);

                //                 return toggleNotificationComp();
                //             }}
                //         >
                //             {userId}{" "}
                //         </span>
                //         {message}
                //     </span>
                // </div>

                <Notification3
                    message={message}
                    userId={userId}
                    user_id={user_id}
                    readStatus={readStatus}
                    toggleNotificationComp={toggleNotificationComp}
                    post_id={post_id}
                    date={createdDate}
                />
            );
        case "likePost":
            return (
                // <div
                //     className="p-4 flex cursor-pointer justify-between bg-white text-gray-900 shadow rounded mb-2 transition-all duration-200 hover:scale-[1.03] items-center"
                //     onClick={() => {
                //         navigate(`/post/${post_id}`);

                //         return toggleNotificationComp();
                //     }}
                // >
                //     {/* <i className="fas fa-user-plus mr-2"></i> */}
                //     <span>
                //         <span
                //             className=" font-bold underline"
                //             onClick={(e) => {
                //                 e.stopPropagation();
                //                 navigate(`/user/${user_id}`);

                //                 return toggleNotificationComp();
                //             }}
                //         >
                //             {userId}{" "}
                //         </span>
                //         {message}
                //     </span>
                // </div>
                <Notification1
                    message={message}
                    userId={userId}
                    user_id={user_id}
                    readStatus={readStatus}
                    toggleNotificationComp={toggleNotificationComp}
                    post_id={post_id}
                    date={createdDate}
                />
            );
        case "likeComment":
            return (
                // <div
                //     className="p-4 flex cursor-pointer justify-between bg-white text-gray-900 shadow rounded mb-2 transition-all duration-200 hover:scale-[1.03] items-center"
                //     onClick={() => {
                //         navigate(`/post/${post_id}`);

                //         return toggleNotificationComp();
                //     }}
                // >
                //     {/* <i className="fas fa-user-plus mr-2"></i> */}
                //     <span>
                //         <span
                //             className=" font-bold underline"
                //             onClick={(e) => {
                //                 e.stopPropagation();
                //                 navigate(`/user/${user_id}`);

                //                 return toggleNotificationComp();
                //             }}
                //         >
                //             {userId}{" "}
                //         </span>
                //         {message}
                //     </span>
                // </div>

                <Notification3
                    message={message}
                    userId={userId}
                    user_id={user_id}
                    readStatus={readStatus}
                    toggleNotificationComp={toggleNotificationComp}
                    post_id={post_id}
                    date={createdDate}
                />
            );

        case "commentPost":
            return (
                // <div
                //     className="p-4 flex cursor-pointer justify-between bg-white text-gray-900 shadow rounded mb-2 transition-all duration-200 hover:scale-[1.03] items-center"
                //     onClick={() => {
                //         navigate(`/post/${post_id}`);

                //         return toggleNotificationComp();
                //     }}
                // >
                //     {/* <i className="fas fa-user-plus mr-2"></i> */}
                //     <span>
                //         <span
                //             className=" font-bold underline"
                // onClick={(e) => {
                //     e.stopPropagation();
                //     navigate(`/user/${user_id}`);

                //     return toggleNotificationComp();
                // }}
                //         >
                //             {userId}{" "}
                //         </span>
                //         {message}
                //     </span>
                // </div>

                <Notification3
                    message={message}
                    userId={userId}
                    user_id={user_id}
                    readStatus={readStatus}
                    toggleNotificationComp={toggleNotificationComp}
                    post_id={post_id}
                    date={createdDate}
                />
            );
        default:
            return null;
    }
}

function NotificationComp({
    isNotificationCompOpen,
    className = "",
    toggleNotificationComp,
}) {
    const notifications = useSelector(
        (state) => state.user?.userData?.notifications,
    );

    return (
        <div
            className={`h-screen p-4 bg-gray-200 sm:w-1/2 w-full z-40 fixed right-0 overflow-auto ${isNotificationCompOpen ? "" : "hidden"} ${className}`}
        >


            {/* <Notification3 />
            <Notification3 /> */}

            {notifications?.map((notification) => (
                <Notification
                    key={notification?._id}
                    type={notification?.notificationType}
                    userId={notification?.userId}
                    user_id={notification?.user_id}
                    post_id={notification?.post_id}
                    message={notification?.message}
                    readStatus={notification?.readStatus}
                    createdAt={notification?.createdAt}
                    toggleNotificationComp={toggleNotificationComp}
                />
            ))}
        </div>
    );
}


// notification for liked the post
function Notification1({ message, userId, user_id, readStatus, toggleNotificationComp, post_id, date }) {

    const navigate = useNavigate();

    return (
        <div>
            <div className="flex flex-col">
                {/* <div className="my-2 flex rounded-sm bg-transparent px-0 py-3 hover:bg-slate-50 md:px-4 dark:hover:bg-slate-900"> */}
                <div
                    onClick={() => {
                        navigate(`/post/${post_id}`);

                        return toggleNotificationComp();
                    }}
                    className="my-2 flex rounded-sm bg-transparent px-0 py-3 hover:bg-slate-50 md:px-4 transition-all duration-300">
                    <div className="flex w-[calc(100%-32px)]">
                        <div className="mr-4 flex h-8 w-8 flex-col items-center justify-center p-1 text-red-600">
                            <svg fill="none" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M16.01 2.25c-1.412-.02-2.882.395-4.012 1.56C10.86 2.647 9.375 2.25 8 2.25 4.627 2.25 1.25 5.048 1.25 9c0 3.822 2.445 7.01 4.875 9.184a22.421 22.421 0 0 0 3.51 2.572c.512.3.972.537 1.346.702.187.082.36.15.515.199.136.043.32.093.504.093.183 0 .368-.05.504-.093.154-.049.328-.117.515-.199.374-.165.834-.402 1.345-.702a22.423 22.423 0 0 0 3.511-2.572C20.305 16.01 22.75 12.822 22.75 9c0-3.962-3.384-6.7-6.74-6.75Z"></path></svg>
                        </div>
                        <div>
                            <div className="mb-2">
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/user/${user_id}`);

                                        return toggleNotificationComp();
                                    }}
                                    className="flex aspe flex-wrap gap-2 size-14 aspect-square rounded-full overflow-hidden">
                                    <img
                                        className=" w-full h-full"
                                        src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-700">
                                <span className="text-base font-semibold text-slate-700 dark:text-slate-700">
                                    <div>{userId}</div>
                                </span>{" "}
                                {message}
                            </p>
                            <p className="mt-3 text-sm text-slate-500 dark:text-slate-500">
                                {date}
                            </p>
                        </div>
                    </div>
                    <div className="flex w-8 flex-col items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    </div>
                </div>
                <div
                    role="separator"
                    aria-orientation="horizontal"
                    className="mx-0 h-px bg-slate-200 md:mx-3 dark:bg-slate-800"
                />
            </div>
        </div>

    )
}

// new post created notification
function Notification2({ message, userId, user_id, readStatus, toggleNotificationComp, post_id, date }) {

    const navigate = useNavigate();

    return (
        <div>
            <div className="flex flex-col">
                {/* <div className="my-2 flex rounded-sm bg-transparent px-0 py-3 hover:bg-slate-50 md:px-4 dark:hover:bg-slate-900"> */}
                <div
                    onClick={() => {
                        navigate(`/post/${post_id}`);

                        return toggleNotificationComp();
                    }}
                    className="my-2 flex rounded-sm bg-transparent px-0 py-3 hover:bg-slate-50 md:px-4 transition-all duration-300">
                    <div className="flex w-[calc(100%-32px)]">
                        <div className="mr-4 flex h-8 w-8 flex-col items-center justify-center p-1 text-blue-600">
                            <svg fill="none" viewBox="0 0 24 24" width={24} height={24}>
                                <path
                                    fill="currentColor"
                                    d="M9.25 1.75a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5ZM22.152 8.858a.75.75 0 0 0-1.061-1.06l-3.591 3.59-1.591-1.591a.75.75 0 1 0-1.06 1.06l2.12 2.122a.75.75 0 0 0 1.061 0l4.122-4.121ZM9.25 11.75a7.5 7.5 0 0 0-7.5 7.5v.25a2.75 2.75 0 0 0 2.75 2.75H14a2.75 2.75 0 0 0 2.75-2.75v-.25a7.5 7.5 0 0 0-7.5-7.5Z"
                                />
                            </svg>
                        </div>
                        <div>
                            <div className="mb-2">
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/user/${user_id}`);

                                        return toggleNotificationComp();
                                    }}
                                    className="flex aspe flex-wrap gap-2 size-14 aspect-square rounded-full overflow-hidden">
                                    <img
                                        className=" w-full h-full"
                                        src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-700">
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/user/${user_id}`);

                                        return toggleNotificationComp();
                                    }}
                                    className="text-base font-semibold text-slate-700 dark:text-slate-700">
                                    <div>{userId}</div>
                                </span>{" "}
                                {message}
                            </p>
                            <p className="mt-3 text-sm text-slate-500 dark:text-slate-500">
                                3 Feb 2023, 3:17 pm
                            </p>
                        </div>
                    </div>
                    <div className="flex w-8 flex-col items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    </div>
                </div>
                <div
                    role="separator"
                    aria-orientation="horizontal"
                    className="mx-0 h-px bg-slate-200 md:mx-3 dark:bg-slate-800"
                />
            </div>
        </div>

    )
}


// comment on post notification
function Notification3({ message, userId, user_id, readStatus, toggleNotificationComp, post_id, date }) {

    const navigate = useNavigate();

    return (
        <div>
            <div className="flex flex-col">
                {/* <div className="my-2 flex rounded-sm bg-transparent px-0 py-3 hover:bg-slate-50 md:px-4 dark:hover:bg-slate-900"> */}

                <div
                    onClick={() => {
                        navigate(`/post/${post_id}`);

                        return toggleNotificationComp();
                    }}
                    className="my-2 flex rounded-sm bg-transparent px-0 py-3 hover:bg-slate-50 md:px-4 transition-all duration-300">
                    <div className="flex w-[calc(100%-32px)]">
                        <div className="mr-4 flex h-8 w-8 flex-col items-center justify-center p-1 text-gray-600">

                            <svg fill="none" viewBox="0 0 20 20" width="20" height="20"><path stroke="currentColor" d="M13.333 8.75H7.5m3.333 2.917H7.5m-2.803-6.97A7.5 7.5 0 1 1 7.035 16.89a.885.885 0 0 0-.495-.064l-3.465.578a.417.417 0 0 1-.48-.48l.58-3.458a.886.886 0 0 0-.064-.496 7.503 7.503 0 0 1 1.586-8.274Z" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25"></path></svg>
                        </div>
                        <div>
                            <div className="mb-2">
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/user/${user_id}`);

                                        return toggleNotificationComp();
                                    }}
                                    className="flex aspe flex-wrap gap-2 size-14 aspect-square rounded-full overflow-hidden">
                                    <img
                                        className=" w-full h-full"
                                        src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-700">
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/user/${user_id}`);

                                        return toggleNotificationComp();
                                    }}
                                    className="text-base font-semibold text-slate-700 dark:text-slate-700">
                                    <div>{userId}</div>
                                </span>{" "}
                                {message}
                            </p>
                            <p className="mt-3 text-sm text-slate-500 dark:text-slate-500">
                                {date}
                            </p>
                        </div>
                    </div>
                    <div className="flex w-8 flex-col items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    </div>
                </div>
                <div
                    role="separator"
                    aria-orientation="horizontal"
                    className="mx-0 h-px bg-slate-200 md:mx-3 dark:bg-slate-800"
                />
            </div>
        </div>

    )
}

export default NotificationComp;
