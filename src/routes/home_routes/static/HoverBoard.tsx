import React from 'react'
import { GoGlobe } from "react-icons/go"
import { MdOutlineEmojiEvents } from "react-icons/md"
import { MdOutlineFitnessCenter } from "react-icons/md"

import { FcGlobe } from "react-icons/fc"
import trophy from "@/assets/trophy.jpg"
import workout from "@/assets/workout.jpg"
import useMediaQuery from '@/hooks/useMediaQuery'
import { useDispatch, useSelector } from 'react-redux'
import { changeHomeRoute, EHomeRoutes, getHomeRoute } from '@/features/routes/homeRoutesSlice'
import { useNavigate } from 'react-router-dom'

type Props = {}

export const h40 = "h-[40px] w-[40px]"

const HoverBoard = (props: Props) => {
    //#region : declarations
    const isLargeScreen = useMediaQuery("(min-width:769px)");

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const page = useSelector(getHomeRoute)
    //#endregion

    //#region : custom-declarations

    //#endregion

    //#region : side-effects

    //#endregion

    //#region : functions
    const handleClick = (selectedPage: EHomeRoutes) => {
        if (selectedPage === page) {
            return
        }
        if (selectedPage === EHomeRoutes.events) {
            dispatch(changeHomeRoute(EHomeRoutes.events))
            navigate("/home/events")
        }
        if (selectedPage === EHomeRoutes.global) {
            dispatch(changeHomeRoute(EHomeRoutes.global))
            navigate("/home/global")
        }
        if (selectedPage === EHomeRoutes.myWorkouts) {
            dispatch(changeHomeRoute(EHomeRoutes.myWorkouts))
            navigate("/home/my_workouts")
        }
    }
    //#endregion

    //jsx rendering


    const resp = `${useMediaQuery("(min-width: 898px)") ? "block" : "hidden"}`

    return (
        <div id="hoverBoard" className=" bg-white z-10 absolute flex max-w-[769px] bottom-10 rounded-full w-[70%] left-[50%] translate-x-[-50%] " style={{ boxShadow: "0 3px 10px 8px rgba(0 0 0 / 8%)" }}>
            <div
                onClick={() => handleClick(EHomeRoutes.events)}
                className={`${page === EHomeRoutes.events ? "bg-slate-300" : "bg-white hover:bg-slate-200 cursor-pointer"}
            border-r-2  gap-5 p-2 flex justify-center items-center flex-1 text-center rounded-l-full`}>
                {/* <MdOutlineEmojiEvents className={`h-14 w-14`} /> */}
                <div className='h-10 w-10 overflow-hidden rounded-full'>
                    <img src={trophy} alt="events-img" className='w-full h-full object-cover' />
                </div>
                <p className={`${resp} font-bold text-lg`}>EVENTS</p>
            </div>
            <div
                onClick={() => handleClick(EHomeRoutes.global)}
                className={`${page === EHomeRoutes.global ? "bg-slate-300" : "bg-white hover:bg-slate-200 cursor-pointer"}
            border-r-2 gap-5 p-2 flex justify-center items-center flex-1 text-center`}>
                <FcGlobe className={`h-10 w-10`} />
                <p className={`${resp} font-bold text-lg`}>GLOBAL</p>
                {/* <GoGlobe /> */}
            </div>
            <div
                onClick={() => handleClick(EHomeRoutes.myWorkouts)}
                className={`${page === EHomeRoutes.myWorkouts ? "bg-slate-300" : "bg-white hover:bg-slate-200 cursor-pointer"}
            gap-5 p-2 flex justify-center items-center flex-1 text-center rounded-r-lg`}
            >
                <div className='h-10 w-10 overflow-hidden rounded-full'>
                    <img src={workout} alt="events-img" className='w-full h-full object-cover' />
                </div>
                <p className={`${resp} font-bold text-lg`}>MY WORKOUTS</p>
                {/* <MdOutlineFitnessCenter /> */}
            </div>
        </div>
    )
}

export default HoverBoard