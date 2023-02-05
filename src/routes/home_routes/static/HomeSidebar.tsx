import React from 'react'
import { AiFillCloseCircle } from "react-icons/ai"
import { GiHamburgerMenu } from 'react-icons/Gi'
import { GoGlobe } from "react-icons/go"
import { MdOutlineEmojiEvents } from "react-icons/md"
import { MdOutlineFitnessCenter } from "react-icons/md"
import { FaHome } from "react-icons/fa"
import { MdHelpCenter } from "react-icons/md"
import { RiContactsFill } from "react-icons/ri"
import useMediaQuery from '@/hooks/useMediaQuery'
import { changeHomeRoute, EHomeRoutes } from '@/features/routes/homeRoutesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ETogglers, getToggler, toggle } from '@/features/togglers/togglerSlice'

type Props = {}

const HomeSidebar = (props: Props) => {
    //#region : declarations
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toggler = useSelector(getToggler)
    const isSmallScreens = useMediaQuery("(max-width:769px)")
    //#endregion

    //#region : custom-declarations

    //#endregion

    //#region : side-effects

    //#endregion

    //#region : functions
    // handling redirect
    const handleRedirect = (page: EHomeRoutes): void => {
        if (Object.values(EHomeRoutes).includes(page)) {
            console.log("entered if", page)
            navigate(`/home/${page}`)
            dispatch(toggle(ETogglers.homeSidebar))
        }
    }

    //#endregion

    //jsx rendering
    return (
        <>
            <div className={`${toggler.homeSidebar && isSmallScreens ? "left-0" : "left-[-250px]"} transition-all h-full p-[1em] w-[250px] absolute bg-blue-900 top-0 z-50 text-white`}>
                {/* header */}
                <div className='bg-white py-1 px-1 rounded-b-lg flex items-center gap-4 font-bold text-gray-600'>
                    <AiFillCloseCircle className='text-white cursor-pointer rounded-full w-[40px] h-[40px]'
                        onClick={() => {
                            // closing the sidebar
                            dispatch(toggle(ETogglers.homeSidebar))
                        }} />
                    Quantum Gym
                    {/* <GiHamburgerMenu className='h-[40px] w-[40px] ' color='#fff' onClick={() => setSidebarOpen(true)} /> */}
                </div>

                {/* section-1 */}
                <div
                    className='bg-white my-5 rounded-t-xl hover:rounded-t-xl'>
                    <div
                        onClick={() => handleRedirect(EHomeRoutes.global)}
                        className='p-2 hover:bg-slate-100 flex items-center gap-3 text-md rounded-t-xl'>
                        <GoGlobe /> Global
                    </div>
                    <div
                        onClick={() => handleRedirect(EHomeRoutes.events)}
                        className='p-2 hover:bg-slate-100 flex items-center gap-3 text-md'>
                        <MdOutlineEmojiEvents />Events
                    </div>
                    <div
                        onClick={() => handleRedirect(EHomeRoutes.myWorkouts)}
                        className='p-2 hover:bg-slate-100 flex items-center gap-3 text-md'><MdOutlineFitnessCenter />My Workouts</div>
                </div>

                {/* section-2 */}
                <div
                    className='bg-white my-5 rounded-b-xl'>
                    <div className='p-2 hover:bg-slate-100 flex items-center gap-3 text-md '>
                        <FaHome /> Home
                    </div>
                    <div className='p-2 hover:bg-slate-100 flex items-center gap-3 text-md'>
                        <RiContactsFill />Contact Us
                    </div>
                    <div className='p-2 hover:bg-slate-100 flex items-center gap-3 text-md'>
                        <MdHelpCenter />Help
                    </div>
                    <div className='p-2 hover:bg-slate-100 flex items-center gap-3 text-md rounded-b-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>

                        About Us
                    </div>
                </div>

                {/* footer */}
                <div className='text-center text-xs absolute bottom-2 w-full left-0'>
                    <p className='text-white'>Copyright, ©2023</p>
                    <p className='text-white'>All rights reserved.</p>
                </div>
            </div>
        </>
    )
}

export default HomeSidebar