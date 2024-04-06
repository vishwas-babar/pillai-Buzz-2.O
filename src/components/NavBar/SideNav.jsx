import pillaibuzzlogo from "../../assets/Pillaipo.png";
import { Link, NavLink } from "react-router-dom";

function SideNav({ viewStatus, closeSideNav }) {
  return (
    <>
      {/* side nav for small screens */}
      <nav
        id="side-nav"
        className={`flex ${viewStatus} fixed top-0 bottom-0 flex-col justify-start w-3/4 h-full z-[500] bg-custom-gray shadow-md transition-all duration-450 ease-linear`}
      >
        <div className="flex justify-between w-full h-17 p-3">
          <div className="flex w-full h-full items-center p-2 relative">
            <Link to={"/"}>
              <img
                className="size-14 overflow-hidden rounded-full"
                src={pillaibuzzlogo}
                alt=""
              />
            </Link>
            <Link to={"/"} id="pillaibuzz-logo" className="text-[30px] ">
              Pillai Buzz
            </Link>
            <a
              id="side-nav-close-btn"
              className="side-nav-close-btn absolute right-1 size-10 cursor-pointer flex items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:shadow-custom-shadow-1 active:scale-105 active:shadow-custom-shadow-1"
              onClick={closeSideNav}
            >
              <i className="bx bx-x text-[28px]" />
            </a>
          </div>
        </div>
        <div className="side-nav-btns flex flex-col *:w-full *:h-11 *:flex *:items-center *:px-[10px] *:py-[20px] *:transition-all *:cursor-pointer duration-300 ease-in-out">
          <NavLink
            to="/"
            className="hover:shadow-custom-shadow-1 active:scale-[1.01]"
          >
            My Feed
          </NavLink>
          <NavLink className="hover:shadow-custom-shadow-1 active:scale-[1.01]">
            More
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default SideNav;
