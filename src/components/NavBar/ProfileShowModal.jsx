import { motion } from 'framer-motion';
import userpng from '../../assets/user.png';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


function ProfileShowModal({ isProfileModalOpen }) {

    const userData = useSelector(state => state.user.userData)

    const variants = {
        open: { x: 0, scale: 1, borderRadius: "6px", y: 0, opacity: 1 },
        closed: { x: 70, scale: 0.2, borderRadius: "100%", y: -200, opacity: 1 },
      };
    return (
        <>
            <motion.div 
            // initial="closed"
            // animate={isProfileModalOpen ? "open" : "closed"}
            // exit={"closed"}
            // variants={variants}
            // transition={{ duration: 0.5 }}
                id="profile-modal"
                className={(isProfileModalOpen ? "flex " : "hidden ") + "  w-60 h-fit overflow-hidden rounded-md absolute right-5 top-24 bg-white z-20 shadow-custom-shadow-2 flex flex-col"}
            >
                <NavLink
                    to={`/user/${userData?._id}`}
                    className="w-full h-16 my-3 flex justify-start pl-3 border-b transition-all duration-300 ease-in-out hover:bg-slate-200"
                >
                    <div className="size-12 self-center rounded-full overflow-hidden shadow-sm">
                        <img
                            id="profile-photo-modal"
                            src={userpng}
                            className="rounded-full"
                            alt=""
                        />
                    </div>
                    <div className="ml-2 mt-4">
                        <h2 id="user-name" className="text-[18px] font-500 leading-3">{userData?.name}</h2>
                        <span id="user-id" className="text-[14px]" >@{userData?.userId}</span>
                    </div>
                </NavLink>
                <div
                    id="user-info-modal"
                    className="flex items-start flex-col *:pl-3 *:h-12 w-full *:w-full *:flex *:items-center *:transition-all *:duration-300 *:gap-2 ease-in-out"
                >
                    <NavLink className="hover:bg-slate-200 active:bg-custom-primary">
                        <i className="bx bx-bookmark text-[18px]" />
                        <span>Bookmarks</span>
                    </NavLink>
                    <NavLink className="hover:bg-slate-200 active:bg-custom-primary">
                        <i className="bx bx-cog text-[18px]" />
                        <span>Account settings</span>
                    </NavLink>
                    <NavLink className="hover:bg-slate-200 active:bg-custom-primary">
                        <i className="bx bx-help-circle text-[18px]" />
                        <span>Help</span>
                    </NavLink>
                    <NavLink id="sign-out" className="hover:bg-slate-200 active:bg-custom-primary">
                        <i className="bx bx-log-out text-[18px]" />
                        <span>Sign out</span>
                    </NavLink>
                </div>
            </motion.div>

        </>
    )
}


export default ProfileShowModal;