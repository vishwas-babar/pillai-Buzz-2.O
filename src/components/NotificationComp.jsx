function Notification({ type, user }) {
    switch(type) {
        case 'follow':
            return (
                <div className="p-4 bg-blue-100 text-blue-700 shadow rounded mb-2 flex items-center">
                    <i className="fas fa-user-plus mr-2"></i>
                    <span>@{user} started following you</span>
                </div>
            );
        case 'newPost':
            return (
                <div className="p-4 bg-green-100 text-green-700 shadow rounded mb-2 flex items-center">
                    <i className="fas fa-plus-circle mr-2"></i>
                    <span>@{user} created a new post</span>
                </div>
            );
        case 'comment':
            return (
                <div className="p-4 bg-yellow-100 text-yellow-700 shadow rounded mb-2 flex items-center">
                    <i className="fas fa-comment-dots mr-2"></i>
                    <span>@{user} commented on your post</span>
                </div>
            );
        case 'like':
            return (
                <div className="p-4 bg-red-100 text-red-700 shadow rounded mb-2 flex items-center">
                    <i className="fas fa-heart mr-2"></i>
                    <span>@{user} liked your post</span>
                </div>
            );
        default:
            return null;
    }
}

function NotificationComp({ isNotificationCompOpen, className='' }) {
    const notifications = [
        { type: 'follow', user: 'user1' },
        { type: 'newPost', user: 'user2' },
        { type: 'comment', user: 'user3' },
        { type: 'like', user: 'user4' },
 ];

    return (
        <div className={`h-screen bg-gray-200 sm:w-1/2 w-full z-10 fixed right-0 overflow-auto ${isNotificationCompOpen ? '' : 'hidden'} ${className}`}>
            {notifications.map((notification, index) => 
                <Notification key={index} type={notification.type} user={notification.user} />
            )}
        </div>
    )
}

export default NotificationComp;