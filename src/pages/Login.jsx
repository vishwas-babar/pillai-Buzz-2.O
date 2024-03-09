
import { useForm } from "react-hook-form";
import userDesignPng from "../assets/user_design.png"
import Button from "../components/Button.jsx";
import userService from "../services/UserService.js";
import { useNavigate } from "react-router-dom";



function Login() {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const loginSubmit = async (data) => {
        try {
            // console.log(response.status)
            const response = await userService.loginUserAccount(data)
            console.log('this is status code');
            console.log(response.status)
            navigate('/')
        } catch (error) {
            console.log('this is status code');
            console.log(error.response.status)
            console.log('error occured in login submit')
        }
    }

    return (
        <main className="h-[80vh] w-4/5 absolute -translate-x-2/4 -translate-y-2/4 shadow-[0_0_10px_5px_rgba(0,0,0,0.2)] flex items-center justify-around bg-[#eceaea] rounded-[10px] left-2/4 top-2/4">
            <div className="h-full w-6/12 flex items-center justify-center rounded-tl-[10px] rounded-bl-[10px]">
                <img className="h-[400px] w-auto object-contain" src={userDesignPng} alt="" />
            </div>

            <div className="form-container flex flex-col h-[500px] w-[400px] rounded-[5px]">
                <div className="inner-form-container relative h-full w-full transition-transform duration-[1s] bg-[white] shadow-[0px_0px_1px_1px] rounded-[5px]">


                    <div className="login-form-container absolute h-full w-full p-2.5">
                        <div className="h-fit leading-[46px] m-2.5">
                            <h2 className="font-semibold leading-5">Welcome to</h2>
                            <h1 id="pillai-buzz-logo-font" className="font-[bold] text-[#6358DC] mb-2.5">Pillai Buzz</h1>
                        </div>

                        <div className="flex w-full h-fit flex-col items-center justify-center mt-5">
                            <button className=" w-full h-10 cursor-pointer font-semibold text-base text-[black] bg-[white] shadow-[0_0_2px_1px_rgba(0,0,0,0.2)] transition-all duration-[0.2s] ease-[ease-in-out] flex items-center justify-center mb-2.5 rounded-[5px] border-[none] hover:bg-[#6358DC] hover:text-[white]">
                                <img src="/images/google-logo.png" alt="" />
                                <span className="font-extralight text-[0.9rem]">Login With Google</span>
                            </button>
                        </div>

                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 ">or</span>
                        </div>

                        <form onSubmit={handleSubmit(loginSubmit)} >
                            <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                            <div class="flex">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                    </svg>
                                </span>
                                <input
                                    {...register("email", {
                                        required: true
                                    })}
                                    type="text"
                                    id="website-admin"
                                    class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" />
                            </div>
                            <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                            <div class="flex">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                    </svg>
                                </span>
                                <input 
                                    {...register("password", {
                                        required: true
                                    })}
                                type="text" 
                                id="website-admin" 
                                class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" />
                            </div>

                            <Button
                                type="submit"
                                children="Login"
                                className="w-full"
                            />
                        </form>

                    </div>

                    <div className="signup-form-container absolute h-full w-full p-2.5">

                    </div>

                </div>
            </div>
        </main>
    )
}


export default Login;