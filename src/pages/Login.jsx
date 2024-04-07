import { useForm } from "react-hook-form";
import userDesignPng from "../assets/user_design.png";
import Button from "../components/Button.jsx";
import userService from "../services/UserService.js";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { Loader, GuestLogin } from "../components/index.js";
import { useEffect, useRef, useState } from "react";
import GoogleAuth from "../components/GoogleAuth.jsx";


function Login({ setLoginCount }) {
  const { register, handleSubmit, setValue } = useForm();

  const navigate = useNavigate();
  const [loginProcessStarted, setLoginProcessStarted] = useState(false);
  const [GuestLoginCompShow, setGuestLoginCompShow] = useState(false);

  const LoginFormRef = useRef();

  const loginAsGuest = () => {
    const email = "robert112@gmail.com";
    const password = "robertrdj";

    setValue("email", email);
    setValue("password", password);

    setGuestLoginCompShow(false);
  }

  // show guest login component after 3
  useEffect(() => {
    setTimeout(() => {
      setGuestLoginCompShow(true);
    }, 3000);
  }, [])

  const loginSubmit = async (data) => {
    console.log(data)
    try {
      setLoginProcessStarted(true)
      const response = await userService.loginUserAccount(data);
      console.log("this is status code");
      console.log(response.status);
      setLoginCount((prev) => prev + 1);
      setLoginProcessStarted(false)
      navigate("/", { refresh: true });
    } catch (error) {
      setLoginProcessStarted(false)
      console.log("this is status code");
      console.log(error.response.status);
      console.log("error occured in login submit");

      if (error.response.status === 401) {
        toast.error("wrong email or password!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }

      if (error.response.status === 500) {
        toast.error("server issue! please try again later", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  // function responseGoogle(response) {
  //   console.log(response)
  //   if (response.error) {
  //     console.log("error occured in google login", error);

  //   }else{
  //     console.log("this is response from google login", response);

  //     // send the response to the backend
  //   }
  // }

  return (
    <>
      <main className="lg:h-[80vh] lg:w-4/5 w-fit lg:p-8 bg-transparent absolute -translate-x-2/4 -translate-y-2/4 shadow-[0_0_10px_5px_rgba(0,0,0,0.2)] flex items-center justify-around lg:bg-[#eceaea] rounded-[10px] left-2/4 top-2/4">
        <div className="h-full md:hidden lg:flex xl:flex w-6/12 hidden items-center justify-center rounded-tl-[10px] rounded-bl-[10px]">
          <img
            className="h-[400px] w-auto object-contain"
            src={userDesignPng}
            alt=""
          />
        </div>

        <div className="form-container flex flex-col h-[500px] w-[400px] rounded-[5px]">
          <div className="inner-form-container relative h-full w-full transition-transform duration-[1s] bg-[white] shadow-[0px_0px_1px_1px] rounded-[5px]">
            <div className="login-form-container absolute h-full w-full p-2.5">
              <div className="h-fit leading-[46px] m-2.5">
                <h2 className="font-semibold leading-5">Welcome to</h2>
                <h1
                  id="pillai-buzz-logo-font"
                  className="font-[bold] text-[#6358DC] mb-2.5"
                >
                  Pillai Buzz
                </h1>
              </div>

              <div className="flex w-full h-fit flex-col items-center justify-center mt-5">
                <GoogleAuth children={"Continue with Google"} className="w-full py-3" />
              </div>

              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 ">
                  or
                </span>
              </div>

              <form ref={LoginFormRef} onSubmit={handleSubmit(loginSubmit)}>
                <div className="flex flex-col gap-3">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-0 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      email:
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                      </span>
                      <input
                        {...register("email", {
                          required: true,
                        })}
                        type="text"
                        id="email"
                        required
                        className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-0 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      password:
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <i className="bx bx-lock"></i>
                      </span>
                      <input
                        {...register("password", {
                          required: true,
                        })}
                        type="password"
                        id="password"
                        required
                        className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="password"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  children="Login"
                  className="w-full rounded-md mt-10"
                />
              </form>
              <span className=" text-sm text-gray-700">
                Don't have Account?{" "}
                <Link to={"/signup"} className=" text-blue-900">
                  signup now
                </Link>
              </span>
            </div>

            <div className="signup-form-container absolute h-full w-full p-2.5"></div>
          </div>
        </div>
      </main>

      {GuestLoginCompShow && <GuestLogin loginAsAGuest={loginAsGuest} className={"absolute right-10 top-10"} />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition="Bounce"
      />
      {loginProcessStarted && <Loader children={"Logging in..."} />}
    </>
  );
}

export default Login;
