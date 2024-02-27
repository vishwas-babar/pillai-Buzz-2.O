import userpng from '../assets/user.png';

function ProfileShowModal({ profileModalHiddenStatus }) {


    return (
        <>
            <div
                id="profile-modal"
                className={profileModalHiddenStatus + " w-60 h-fit overflow-hidden rounded-md absolute right-5 top-24 bg-white z-20 shadow-custom-shadow-2 flex flex-col"}
            >
                <a
                    href="/myprofile"
                    className="w-full h-16 my-3 flex justify-start pl-3 border-b transition-all duration-300 ease-in-out hover:bg-slate-200"
                >
                    <div className="size-12 self-center rounded-full overflow-hidden shadow-sm">
                        {/* <img src="../public/images/user.png" alt=""> */}
                        <img
                            id="profile-photo-modal"
                            src={userpng}
                            className="rounded-full"
                            alt=""
                        />
                    </div>
                    <div className="ml-2 mt-4">
                        <h2 id="user-name" className="text-[18px] font-500 leading-3">Vishwas babar</h2>
                        <span id="user-id" className="text-[14px]" >@vishwas-babar9</span>
                    </div>
                </a>
                <div
                    id="user-info-modal"
                    className="flex items-start flex-col *:pl-3 *:h-12 w-full *:w-full *:flex *:items-center *:transition-all *:duration-300 *:gap-2 ease-in-out"
                >
                    <a className="hover:bg-slate-200 active:bg-custom-primary">
                        <i className="bx bx-bookmark text-[18px]" />
                        <span>Bookmarks</span>
                    </a>
                    <a className="hover:bg-slate-200 active:bg-custom-primary">
                        <i className="bx bx-cog text-[18px]" />
                        <span>Account settings</span>
                    </a>
                    <a className="hover:bg-slate-200 active:bg-custom-primary">
                        <i className="bx bx-help-circle text-[18px]" />
                        <span>Help</span>
                    </a>
                    <a id="sign-out" className="hover:bg-slate-200 active:bg-custom-primary">
                        <i className="bx bx-log-out text-[18px]" />
                        <span>Sign out</span>
                    </a>
                </div>
            </div>

        </>
    )
}


export default ProfileShowModal;