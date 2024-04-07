import React from 'react';
import googleIcon from '../assets/google.png';
import { useGoogleLogin } from '@react-oauth/google';
import userService from '../services/UserService';

function GoogleAuth({ children, className = "" }) {

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (res) => {
            console.log("this is response from google login", res);

            // send the response to the backend 
            userService.sendAccessTokenToServer(res.access_token)
                .then(res => {
                    window.location.href = '/'; // redirect to the home page
                })
                .catch(err => console.log(err))
        },
        onError: (error) => {
            console.log("error occured in google login", error);
        }
    })

    return (
        <button onClick={loginWithGoogle} className={`flex items-center justify-center gap-2 bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${className}`}>
            <img className=' size-6' src={googleIcon} alt="" />
            <span>{children}</span>
        </button>
    )
}

export default GoogleAuth