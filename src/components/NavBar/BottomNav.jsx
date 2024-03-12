import { Link, NavLink } from "react-router-dom";

function BottomNav(params) {
  return (
    <div
      id="bottom-nav"
      className="fixed h-16 w-full bg-custom-gray bottom-0 flex items-center justify-around sm:hidden
           *:size-10 *:rounded-md *:flex *:items-center *:justify-center *:transition-all *:duration-300 ease-in-out"
    >
      <NavLink
        to="/"
        id="home-feed"
        className={({ isActive }) =>
          `active:bg-custom-primary ${isActive ? "bg-custom-primary text-white" : ""} active:text-white`
        }
      >
        <i className="bx bx-home text-[23px]" />
      </NavLink>
      <NavLink
        to="/bookmarks"
        id="bookmark"
        className={({ isActive }) =>
          `active:bg-custom-primary ${isActive ? "bg-custom-primary text-white" : ""} active:text-white`
        }
      >
        <i className="bx bx-bookmark text-[23px]" />
      </NavLink>

      <NavLink
        to="/search"
        id="search"
        className={({ isActive }) =>
          `active:bg-custom-primary ${isActive ? "bg-custom-primary text-white" : ""} active:text-white`
        }
      >
        <i className="bx bx-search text-[23px]" />
      </NavLink>

      <NavLink
        to="/notifications"
        id="notification"
        className={({ isActive }) =>
          `active:bg-custom-primary ${isActive ? "bg-custom-primary text-white" : ""} active:text-white`
        }
      >
        <i className="bx bx-bell text-[23px]" />
      </NavLink>
    </div>
  );
}

export default BottomNav;
