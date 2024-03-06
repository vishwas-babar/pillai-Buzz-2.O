import { Outlet } from "react-router-dom";
import { BottomNav, TopNavBar } from "./index.js"


function Layout() {

    return (
        <>
            <TopNavBar />
            <Outlet />
            <BottomNav />
        </>
    )
}

export default Layout;