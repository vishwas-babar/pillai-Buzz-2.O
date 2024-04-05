import { Outlet } from "react-router-dom";
import { BottomNav, TopNavBar } from "./index.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Layout() {
  const [isNotificationCompOpen, setIsNotificationCompOpen] = useState(false);

  function toggleNotificationComp() {
    setIsNotificationCompOpen((prev) => !prev);
  }

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
      <Outlet />
      <BottomNav
        toggleNotificationComp={toggleNotificationComp}
        isNotificationCompOpen={isNotificationCompOpen}
      />
    </>
  );
}

export default Layout;
