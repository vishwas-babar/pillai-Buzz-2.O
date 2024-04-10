import React from "react";

function ProfileSkeleton() {
  return (
    <div
      role="status"
      className="animate-pulse flex md:flex-row flex-col min-h-52 w-full my-2 sm:my-9 items-center border-b"
    >
      <div className="flex md:size-[150px] size-[100px] ml-2  items-center justify-center aspect-square bg-gray-300 rounded-full dark:bg-gray-300"></div>
      <div className="w-full h-full p-7 flex justify-between">
        <div className="w-fit">
          <div className="h-6 bg-gray-200 w-40 rounded-full dark:bg-gray-300 text-[22px] sm:mt-0 font-serif leading-4 mb-1 text-nowrap" />
          <div className="h-3 bg-gray-200 w-32 rounded-full dark:bg-gray-300 mb-2.5 text-[14px] mt-0 text-nowrap" />
          <div className="h-3 bg-gray-200 w-40 rounded-full dark:bg-gray-300 mb-2.5 text-[18px] leading-7 " />
          <div className="flex gap-5 mt-2 sm:mt-11">
            <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-300 w-28 mb-2.5" />
            <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-300 w-28 mb-2.5" />
          </div>
        </div>
        <div>
          <div>
            <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-300 w-16 mb-2.5 btn-primary flex flex-nowrap items-center gap-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSkeleton;
