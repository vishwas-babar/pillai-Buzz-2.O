import React, { useEffect, useState } from "react";
import { SearchComp, PostCard } from "../components/index.js";
import postService from "../services/PostService.js";
import useDetectScroll, { Axis } from "@smakss/react-scroll-direction";
import UserSearch from "../components/UserSearch.jsx";
import userService from "../services/UserService.js";


function Search() {
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("posts");

  const [noSearchedItem, setNoSearchedItem] = useState(false);

  const [searchedPosts, setSearchedPosts] = useState(new Array());
  const [searchedUsers, setSearchedUsers] = useState(new Array());

  const [searchCompDisplay, setSearchCompDisplay] = useState(true);

  const { scrollDir, scrollPosition } = useDetectScroll({
    axis: Axis.Y,
    thr: 100,
  });

  useEffect(() => {
    if (scrollDir === "down") {
      setSearchCompDisplay(false);
    } else if (scrollDir === "up") {
      setSearchCompDisplay(true);
    }
  }, [scrollDir]);

  useEffect(() => {
    console.log("search text: ", searchText);
    console.log("search type: ", searchType);
    const timerId = setTimeout(() => {
      if (searchType === "users") {
        // perform search operation for users
        performSearchOperationForUsers();
      } else if (searchType === "posts") {
        performSearchOperation();
      }
      performSearchOperation();
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchText, searchType]);

  const performSearchOperationForUsers = () => {
    const users = userService.searchUsers(searchText)
      .then(res => {
        console.log(res);
        setSearchedUsers(res.users);

        if (res.users.length === 0) {
          setNoSearchedItem(true);
        }
        else {
          setNoSearchedItem(false);
        }
      })
      .catch(err => {
        console.log("failed to search the users: ", err)
      })
  }

  const performSearchOperation = () => {
    if (!searchText.trim() || searchType === "users") {
      return;
    }

    postService
      .searchPosts(searchText)
      .then((res) => {
        console.log(res);
        setSearchedPosts(res.posts);
        // console.log(searchedPosts)
        if (res.posts.length === 0) {
          setNoSearchedItem(true);
        }else {
          setNoSearchedItem(false);
        }
      })
      .catch((error) => {
        console.log("failed to search the posts: ", error);
      });
  };

  return (
    <div className=" w-full">
      <div
        className={`w-fit sm:w-fit  overflow-hidden m-auto rounded-md px-12 bg-slate-300 py-5 fixed z-50 left-1/2 translate-x-[-50%] transition-all duration-500 dark:bg-gray-900 dark:border dark:border-gray-600 ${searchCompDisplay ? "" : " opacity-0"}`}
      >
        <SearchComp
          className="w-[400px] sm:w-[500px] "
          searchText={searchText}
          searchType={searchType}
          setSearchType={setSearchType}
          setSearchText={setSearchText}
          performSearchOperation={performSearchOperation}
        />
      </div>

      <main
        className="flex flex-col min-h-screen items-center h-fit shadow-md shadow-black mx-auto rounded-lg
    smm:w-[70%] sm:w-[60%] md:w-[55%] lg:w-[40%] mt-24  px-6"
      >
        {noSearchedItem ? (
          <h1 className="h-full w-full mt-52 flex items-center justify-center dark:text-slate-300 text-gray-950">
            No searched item found!
          </h1>
        ) : (<><div className="mt-28 w-full">
          {(searchType === 'posts') && searchedPosts.length !== 0 &&
            searchedPosts?.map((post) => (
              <PostCard
                key={post?._id}
                authorDetails={post?.authorDetails}
                _id={post?._id}
                commentsCount={post?.commentsCount}
                likesCount={post?.likesCount}
                coverImage={post?.coverImage}
                reads={post?.reads}
                title={post?.title}
              />
            ))}
        </div>

        <div className="w-full">
          {(searchType === 'users') && <UserSearch users={searchedUsers} />}
        </div></>)}
      </main>
    </div>
  );
}

export default Search;
