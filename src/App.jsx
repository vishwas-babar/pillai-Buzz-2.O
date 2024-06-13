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
  Protected,
} from "./components/index.js";
import { PostEditor, EditPost, Search, Signup } from "./pages/index.js";
import { addArrOfPosts } from "./store/PostsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import userService from "./services/UserService.js";
import {
  loginUser,
  getUserStart,
  getUserFailure,
  getUserSuccess,
} from "./store/userSlice.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import postService from "./services/PostService.js";

const queryClient = new QueryClient();

function App({ setLoginCount }) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const userData = useSelector((state) => state?.user?.userData);

  useEffect(() => {
    // console.log("this is state of user: ", userData);
  }, [userData]);

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
                page={page}
                loadMorePostForHomePage={loadMorePostForHomePage}
              />
            }
          />
          <Route path="/post" element={<Post />} />
          <Route
            path="/create"
            element={
              <Protected authentication={true}>
                <PostEditor />
              </Protected>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <Protected authentication={true}>
                <Bookmarks />
              </Protected>
            }
          />
          <Route path="/user/:user_id" element={<Profile />} />
          <Route path="/post/:id" element={<Post />} />
          <Route
            path="/edit-post/:id"
            element={
              <Protected authentication={true}>
                <EditPost />
              </Protected>
            }
          />
          <Route path="/search" element={<Search />} />
        </Route>
        {/* <Route
          path="/vishwas"
          element={
            <Protected authentication={true}>
              <TopNavBar />
            </Protected>
          }
        /> */}
        <Route
          path="/login"
          element={<Login setLoginCount={setLoginCount} />}
        />
        <Route
          path="/signup"
          element={<Signup setLoginCount={setLoginCount} />}
        />
      </>,
    ),
  );

  useEffect(() => {
    if (page != 1) {
      setLoading(true);
      loadMorePostForHomePage();
    }
  }, [page]);

  useEffect(() => {
    console.log("app component mounted again")
    // setLoading(true)
    // loadMorePostForHomePage()
  }, [])

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
        // console.log("error occured, ", error);
        dispatch(getUserFailure(error.message));
      });
  }, []);
  

  // for the dark mode 
  useEffect(() => {
    const html = document.querySelector("html");
    const theme = localStorage.getItem("theme");
    html.classList.add(theme);
    if (theme === "dark") {
      html.classList.add("dark-mode-for-description");
    } else {
      
    }
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
