import { useForm } from "react-hook-form";
import userDesignPng from "../assets/user_design.png";
import Button from "../components/Button.jsx";
import userService from "../services/UserService.js";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../components/index.js";

function Signup({ setLoginCount }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState();
  const [emailForLogin, setEmailForLogin] = useState("");
  const [passwordForLogin, setPasswordForLogin] = useState("");

  const [signupInProgress, setSignupInProgress] = useState(false);
  const [loginInProgress, setLoginInProgress] = useState(false);

  function handleProfilePhotoInputChange(e) {
    console.log(e.target.files);
    setProfilePhoto(URL.createObjectURL(e.target.files[0]));
  }

  function signupSubmit(data) {
    console.log(data);
    setSignupInProgress(true);
    userService
      .signupUser(data)
      .then((res) => {
        console.log(res.data);

        setLoginInProgress(true);
        userService
          .loginUserAccount({
            email: emailForLogin,
            password: passwordForLogin,
          })
          .then((res) => {
            setLoginCount((prev) => prev + 1);
            navigate("/");
          })
          .catch((error) => {
            loginInProgress(false);
            signupInProgress(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setSignupInProgress(false);

        if (error.response.status === 409) {
          toast.error("Account with this userId or email already exist", {
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
      });
  }

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
              <div className="h-fit leading-[46px] mt-2.5 mx-2.5">
                <h2 className="font-semibold leading-5">Welcome to</h2>
                <h1
                  id="pillai-buzz-logo-font"
                  className="font-[bold] text-[#6358DC] text-xl mb-0"
                >
                  Pillai Buzz
                </h1>
              </div>

              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-full h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
              </div>

              <form onSubmit={handleSubmit(signupSubmit)}>
                <div className="w-full flex justify-center">
                  <div className="relative">
                    <img
                      className="size-24 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                      src={
                        profilePhoto
                          ? profilePhoto
                          : "https://res.cloudinary.com/dllphjlv3/image/upload/f_auto,q_auto/ut3hb62wndfelslnpd7m"
                      }
                      alt="profile Photo"
                    />
                    <i className="bx bx-camera text-2xl absolute bottom-0 right-0 text-gray-500 dark:text-gray-400"></i>
                    <input
                      {...register("profilePhoto", { required: true })}
                      onChange={handleProfilePhotoInputChange}
                      type="file"
                      required
                      accept="image/*"
                      className=" absolute w-40 h-10"
                      placeholder="profile photo"
                      // ref={profilePhotoRef} // never use two ref on one element
                    />
                  </div>
                </div>

                <div className=" mt-10 flex flex-col gap-2">
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <i className="bx bx-user"></i>
                    </span>
                    <input
                      {...register("name", {
                        required: true,
                      })}
                      type="text"
                      required
                      className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name"
                    />
                  </div>

                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <i className="bx bx-user"></i>
                    </span>
                    <input
                      {...register("userId", {
                        required: true,
                      })}
                      type="text"
                      required
                      className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="user id"
                    />
                  </div>

                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <i className="bx bx-mail-send"></i>
                    </span>
                    <input
                      {...register("email", {
                        required: true,
                      })}
                      required
                      onChange={(e) => setEmailForLogin(e.target.value)}
                      type="text"
                      className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="email"
                    />
                  </div>

                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <i className="bx bx-lock"></i>
                    </span>
                    <input
                      {...register("password", {
                        required: true,
                      })}
                      required
                      onChange={(e) => setPasswordForLogin(e.target.value)}
                      type="password"
                      className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="password"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  children="Signup"
                  className="w-full rounded-md mt-2"
                />
              </form>
              <span className=" text-sm text-gray-700">
                Already have Account?{" "}
                <Link to={"/login"} className=" text-blue-900">
                  login now
                </Link>
              </span>
            </div>

            <div className="signup-form-container absolute h-full w-full p-2.5"></div>
          </div>
        </div>

        {signupInProgress && <Loader children={"Signing up..."} />}
        {loginInProgress && <Loader children={"Logging in..."} />}
      </main>
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
    </>
  );
}

export default Signup;
