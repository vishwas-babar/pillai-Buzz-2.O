import { useState, useEffect, useCallback } from "react";
import Layout from "./components/Layout.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import {
  Home,
  Bookmarks,
  TopNavBar,
  Post,
  Profile,
  Login,
} from "./components/index.js";
import { PostEditor, EditPost } from "./pages/index.js";
import { removeAllPosts, addArrOfPosts } from "./store/PostsSlice.js";
import { useDispatch } from "react-redux";
import userService from "./services/UserService.js";
import {
  loginUser,
  getUserStart,
  getUserFailure,
  getUserSuccess,
} from "./store/userSlice.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import postService from "./services/PostService.js";

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <Home
                incrementPage={() => setPage(page + 1)}
                error={error}
                loading={loading}
                isEnd={isEnd}
              />
            }
          />
          <Route path="/post" element={<Post />} />
          <Route path="/create" element={<PostEditor />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/user/:user_id" element={<Profile />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Route>
        <Route path="/vishwas" element={<TopNavBar />} />
        <Route path="/login" element={<Login />} />
      </>,
    ),
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadMorePostForHomePage();
    }, 2000); // :todo
  }, [page]);

  function loadMorePostForHomePage() {
    setError(false);
    setLoading(true);
    postService
      .getPostForHomePage(page)
      .then((res) => {
        setLoading(false);
        dispatch(addArrOfPosts(res.posts));

        if (res.posts?.length === 0) {
          setIsEnd(true);
        }
      })
      .catch((error) => {
        setError(true);
      });
  }

  // dispatch(removeAllPosts())

  useEffect(() => {
    dispatch(getUserStart());
    userService
      .getCurrentUser()
      .then((res) => {
        dispatch(loginUser(res.data?.data));
        dispatch(getUserSuccess());
      })
      .catch((error) => {
        console.log("error occured, ", error);
        dispatch(getUserFailure(error.message));
      });
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}

export default App;
