import { useState, useEffect } from 'react'
import Layout from './components/Layout.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from 'react-router-dom';

import { Home, Bookmarks, TopNavBar, Post, Profile, Login } from './components/index.js';
import { PostEditor } from './pages/index.js'
import { removeAllPosts } from './store/PostsSlice.js';
import { useDispatch } from 'react-redux';
import userService from './services/UserService.js';
import { loginUser, getUserStart, getUserFailure, getUserSuccess } from './store/userSlice.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />} >
        <Route path='/' element={<Home />} />
        <Route path='/bookmarks' element={<Bookmarks />} />
        <Route path='/post' element={<Post />} />
        <Route path='/create' element={<PostEditor />} />
        <Route path='/user/:user_id' element={<Profile />} />
        <Route path='/post/:id' element={<Post />} />
      </Route>
      <Route path='/vishwas' element={<TopNavBar />} />
      <Route path='/login' element={<Login />} />
    </>
  )
)

const queryClient = new QueryClient();

function App() {

  const dispatch = useDispatch();
  dispatch(removeAllPosts())

  useEffect(() => {
    dispatch(getUserStart)
    userService.getCurrentUser()
      .then(res => {
        dispatch(loginUser(res.data?.data))
        dispatch(getUserSuccess())
      })
      .catch(error => {
        console.log('error occured, ', error)
        dispatch(getUserFailure(error.message))
      })
  }, [])


  return (
    <>
      <QueryClientProvider client={queryClient} >
        <RouterProvider router={router} />
      </QueryClientProvider>
     
    </>
  )
}

export default App
