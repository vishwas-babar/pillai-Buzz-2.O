import React from 'react'
import Input from './Input'
import { useForm } from 'react-hook-form'


function UserEditForm() {

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            profilePhoto: "https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c",
            name: "vishwas",
            userId: "vishwas",
            about: "I am a developer",
            email: "vishwas@gmail.com",
            password: "vishwas",
        }
    });


    const submit = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="mx-auto  w-2/3 absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center space-x-6">
                <div className="shrink-0">
                    <img
                        id="previewimg"
                        className="size-40 rounded-full object-cover"
                        src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c"
                        alt="Current profile photo"
                    />
                </div>
                <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                        type="file"
                        onchange="loadFile(event)"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
                    />
                </label>
            </div>
            <div className="flex bg-red-600 flex-wrap justify-around gap-5">
                
                <Input 
                    label="Name"
                    type="text"
                    placeholder="email"
                    required
                    {...register("name")}
                />

                <Input
                    label="UserId"
                    type="text"
                    placeholder="userId"
                    required
                    {...register("userId")}
                />

                <Input
                    label="About"
                    type="text"
                    placeholder="about"
                    required
                    {...register("about")}
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="email"
                    required
                    {...register("email")}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="password"
                    required
                    {...register("password")}
                />

    
            </div>
            <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>
    )
}

export default UserEditForm