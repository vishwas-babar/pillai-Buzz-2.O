import { Outlet } from "react-router-dom";
import { BottomNav, TopNavBar } from "../index.js"
import { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

function Layout() {

    // useEffect(() => {
    //     // get the current user access from backend
    //     Cookies.set('uid', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidmlzaHdhcyIsInVzZXJJZCI6InZpc2h3YXM3NyIsInVzZXJUeXBlIjoidXNlciIsIl9pZCI6IjY1ZGRjMDMyODM3NDJlNTJjY2NiN2VkOSIsImlhdCI6MTcwOTAzMTQ3NH0.U6FlxjdyQOfvkVTboAQ62PM56Hqe7lfI4AM_B29q5EQ');

    //     axios.get(`http://127.0.0.1:8000/api/user/info`)
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }, [])


    // load the post from database for the home page
    

    return (
        <>
            <TopNavBar />
            <Outlet />
            <BottomNav />
        </>
    )
}

export default Layout;