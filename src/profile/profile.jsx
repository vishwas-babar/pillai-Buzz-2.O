import UserContext from "../context/UserContext.js";
import React, { useContext } from 'react'

function Profile() {

    const { user } = useContext(UserContext);

    if (!user) return <div className=" text-center mt-36 text-lg w-full">You need to login first</div>

  return (
    <div className="border border-spacing-2 border-gray-400" >
        <h1>{user.username}</h1>
        <h1>{user.emailid}</h1>
    </div>
  )
}

export default Profile;