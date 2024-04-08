import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../services/UserService";

function ProfileCard({
  name,
  userId,
  profilePhoto,
  _id,
  role,
  followersCount,
  followingCount,
  subscribers = [],
  loadStatus,
}) {
  const userData = useSelector((state) => state.user.userData);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isSubscriber, setIsSubscriber] = useState(false);

  useEffect(() => {
    if (userData._id === _id) {
      setIsAuthor(true);
    }

    if (subscribers.includes(userData._id)) {
      setIsSubscriber(true);
    }
  }, [_id, userData]);

  const toggleNotification = () => {
    setIsSubscriber((prev) => !prev);
    userService
      .notificationToggle(_id)
      .then((res) => {
        //
      })
      .catch((error) => {
        setIsSubscriber((prev) => !prev);
      });
  };

  return (
    <>
      {/* profile container */}
      <div className="flex md:flex-row flex-col min-h-52 w-full my-2 sm:my-9 items-center border-b dark:text-slate-300 ">
        <div className="md:size-[200px] size-[150px] flex items-center rounded-full overflow-hidden ml-7">
          <img
            id="profile-photo"
            src={profilePhoto}
            className="rounded-full"
            alt=""
          />
        </div>
        <div className=" w-full h-full p-7 flex justify-between">
          <div className=" w-fit">
            <h2
              id="user-name"
              className="text-[22px] sm:mt-0 font-serif leading-4 mb-0 text-nowrap dark:text-slate-200"
            >
              {name}
            </h2>
            <span id="user-id" className="text-[14px] mt-0 text-nowrap dark:text-gray-300">
              @{userId}
            </span>
            <p id="role" className="text-[18px] leading-7">
              {role}
            </p>
            <div className="flex gap-5 mt-2 sm:mt-11">
              <p className=" text-nowrap">{followersCount} Followers</p>
              <p className=" text-nowrap">{followingCount} Following</p>
            </div>
          </div>
          <div>
            <div>
              {isAuthor ? (
                <button className="btn-primary flex flex-nowrap items-center gap-1">
                  <i className="bx bx-edit-alt text-[17px]" />
                  <span className="hidden md:inline-block">Edit</span>
                </button>
              ) : (
                <button
                  onClick={toggleNotification}
                  className={` flex-nowrap size-10 flex justify-center aspect-square rounded-full items-center gap-1 ${isSubscriber ? "bg-custom-primary text-white" : "border border-gray-500"}`}
                >
                  <i className="bx bx-bell text-[23px]"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
