import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ProfileCard,
  ProfileSkeleton,
  PostCard,
  ErrorComp,
} from "../components/index.js";
import userService from "../services/UserService.js";
import { useQuery } from "@tanstack/react-query";
import postService from "../services/PostService.js";
import PostSkeleton from "../components/PostSkeleton.jsx";

function Profile() {
  const { userData, status } = useSelector((state) => state.user);
  const { user_id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState(null);

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
    setProfile(data);
  }, [data]);

  useEffect(() => {
    setPosts(userPost?.posts);
    console.log("post are: ", userPost?.posts);
    console.log("this is data from query: ", userPost);
  }, [userPost]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  if (!userData)
    return (
      <div className=" text-center mt-36 text-lg w-full">
        You need to login first
      </div>
    );

  if (isError || isPostError) {
    return <ErrorComp />;
  }

  return (
    <main
      className="flex flex-col items-center w-full mt-2 min-h-full shadow-md shadow-black mx-auto rounded-lg
    smm:w-[70%] sm:w-[60%] md:w-[55%] lg:w-[40%]"
    >
      {!isLoading ? (
        <ProfileCard
          name={profile?.name}
          userId={profile?.userId}
          profilePhoto={profile?.profilePhoto}
          _id={profile?._id}
          role={"full stack developer"}
          followersCount={profile?.followers.length}
          followingCount={profile?.following.length}
          subscribers={profile?.subscribers}
        />
      ) : (
        <ProfileSkeleton />
      )}

      <hr className="h-px my-1 bg-black border-0 dark:bg-gray-700" />

      <div
        id="post-container"
        class="sm:w-70% h-full rounded-sm mx-auto flex flex-col flex-grow items-center gap-4 
        w-full px-6"
      >
        {isPostLoading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : (
          posts?.map((post) => (
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
  );
}

export default Profile;
