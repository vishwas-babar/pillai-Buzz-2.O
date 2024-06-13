import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ProfileCard,
  ProfileSkeleton,
  PostCard,
  ErrorComp,
  EditProfileComp,
} from "../components/index.js";
import userService from "../services/UserService.js";
import { useQuery } from "@tanstack/react-query";
import postService from "../services/PostService.js";
import PostSkeleton from "../components/PostSkeleton.jsx";

function Profile() {
  const { userData, status } = useSelector((state) => state.user);
  const authStatus = useSelector((state) => state.user.status);
  const authStatusLoading = useSelector((state) => state.user.loading);

  const { user_id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState(null);

  const [editFormViewStatus, setEditFormViewStatus] = useState(false)

  const toggleEditFormViewStatus = () => {
    setEditFormViewStatus(prev => !prev)
  }

  const { isPending, error, data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      userService
        .getUserDetails(user_id)
        .then((res) => {
          return res.data?.data;
        })
        .catch((error) => {
          throw error;
        }),
  });

  useEffect(() => {
    setProfile(data);
  }, [data]);

  const {
    isLoading: isPostLoading,
    data: userPost,
    isError: isPostError,
  } = useQuery({
    queryKey: ["userPost"],
    queryFn: () =>
      postService
        .getUserPosts(user_id)
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        }),
  });



  useEffect(() => {
    setPosts(userPost?.posts);
    // console.log("post are: ", userPost?.posts);
    // console.log("this is data from query: ", userPost);
  }, [userPost]);

  if (isError || isPostError) {
    return <ErrorComp statusCode={500} />;
  }

  if (!authStatusLoading && !authStatus) {
    return (
      <div className=" text-center pt-64 text-2xl w-full dark:text-gray-400">
        You need to login first
      </div>
    );
  }



  // if (isLoading) {
  //   return (
  //     <div className="h-screen w-full flex items-center justify-center text-3xl">
  //       Loading...
  //     </div>
  //   )
  // }

  useEffect(() => {
    console.log(profile)
  }, [profile])

  return (
    <>

      <main
        className="flex flex-col items-center w-full mt-24 min-h-full shadow-md shadow-black mx-auto rounded-lg
    smm:w-[70%] sm:w-[60%] md:w-[55%] lg:w-[40%]"
      >
        {profile ? (
          <ProfileCard
            key={profile?._id}
            name={profile?.name}
            userId={profile?.userId}
            profilePhoto={profile?.profilePhoto}
            _id={profile?._id}
            role={profile?.role ? profile.role : "-"}
            followersCount={profile?.followers.length}
            followingCount={profile?.following.length}
            subscribers={profile?.subscribers}
            toggleEditFormViewStatus={toggleEditFormViewStatus}
          />
        ) : (
          <ProfileSkeleton />
        )}

        <hr className="h-px my-1 bg-black border-0 dark:bg-gray-800" />

        <div
          id="post-container"
          className="sm:w-70% h-full rounded-sm mx-auto flex flex-col flex-grow items-center gap-4 
        w-full px-6"
        >
          {isPostLoading && isLoading ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : (posts?.length === 0 ? (<h1 className=" h-10 flex items-start text-xl dark:text-gray-400">Don't have any posts!</h1>) :
            posts?.map((post, index) => (

              <PostCard
                key={post?._id}
                authorDetails={post?.authorDetails}
                _id={post?._id}
                commentsCount={post?.commentsCount}
                likesCount={post?.likesCount}
                reads={post?.reads}
                title={post?.title}
                coverImage={post?.coverImage}
              />

            ))
          )}
        </div>

      </main>
      {!isLoading && <EditProfileComp
        name={profile?.name}
        userId={profile?.userId}
        profilePhoto={profile?.profilePhoto}
        _id={profile?._id}
        role={profile?.role}
        loadStatus={isLoading}
        viewStatus={editFormViewStatus}
        toggleEditFormViewStatus={toggleEditFormViewStatus}
      />}
    </>
  );
}

export default Profile;
