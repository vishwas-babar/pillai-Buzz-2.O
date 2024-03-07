import { useParams } from "react-router-dom";
import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { ProfileCard, ProfileSkeleton } from "../components/index.js";
import userService from "../services/UserService.js";

function Profile() {

    const {userData, status} = useSelector((state) => state.user)
    const user_id = useParams();

    useEffect(() => {
      userService.getUserDetails(user_id)
      .then(res => {
        console.log("got this following data for current user: ", res.data)
      })
      .catch(error => {
        console.log("error occured when fetching the user data", error);
      })
    }, [user_id])

    if (!userData) return <div className=" text-center mt-36 text-lg w-full">You need to login first</div>

  return (
    <main className="flex flex-col items-center w-full mt-2 min-h-full shadow-md shadow-black mx-auto rounded-lg
    smm:w-[70%] sm:w-[60%] md:w-[55%] lg:w-[40%]">
      <ProfileCard

      />
    </main>
  )
}

export default Profile;