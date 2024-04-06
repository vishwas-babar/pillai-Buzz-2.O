import { Outlet } from "react-router-dom";
import { BottomNav, TopNavBar } from "./index.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout() {
  const [isNotificationCompOpen, setIsNotificationCompOpen] = useState(false);

  function toggleNotificationComp() {
    setIsNotificationCompOpen((prev) => !prev);
  }

  const authStatus = useSelector((state) => state.user.status);
  const authLoading = useSelector((state) => state.user.loading);

  // this is for solving the scroll problem
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <TopNavBar
        toggleNotificationComp={toggleNotificationComp}
        isNotificationCompOpen={isNotificationCompOpen}
      />
      {(true)? <Outlet /> : (
        <div className=" h-screen w-full flex items-center justify-center">
          <h1 className="text-center text-3xl mt-20">Please Login to see the content</h1>
        </div>
      )}
      {/* <Outlet /> */}
      <BottomNav
        toggleNotificationComp={toggleNotificationComp}
        isNotificationCompOpen={isNotificationCompOpen}
      />
    </>
  );
}

export default Layout;
