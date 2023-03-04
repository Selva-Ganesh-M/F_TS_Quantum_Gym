import React, { useState, useRef, useEffect } from 'react'
import { GoGlobe } from "react-icons/go"
import { MdOutlineEmojiEvents } from "react-icons/md"
import { MdOutlineFitnessCenter } from "react-icons/md"

import { FcGlobe } from "react-icons/fc"
import trophy from "@/assets/trophy.jpg"
import workout from "@/assets/workout.jpg"
import useMediaQuery from '@/hooks/useMediaQuery'
import { useDispatch, useSelector } from 'react-redux'
import { changeHomeRoute, EHomeRoutes, getHomeRoute } from '@/features/routes/homeRoutesSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import upArrow from "../../../assets/up-arrow.png"

type Props = {}

export const h40 = "h-[40px] w-[40px]"

const HoverBoard = (props: Props) => {
    //#region : grabbing
    const isLargeScreen = useMediaQuery("(min-width:769px)");
    const { pathname } = useLocation()
    const hoverBoardRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const page = useSelector(getHomeRoute)
    //#endregion

    //#region : custom-declarations
    const [hovering, setHovering] = useState(false)
    const [visibility, setVisibility] = useState(false)

    const [totalHoverHidden, setTotalHoverHidden] = useState<Boolean>(false)
    let timeout: NodeJS.Timeout;

    //#endregion

    //#region : side-effects

    // turning off the hover board on the single workout page
    useEffect(() => {
        const data = pathname.split("/")
        data[2] === "my_workouts" && data[3] && (() => {
            setTotalHoverHidden(true)
        })()
        return () => {
            setTotalHoverHidden(false)
        }
    }, [pathname])
    //#endregion

    //#region : functions
    const handleClick = (selectedPage: EHomeRoutes) => {
        if (selectedPage === page && pathname === `/home/${selectedPage}`) {
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
        <>
            {
                !totalHoverHidden && (
                    <>
                        {/* main */}
                        <div
                            id="hoverBoard"
                            ref={hoverBoardRef}
                            className={`
                    ${visibility ? "opacity-100 bottom-10" : "opacity-0 bottom-5"} bg-white z-10 absolute flex max-w-[769px] rounded-full w-[70%] left-[50%] translate-x-[-50%] transition-all `}
                            style={{ boxShadow: "0 3px 10px 8px rgba(0 0 0 / 8%)" }}
                            onMouseOver={() => {
                                setVisibility(true)
                            }}
                            onMouseEnter={() => {
                                setHovering(true)
                                setVisibility(true)
                                clearTimeout(timeout)
                            }}
                            onMouseLeave={() => {
                                setTimeout(() => { setVisibility(false) }, 1000)
                                setHovering(false)
                            }}
                        >
                            {/* section-1 */}
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

                            {/* section-2 */}
                            <div
                                onClick={() => handleClick(EHomeRoutes.global)}
                                className={`${page === EHomeRoutes.global ? "bg-slate-300" : "bg-white hover:bg-slate-200 cursor-pointer"}
                border-r-2 gap-5 p-2 flex justify-center items-center flex-1 text-center`}>
                                <FcGlobe className={`h-10 w-10`} />
                                <p className={`${resp} font-bold text-lg`}>GLOBAL</p>
                                {/* <GoGlobe /> */}
                            </div>

                            {/* section-3 */}
                            <div
                                onClick={() => handleClick(EHomeRoutes.myWorkouts)}
                                className={`${page === EHomeRoutes.myWorkouts ? "bg-slate-300" : "bg-white hover:bg-slate-200 cursor-pointer"}
                 gap-5 p-2 flex justify-center items-center flex-1 text-center rounded-r-full`}
                            >
                                <div className='h-10 w-10 overflow-hidden rounded-full'>
                                    <img src={workout} alt="events-img" className='w-full h-full object-cover' />
                                </div>
                                <p className={`${resp} font-bold text-lg`}>MY WORKOUTS</p>
                                {/* <MdOutlineFitnessCenter /> */}
                            </div>
                        </div>

                        {/* toggler */}
                        <img
                            src={upArrow}
                            alt=""
                            className={`
                    ${visibility ? "opacity-0 bottom-10" : "opacity-100 bottom-5"}
                    transition-all
                    w-[50px] h-[50px] absolute rounded-full animate-bounce cursor-pointer right-[40px] z-[49] bg-white `}
                            onClick={() => {
                                setVisibility(true)
                            }} />
                    </>
                )
            }
        </>
    )
}

export default HoverBoard