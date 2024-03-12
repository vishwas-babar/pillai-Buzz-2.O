import React from "react";

function ProfileCard({
  name,
  userId,
  profilePhoto,
  _id,
  role,
  followersCount,
  followingCount,
  loadStatus,
}) {
  return (
    <>
      {/* profile container */}
      <div className="flex md:flex-row flex-col min-h-52 w-full my-2 sm:my-9 items-center border-b ">
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
              className="text-[22px] sm:mt-0 font-serif leading-4 mb-0 text-nowrap"
            >
              {name}
            </h2>
            <span id="user-id" className="text-[14px] mt-0 text-nowrap">
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
              <button className="btn-primary flex flex-nowrap items-center gap-1">
                <i className="bx bx-edit-alt text-[17px]" />
                <span className="hidden md:inline-block">Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
