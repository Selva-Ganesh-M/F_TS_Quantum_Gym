import { getUser, signout } from '@/features/user/authSlice'
import React, { useEffect } from 'react'
import { GiHamburgerMenu } from "react-icons/Gi"
import { useDispatch, useSelector } from 'react-redux'
import transperant from "@/assets/transperant.png";
import useMediaQuery from '@/hooks/useMediaQuery';
import { ETogglers, getToggler, toggle } from '@/features/togglers/togglerSlice';
import { MdAccountBox } from "react-icons/md"
import { MdManageAccounts } from "react-icons/md"
import { GoSignOut } from "react-icons/go"
import { useNavigate } from 'react-router-dom';

type Props = {}

const HomeNavbar = (props: Props) => {
    //#region : declarations
    const isLargeScreen = useMediaQuery("(min-width:769px)");
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(getUser).user
    const isUser = useSelector(getUser).isUser
    const toggler = useSelector(getToggler)
    //#endregion

    //#region : custom-declarations

    //#endregion

    //#region : side-effects

    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <section id="homeNavbar" className='sticky top-0 left-0 w-full flex justify-between p-[1em] shadow-md bg-white z-50 items-center'>
            {/* left */}
            {/* logo hamburger switch */}
            {
                isLargeScreen ? (
                    <img onClick={() => navigate("/home/global")} src={transperant} alt="logo" className='h-[40px] w-[40px] cursor-pointer' />
                ) : (
                    <GiHamburgerMenu className='h-[40px] w-[40px]' onClick={() => {
                        // opening sidebar
                        dispatch(toggle(ETogglers.homeSidebar))
                        // closing userbar if its open
                        if (toggler.userMenu) {
                            dispatch(toggle(ETogglers.userMenu))
                        }

                    }} />
                )
            }

            {/* middle */}
            {/* nav links toggle */}
            {
                isLargeScreen && (
                    <div className='flex gap-6 cursor-pointer'>
                        <div onClick={() => {
                            navigate("/home")
                        }} className="cursor-pointer">Home</div>
                        <div onClick={() => {
                            navigate("/home/global")
                        }} className="cursor-pointer">Global</div>
                        <div onClick={() => {
                            navigate("/home/events")
                        }} className="cursor-pointer">Events</div>
                        <div onClick={() => {
                            navigate("/home/my_workouts")
                        }} className="cursor-pointer">Workouts</div>
                        <div onClick={() => {
                            navigate("/home/contact")
                        }} className="cursor-pointer">Contact</div>
                    </div>
                )
            }

            {/* right */}
            <div
                className='w-[40px] h-[40px] rounded-full relative bg-slate-400 '>
                {/* user-image */}
                <img src={user.image} onClick={() => {
                    // open userMenu
                    dispatch(toggle(ETogglers.userMenu))
                    // close sidebar if its open
                    if (toggler.homeSidebar) {
                        dispatch(toggle(ETogglers.homeSidebar))
                    }
                }
                } alt="user-image" className='max-w-full max-h-full rounded-full object-cover cursor-pointer' />


                {/* user-menu */}
                <div
                    style={{ boxShadow: "0 3px 10px 8px rgba(0 0 0 / 8%)" }}
                    className={`
                    ${toggler.userMenu ? ` ${isLargeScreen ? `w-[400px] h-[380px]` : `w-60 h-[370px]`}` : "h-0 w-0"}
                    absolute top-0 right-0 bg-blue-900 text-white transition-all rounded-2xl pb-[2.5em] z-50` }>
                    {
                        toggler.userMenu ? (<>
                            {/* top-edge */}
                            <div className='flex justify-end'>
                                {/* user-image */}
                                <div className='w-[40px] h-[40px] rounded-full relative bg-slate-400'>
                                    <img onClick={() => dispatch(toggle(ETogglers.userMenu))} src={user.image} alt="user-image" className='cursor-pointer max-w-full max-h-full rounded-full object-cover' />
                                </div>
                            </div>

                            {/* header */}
                            {
                                isLargeScreen ? (<>
                                    <div className='flex w-[85%] m-auto bg-white mt-3'>
                                        <div className=''>
                                            <img src={user.image} alt="user-image" className='max-w-full max-h-full object-cover' />
                                        </div>
                                        <div className='p-3'>
                                            <div className='font-bold '>
                                                {user.username.length > 35 ? user.username.slice(0, 35) + "..." : user.username}
                                            </div>
                                            <div className='text-xs '>
                                                {user.email.length > 35 ? user.email.slice(0, 35) + "..." : user.email}
                                            </div>
                                        </div>
                                    </div>
                                </>) : (<>
                                    <div className='p-2 text-sm bg-white justify-center items-center text-center rounded-t-xl w-[85%] m-auto mt-3 flex flex-col gap-3'>
                                        <div className='w-[40px] h-[40px] rounded-full  relative bg-slate-400'>
                                            <img onClick={() => dispatch(toggle(ETogglers.userMenu))} src={user.image} alt="user-image" className='max-w-full max-h-full rounded-full object-cover' />
                                        </div>
                                        <div>
                                            <div className='font-bold '>
                                                {user.username.length > 25 ? user.username.slice(0, 25) + "..." : user.username}
                                            </div>
                                            <div className='text-xs '>
                                                {user.email.length > 25 ? user.email.slice(0, 25) + "..." : user.email}
                                            </div>
                                        </div>
                                    </div>
                                </>)
                            }


                            {/* body */}
                            <div className='bg-white rounded-b-xl w-[85%] m-auto mt-5 z-50'>
                                <div className='hover:bg-slate-100 cursor-pointer p-2 border-b-2'>
                                    <div className='p-2 hover:bg-slate-100 flex items-center gap-3 text-md rounded-t-xl'>
                                        <MdAccountBox />
                                        <p>
                                            My Account

                                        </p>
                                    </div>
                                </div>
                                <div className='hover:bg-slate-100 cursor-pointer p-2 border-b-2'>
                                    <div className='p-2 hover:bg-slate-100 flex items-center gap-3 text-md rounded-t-xl'>
                                        <MdManageAccounts />
                                        <p>
                                            Account Settings

                                        </p>
                                    </div>
                                </div>
                                <div className='hover:bg-slate-100 cursor-pointer rounded-b-xl p-2'
                                    onClick={() => {
                                        dispatch(signout())
                                        dispatch(toggle(ETogglers.userMenu))
                                        navigate("/")
                                    }}>
                                    <div className='p-2 hover:bg-slate-100 flex items-center gap-3 text-md rounded-t-xl'>
                                        <GoSignOut />
                                        <p>
                                            SignOut
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                        ) : (
                            null
                        )
                    }

                </div>
            </div>
        </section>
    )
}

export default HomeNavbar