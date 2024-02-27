import { useState } from 'react'
import Layout from './layout/Layout'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from 'react-router-dom';

import { Home, Bookmarks, TopNavBar, Post, Profile, Login } from './index.js';
import SideNav from './NavBar/SideNav.jsx';
import UserContextProvider from './context/UserContextProvider.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />} >
        <Route path='/' element={<Home />} />
        <Route path='bookmarks' element={<Bookmarks />} />
        <Route path='post' element={<Post />} />
        <Route path='/myprofile' element={<Profile />} />
      {/* <Route path='' element={<Post />} />  */}
      </Route>
      <Route path='/vishwas' element={<TopNavBar />} />
      <Route path='/login' element={<Login />} />
    </>
  )
)


function App() {

  return (
    <>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
    </>
  )
}

export default App
