import Pillaipo from "../../assets/Pillaipo.png";
import userpng from "../../assets/user.png";
import { Link, NavLink } from "react-router-dom";
import ProfileShowModal from "./ProfileShowModal";
import SideNav from "./SideNav";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NotificationComp } from "../index.js"

function TopNavBar({ toggleNotificationComp, isNotificationCompOpen }) {
  const [isProfileModalOpen, setisProfileModalOpen] = useState(false);
  const [overlayStatus, setOverlayStatus] = useState("hidden");
  const userData = useSelector((state) => state.user.userData);

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
    console.log("close side nav is called");
    setViewStatus("ml-[-100%]");
  }

  return (
    <>
      <nav
        id="top-nav"
        className="flex items-center justify-between w-full h-20 overflow-hidden bg-custom-gray transition-all duration-500 ease-linear"
        type="button"
        data-drawer-target="drawer-navigation"
        data-drawer-show="drawer-navigation"
        aria-controls="drawer-navigation"
      >
        <Link
          id="show-side-nav-btn"
          className="h-10 w-10  ml-3 p-2 border rounded-full flex md:hidden items-center justify-center cursor-pointer"
          onClick={showSideNav}
        >
          <i className="bx bx-menu h-10 w-10 text-[28px] flex items-center justify-center" />
        </Link>
        <Link
          to="/"
          className="w-fit h-full ml-5 items-center md:flex hidden cursor-pointer"
        >
          <img
            className="h-[60px] w-[60px] rounded-full bg-contain"
            src={Pillaipo}
            alt=""
          />
          <h2 id="pillaibuzz-logo" className="">
            Pillai Buzz
          </h2>
        </Link>
        <div className="gap-[10px] items-center w-fit h-full hidden md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? " bg-custom-primary text-white" : ""} rounded-[20px] hover:bg-custom-primary hover:text-white hover:shadow-md px-[20px] py-[10px] transition-all duration-[0.3s] ease-in-out`
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
          <div
            id="search-ic"
            className="sm:flex hidden cursor-pointer items-center justify-center size-10 rounded-full transition-all duration-300 ease-in-out hover:shadow-custom-shadow-1"
          >
            <i className="bx bx-search text-[25px]" />
          </div>
          <Link
            className="btn-primary flex items-center justify-center gap-1"
            id="write-btn"
            to="/create"
          >
            <i className="bx bx-edit-alt text-[20px]" />
            <p>Write</p>
          </Link>
          <div
            id="dark-mode-ic"
            className="flex items-center cursor-pointer justify-center size-10 rounded-full transition-all duration-300 ease-in-out hover:shadow-custom-shadow-1"
          >
            <i className="bx bx-moon text-[25px]" />
          </div>
          <div
            onClick={toggleNotificationComp}
            id="bell-ic"
            className={`sm:flex hidden cursor-pointer items-center justify-center size-10 rounded-full transition-all duration-300 ease-in-out hover:shadow-custom-shadow-1 ${isNotificationCompOpen ? "bg-custom-primary text-white" : ""}`}
            
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
                src={userpng}
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

      <NotificationComp isNotificationCompOpen={isNotificationCompOpen} toggleNotificationComp={toggleNotificationComp} className=" "/>
    </>
  );
}

export default TopNavBar;
