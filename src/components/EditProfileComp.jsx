import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import userService from '../services/UserService';


const EditProfileComp = ({
    name,
    userId,
    profilePhoto,
    _id,
    role,
    loadStatus,
    viewStatus,
    toggleEditFormViewStatus,
}) => {

    const [profileImage, setProfileImage] = useState(profilePhoto);
    const [userIdConflicts, setUserIdConflicts] = useState(false);
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setProfileImage(profilePhoto)
    }, [profilePhoto])


    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            name,
            userId,
            role,
        }
    });

    function abortEditProfile() {
        toggleEditFormViewStatus();
    }

    function submitForm(data) {
        setIsSaving(true)

        userService.editUserProfile(data)
            .then(res => {
                setIsSaving(false)
                window.location.href = '/user/' + _id;
                console.log(res.data)
            })
            .catch(err => {
                setIsSaving(false)
                if (err.response) {
                    if (err.response.status === 409) {
                        return setUserIdConflicts(true)
                    }
                }

                console.log('error: ', err)
            })
    }

    function profilePhotoInputChange(e) {
        // e.target.files[0]
        setProfileImage(URL.createObjectURL(e.target.files[0]))
    }

    function handleInputChanged(e) {
        console.log('changing the desability of submit btn...')
        setSubmitBtnDisabled(false)
        setUserIdConflicts(false)
    }

    if (loadStatus) {
        return
    }

    return (
        <>

            <form onSubmit={handleSubmit(submitForm)} className={`absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-3 sm:max-w-xl sm:mx-auto ${viewStatus ? "" : "hidden"}`} >

                <div className=" dark:text-gray-500">
                    <div className="relative px-4 py-10 bg-white dark:bg-gray-800 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                        <div className="max-w-md mx-auto">


                            <div className="flex items-center space-x-6">
                                <div className="shrink-0">
                                    <img
                                        id="preview_img"
                                        className="h-16 w-16 object-cover rounded-full"
                                        src={profileImage}
                                        alt="Current profile photo"
                                    />
                                </div>
                                <label className="block">
                                    <span className="sr-only">Choose profile photo</span>

                                    <input
                                        type="file"
                                        accept='image/*'
                                        {...register("profilePhoto", {
                                            onChange: (e) => {
                                                profilePhotoInputChange(e)
                                                handleInputChanged(e);
                                            }
                                        })}
                                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 dark:file:bg-gray-700 file:text-violet-700 hover:file:bg-violet-100"
                                    />
                                </label>
                            </div>


                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7">
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Name</label>
                                        <input
                                            required
                                            type="text"
                                            {...register("name", {
                                                required: true,
                                                onChange: handleInputChanged,
                                            })}
                                            defaultValue={name}
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 dark:text-gray-300 dark:bg-gray-700"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">User id</label>

                                        <div className='flex items-center justify-center px-4 py-2 border w-full sm:text-sm border-gray-300 rounded-md text-gray-600 dark:text-gray-300 dark:bg-gray-700 '>
                                            <p>@</p>
                                            <input
                                                required
                                                defaultValue={userId}
                                                {...register("userId", {
                                                    required: true,
                                                    onChange: handleInputChanged,
                                                })}
                                                type="text"
                                                className=" focus:ring-gray-500 focus:border-gray-900 focus:outline-none w-full dark:text-gray-300 dark:bg-gray-700"
                                                placeholder="user-id"
                                            />
                                        </div>
                                        <span className=' text-red-400 text-sm'>{userIdConflicts && 'this userId is already taken!'}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="leading-loose">Tag Line</label>
                                        <input
                                            required
                                            onChange={handleInputChanged}
                                            {...register("role", {
                                                required: true,
                                                onChange: handleInputChanged
                                            })}

                                            defaultValue={role}
                                            type="text"
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 dark:text-gray-300 dark:bg-gray-700"
                                            placeholder="-"
                                        />
                                    </div>
                                </div>
                                <div className="pt-4 flex items-center space-x-4">
                                    <button
                                        type='button'
                                        onClick={abortEditProfile}
                                        className="flex justify-center items-center w-full text-gray-900 bg-gray-300 dark:text-gray-300 dark:bg-gray-700 px-4 py-3 rounded-md focus:outline-none">
                                        <svg
                                            className="w-6 h-6 mr-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>{" "}
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        disabled={submitBtnDisabled}
                                        className={` flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none   ${submitBtnDisabled ? 'bg-blue-300' : 'bg-blue-500'}`}

                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`absolute rounded-3xl bg-white bg-opacity-60 items-center justify-center saving inset-0 z-10 ${isSaving ? 'flex' : 'hidden'} `}>
                            <div className="flex items-center">
                                <span className="text-3xl mr-4">Saving</span>
                                <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>


            </form>
        </>
    )
}

export default EditProfileComp;