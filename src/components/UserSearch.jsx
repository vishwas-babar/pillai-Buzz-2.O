import React from 'react'
import { useNavigate } from "react-router-dom";

function UserSearch({ users = [] }) {

    const navigate = useNavigate();

    return (
        <div className="w-full py-0 px-0 bg-white border border-gray-200 rounded-lg shadow sm:py-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map(user => (
                        <li key={user?._id}
                            onClick={() => navigate(`/user/${user?._id}`)}
                            className="py-3 sm:py-4 dark:hover:bg-gray-700 transition-all duration-200 ">
                            <div className="flex items-center pl-2">
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={user?.profilePhoto}
                                        alt="Neil image"
                                    />
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {user?.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        @{user?.userId}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default UserSearch