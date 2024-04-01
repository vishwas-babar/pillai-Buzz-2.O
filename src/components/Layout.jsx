import { Outlet } from "react-router-dom";
import { BottomNav, TopNavBar } from "./index.js";
import { useState } from "react";
import { set } from "rsuite/esm/utils/dateUtils.js";

function Layout() {

  const [isNotificationCompOpen, setIsNotificationCompOpen] = useState(false);

  function toggleNotificationComp() {
    setIsNotificationCompOpen(prev => !prev)
  }

  return (
    <>
      <TopNavBar toggleNotificationComp={toggleNotificationComp} isNotificationCompOpen={isNotificationCompOpen}/>
      <Outlet />
      <BottomNav toggleNotificationComp={toggleNotificationComp} isNotificationCompOpen={isNotificationCompOpen} />
    </>
  );
}

export default Layout;
