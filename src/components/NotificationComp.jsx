import { useSelector } from "react-redux";
import { Button } from './index.js'
import { useNavigate } from "react-router-dom";

function Notification({ type, userId, user_id, post_id, readStatus, message, toggleNotificationComp }) {

    const navigate = useNavigate();

    switch (type) {
        case 'createPost':
            return (
                <div
                    className="p-4 flex cursor-pointer justify-between bg-white text-gray-900 shadow rounded mb-2 transition-all duration-200 hover:scale-[1.03] items-center"
                    onClick={() => {
                        navigate(`/post/${post_id}`);

                        return toggleNotificationComp();
                    }}
                >
                    {/* <i className="fas fa-user-plus mr-2"></i> */}
                    <span>
                        <span 
                            className=" font-bold underline"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/user/${user_id}`);

                                return toggleNotificationComp();
                            }}
                        >{userId} </span>
                        {message}
                    </span>
                </div>
            );
        case 'likePost':
            return (
                <div
                    className="p-4 flex cursor-pointer justify-between bg-white text-gray-900 shadow rounded mb-2 transition-all duration-200 hover:scale-[1.03] items-center"
                    onClick={() => {
                        navigate(`/post/${post_id}`);

                        return toggleNotificationComp();
                    }}
                >
                    {/* <i className="fas fa-user-plus mr-2"></i> */}
                    <span>
                        <span 
                            className=" font-bold underline"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/user/${user_id}`);

                                return toggleNotificationComp();
                            }}
                        >{userId} </span>
                        {message}
                    </span>
                </div>
            );
        case 'likeComment':
            return (
                <div
                    className="p-4 flex cursor-pointer justify-between bg-white text-gray-900 shadow rounded mb-2 transition-all duration-200 hover:scale-[1.03] items-center"
                    onClick={() => {
                        navigate(`/post/${post_id}`);

                        return toggleNotificationComp();
                    }}
                >
                    {/* <i className="fas fa-user-plus mr-2"></i> */}
                    <span>
                        <span 
                            className=" font-bold underline"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/user/${user_id}`);

                                return toggleNotificationComp();
                            }}
                        >{userId} </span>
                        {message}
                    </span>
                </div>
            );
        case 'commentPost':
            return (
                <div
                    className="p-4 flex cursor-pointer justify-between bg-white text-gray-900 shadow rounded mb-2 transition-all duration-200 hover:scale-[1.03] items-center"
                    onClick={() => {
                        navigate(`/post/${post_id}`);

                        return toggleNotificationComp();
                    }}
                >
                    {/* <i className="fas fa-user-plus mr-2"></i> */}
                    <span>
                        <span 
                            className=" font-bold underline"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/user/${user_id}`);

                                return toggleNotificationComp();
                            }}
                        >{userId} </span>
                        {message}
                    </span>
                </div>
            );
        default:
            return null;
    }
}

function NotificationComp({ isNotificationCompOpen, className = '', toggleNotificationComp }) {

    const notifications = useSelector(state => state.user?.userData?.notifications)

    return (
        <div className={`h-screen p-4 bg-gray-200 sm:w-1/2 w-full z-10 fixed right-0 overflow-auto ${isNotificationCompOpen ? '' : 'hidden'} ${className}`}>
            {notifications?.map(notification =>
                <Notification
                    key={notification._id}
                    type={notification?.notificationType}
                    userId={notification?.userId}
                    user_id={notification?.user_id}
                    post_id={notification?.post_id}
                    message={notification?.message}
                    readStatus={notification?.readStatus}
                    toggleNotificationComp={toggleNotificationComp}
                />
            )}
        </div>
    )
}

export default NotificationComp;