import { getUser } from '@/features/user/authSlice'
import React from 'react'
import { GiHamburgerMenu } from "react-icons/Gi"
import { useSelector } from 'react-redux'
import transperant from "@/assets/transperant.png";
import useMediaQuery from '@/hooks/useMediaQuery';

type Props = {
    sidebarOpen: Boolean,
    setSidebarOpen: React.Dispatch<React.SetStateAction<Boolean>>
}

const HomeNavbar = ({ setSidebarOpen, sidebarOpen }: Props) => {
    //#region : declarations
    const user = useSelector(getUser)
    const isLargeScreen = useMediaQuery("(min-width:769px)");
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
            {/* logo hamburger switch */}
            {
                isLargeScreen ? (
                    <img src={transperant} alt="logo" className='h-[40px] w-[40px]' />
                ) : (
                    <GiHamburgerMenu className='h-[40px] w-[40px]' onClick={() => setSidebarOpen(true)} />
                )
            }
            {/* nav links toggle */}
            {
                isLargeScreen && (
                    <div></div>
                )
            }
            <div className='w-[40px] h-[40px] rounded-full bg-slate-400 overflow-hidden'>
                <img src={user.image} alt="user-image" className='max-w-full object-cover' />
            </div>
        </section>
    )
}

export default HomeNavbar