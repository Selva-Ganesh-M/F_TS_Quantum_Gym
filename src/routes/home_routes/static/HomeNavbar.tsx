import { getUser } from '@/features/user/authSlice'
import React from 'react'
import { GiHamburgerMenu } from "react-icons/Gi"
import { useDispatch, useSelector } from 'react-redux'
import transperant from "@/assets/transperant.png";
import useMediaQuery from '@/hooks/useMediaQuery';
import { ETogglers, getToggler, toggle } from '@/features/togglers/togglerSlice';
import { MdAccountBox } from "react-icons/md"
import { MdManageAccounts } from "react-icons/md"
import { GoSignOut } from "react-icons/go"

type Props = {
    sidebarOpen: Boolean,
    setSidebarOpen: React.Dispatch<React.SetStateAction<Boolean>>
}

const HomeNavbar = ({ setSidebarOpen, sidebarOpen }: Props) => {
    //#region : declarations
    const isLargeScreen = useMediaQuery("(min-width:769px)");
    const dispatch = useDispatch()
    const user = useSelector(getUser)
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
        <section id="homeNavbar" className='sticky top-0 left-0 w-full flex justify-between p-[1em] shadow-md'>
            {/* left */}
            {/* logo hamburger switch */}
            {
                isLargeScreen ? (
                    <img src={transperant} alt="logo" className='h-[40px] w-[40px]' />
                ) : (
                    <GiHamburgerMenu className='h-[40px] w-[40px]' onClick={() => setSidebarOpen(true)} />
                )
            }

            {/* middle */}
            {/* nav links toggle */}
            {
                isLargeScreen && (
                    <div></div>
                )
            }

            {/* right */}
            <div
                className='w-[40px] h-[40px] rounded-full relative bg-slate-400 '>
                {/* user-image */}
                <img src={user.image} onClick={() => dispatch(toggle(ETogglers.userMenu))} alt="user-image" className='max-w-full max-h-full rounded-full object-cover cursor-pointer' />
                {/* user-menu */}
                <div
                    style={{ boxShadow: "0 3px 10px 8px rgba(0 0 0 / 8%)" }}
                    className={`${toggler.userMenu ? ` ${isLargeScreen ? `w-[400px] h-[380px]` : `w-60 h-[370px]`}` : "h-0 w-0"}
                            absolute top-0 right-0 bg-blue-900 text-white transition-all rounded-2xl pb-[2.5em]` }>
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
                            <div className='bg-white rounded-b-xl w-[85%] m-auto mt-5'>
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
                                <div className='hover:bg-slate-100 cursor-pointer rounded-b-xl p-2'>
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