import Pillaipo from "../../assets/Pillaipo.png";
import userpng from "../../assets/user.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import ProfileShowModal from "./ProfileShowModal";
import SideNav from "./SideNav";
import { useEffect, useState } from "react";
import { NotificationComp } from "../index.js";
import useDetectScroll, { Axis } from "@smakss/react-scroll-direction";
import { useSelector } from "react-redux";

function TopNavBar({ toggleNotificationComp, isNotificationCompOpen, isOverlayOpen, setIsOverlayOpen }) {
  const [isProfileModalOpen, setisProfileModalOpen] = useState(false);
  const [overlayStatus, setOverlayStatus] = useState("hidden");
  const location = useLocation();
  const [navDisplay, setNavDisplay] = useState(true);

  const userData = useSelector((state) => state.user.userData);

  const { scrollDir, scrollPosition } = useDetectScroll({
    axis: Axis.Y,
    thr: 100,
  });

  useEffect(() => {
    // console.log(scrollDir);

    if (scrollDir === "down") {
      setNavDisplay(false);
    } else if (scrollDir === "up") {
      setNavDisplay(true);
    }
  }, [scrollPosition, scrollDir]);

  function showProfileModal() {
    const profile_modal = document.querySelector("#profile-modal");
    const overlay = document.querySelector("#overlay-for-profilemodal");
    setisProfileModalOpen(!isProfileModalOpen);

    if (window.innerWidth <= 600) {
      setOverlayStatus("flex");

      overlay.addEventListener("click", () => {
        setisProfileModalOpen(false);
        setOverlayStatus("hidden");
      });
    } else {
      // set timeout to close the modal, if cursor is not hovered on modal then close it
      let modalTimeOut = setTimeout(() => {
        setisProfileModalOpen(false);
      }, 3000);

      // if cursor is hovered on modal then clear the timeout
      profile_modal.addEventListener("mouseenter", () => {
        clearTimeout(modalTimeOut);
      });

      // if cursor is leaved from modal then set the timeout again for 1s and close it
      profile_modal.addEventListener("mouseleave", () => {
        modalTimeOut = setTimeout(() => {
          setisProfileModalOpen(false);
          setOverlayStatus("hidden");
        }, 1000);
      });
    }
  }

  // for side nav
  const [viewStatus, setViewStatus] = useState("ml-[-100%]");
  function showSideNav() {
    setViewStatus("");
  }

  function closeSideNav() {
    // console.log("close side nav is called");
    setViewStatus("ml-[-100%]");
  }

  // it will going to remember the theme of the user
  const toggleDarkMode = () => {
    // get the theme from the localstorage
    const theme = localStorage.getItem("theme");

    const html = document.querySelector("html");

    if (theme === "dark") {
      localStorage.setItem("theme", "light");
      html.classList.remove("dark");
      html.classList.remove("dark-mode-for-description");
    } else {
      localStorage.setItem("theme", "dark");
      html.classList.add("dark");
      html.classList.add("dark-mode-for-description");
    }
  }

  return (
    <>
      <nav
        id="top-nav"
        className={`flex items-center justify-between w-full h-20 overflow-hidden bg-custom-gray transition-all duration-500 ease-linear fixed top-0 z-30 ${navDisplay ? "" : "top-[-100%]"} dark:bg-gray-800 shadow-md dark:text-gray-300 dark:border-gray-600 `}
        type="button"
        data-drawer-target="drawer-navigation"
        data-drawer-show="drawer-navigation"
        aria-controls="drawer-navigation"
      >
        <div
          id="show-side-nav-btn"
          className="h-10 w-10  ml-3 p-2 border rounded-full flex md:hidden items-center justify-center cursor-pointer"
          onClick={showSideNav}
        >
          <i className="bx bx-menu h-10 w-10 text-[28px] flex items-center justify-center" />
        </div>
        <a
          href="/"
          className="w-fit h-full ml-5 items-center md:flex hidden cursor-pointer"
        >
          <img
            className="h-[60px] w-[60px] rounded-full bg-contain"
            src={Pillaipo}
            alt=""
          />
          <h2 id="pillaibuzz-logo" className=" dark:text-slate-300">
            Pillai Buzz
          </h2>
        </a>
        <div className="gap-[10px] items-center w-fit h-full hidden md:flex">
          <NavLink
            to="/"
            // onClick={() => window.location.href = "/"}
            className={({ isActive }) =>
              `${isActive ? " bg-custom-primary text-white" : ""} rounded-[20px] hover:bg-custom-primary hover:text-white hover:shadow-md px-[20px] py-[10px] transition-all duration-[0.3s] ease-in-out dark:text-slate-100`
            }
          >
            My Feed
          </NavLink>
          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              `${isActive ? " bg-custom-primary text-white" : ""} rounded-[20px] hover:bg-custom-primary hover:text-white hover:shadow-md px-[20px] py-[10px] transition-all duration-[0.3s] ease-in-out`
            }
          >
            Bookmarks
          </NavLink>
        </div>

        <div className="flex items-center justify-center ml-[10px] gap-[10px]">
          {location.pathname.includes("/post") ||
            location.pathname.includes("/create") ? null : (
            <NavLink
              to={"/search"}
              id="search-ic"
              className="sm:flex hidden cursor-pointer items-center justify-center size-10 rounded-full transition-all duration-300 ease-in-out hover:shadow-custom-shadow-1 dark:hover:bg-gray-700 dark:text-slate-200"
            >
              <i className="bx bx-search text-[25px]" />
            </NavLink>
          )}
          {location.pathname.includes("/create") ? null : (
            <Link
              className="btn-primary flex items-center justify-center gap-1"
              id="write-btn"
              to="/create"
            >
              <i className="bx bx-edit-alt text-[20px]" />
              <p>Write</p>
            </Link>
          )}
          <div
            onClick={toggleDarkMode}
            id="dark-mode-ic"
            className="flex items-center cursor-pointer justify-center size-10 rounded-full transition-all duration-300 ease-in-out hover:shadow-custom-shadow-1 dark:hover:bg-gray-700 dark:text-slate-200"
          >
            <i className="bx bx-moon text-[25px]" />
          </div>
          <div
            onClick={toggleNotificationComp}
            id="bell-ic"
            className={`sm:flex hidden cursor-pointer items-center justify-center size-10 rounded-full transition-all duration-300 ease-in-out hover:shadow-custom-shadow-1 dark:hover:bg-gray-700 dark:text-slate-200 ${isNotificationCompOpen ? "bg-custom-primary text-white" : ""}`}
          >
            <i className="bx bx-bell text-[25px]" />
          </div>
          <div
            className="profile-logo-container mr-3"
            onClick={showProfileModal}
          >
            <a id="profile-btn" className="overflow-hidden">
              <img
                id="profile-photo-nav"
                src={userData?.profilePhoto}
                className="rounded-full"
                alt=""
              />
            </a>
          </div>
        </div>
      </nav>

      <ProfileShowModal isProfileModalOpen={isProfileModalOpen} />
      <div
        id="overlay-for-profilemodal"
        className={`w-full h-full absolute bg-black opacity-50 z-10 ${overlayStatus}`}
      ></div>

      <SideNav viewStatus={viewStatus} closeSideNav={closeSideNav} />
      <div
        id="side-nav-overlay"
        className="w-full h-full fixed left-0 top-0 bg-black opacity-50 z-20 hidden"
      ></div>

      <NotificationComp
        isNotificationCompOpen={isNotificationCompOpen}
        toggleNotificationComp={toggleNotificationComp}
        isOverlayOpen={isOverlayOpen}
        setIsOverlayOpen={setIsOverlayOpen}
        className=" "
      />
    </>
  );
}

export default TopNavBar;
