import React, { memo, useState } from 'react'
import FilledBtn from '../shared/FilledBtn'
import { ImStarFull } from "react-icons/im"
import { ImStarEmpty } from "react-icons/im"
import { TPEvent } from "../../routes/home_routes/switchable/events/EventsPage"
import { MdLocationOn } from "react-icons/md"
import useMediaQuery from '@/hooks/useMediaQuery'
import { HiUserGroup } from "react-icons/hi"
import { SlCalender } from "react-icons/sl"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '@/features/user/authSlice'
import OutlineBtn from '../shared/OutlineBtn'
import { enrollEvent, withdrawEvent } from '@/features/events/eventSlice'
import { TStoreDispatch } from '@/store/store'

type Props = {
    item: TPEvent,
    width?: string,
    bg?: string
}

const EventCard = ({ item, width, bg }: Props) => {
    //#region : grabbing
    const dispatch: TStoreDispatch = useDispatch()
    const user = useSelector(getUser).user
    const isAboveMobile = useMediaQuery("(min-width:426px")
    //#endregion

    //#region : custom-declarations
    const [isEnrollOrUnEnroll, setIsEnrollOrUnEnroll] = useState<Boolean>(false)
    //#endregion

    //#region : side-effects

    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (

        <div className={`
            ${bg || `bg-pink-100`}
            h-full
            flex justify-center  flex-col rounded-[10px] overflow-hidden  hover:shadow-md transition ease-in duration-300 hover:translate-y-[-2px] 
            ${width ? width : ""}
            `}>
            {/* top */}
            <div className='flex-1 w-full h-auto rounded-md overflow-clip'>
                <Link to={`/home/events/view/${item._id}`}>
                    <img src={item.img} alt="" className='object-cover h-[300px] w-full' />
                </Link>
                {/* header */}
                <div className="flex justify-between gap-3 p-5">
                    <Link to={`/home/events/view/${item._id}`}>
                        {/* name & rating */}
                        <div className='flex flex-col gap-2'>
                            <h2 className=' text-md font-semibold text-pink-900' >{item.title.length > 25 ? item.title.substring(0, 25) + "..." : item.title}</h2>
                            {/* rating */}
                            <div className="flex gap-2 items-center">
                                {
                                    [...Array(item.rating).keys()].map((item) => {
                                        return (
                                            <span key={item} >
                                                <ImStarFull size={10} />
                                            </span>
                                        )
                                    })
                                }{
                                    [...Array(5 - (item.rating)).keys()].map((item) => {
                                        return (

                                            <span key={item} >
                                                <ImStarEmpty size={10} />
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </Link>

                    {/* button */}
                    {
                        item.registrations.includes(user._id) ? (
                            <OutlineBtn
                                sx={`${isEnrollOrUnEnroll && "hover:bg-transparent border-none shadow-none cursor-progress"}`}
                                content={isEnrollOrUnEnroll ? <>
                                    <div
                                        className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                        role="status">
                                        <span
                                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                        >Loading...</span>
                                    </div>
                                </> : "Withdraw"}
                                px={isAboveMobile ? "px-[15px]" : "px-[10px]"}
                                width={"w-max"}
                                h="h-max"
                                border='border-2 border-pink-300'
                                onClick={async () => {
                                    setIsEnrollOrUnEnroll(true)
                                    await dispatch(withdrawEvent(item._id))
                                    setIsEnrollOrUnEnroll(false)
                                }}
                            />
                        ) : (
                            <FilledBtn
                                content={isEnrollOrUnEnroll ? <>
                                    <div
                                        className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                        role="status">
                                        <span
                                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                        >Loading...</span>
                                    </div>
                                </> : "Enroll"}
                                px={isAboveMobile ? "px-5" : "px-3"}
                                h="h-max"
                                onClick={async () => {
                                    setIsEnrollOrUnEnroll(true)
                                    await dispatch(enrollEvent(item._id))
                                    setIsEnrollOrUnEnroll(false)
                                }}
                                sx={`${isEnrollOrUnEnroll && "bg-transparent bg-transperent border-none hover:shadow-none cursor-progress"}`}
                            />
                        )
                    }
                </div>
            </div>

            {/* bottom */}
            <div className='p-5 pt-0' >
                <hr className=' h-0 border-t-2 border-white' />

                {/* details */}
                <div className='flex flex-col mt-5 gap-3 text-sm'>
                    {/* location */}
                    <div className='flex gap-2 items-center' >
                        <MdLocationOn />
                        {item.location}
                    </div>
                    {/* location */}
                    <div className='flex gap-2 items-center' >
                        <SlCalender />
                        <>
                            {new Date(item.date).toDateString()}
                        </>
                    </div>
                    {/* location */}
                    <div className='flex gap-2 items-center' >
                        <HiUserGroup />
                        {item.registrations.length} registrations
                    </div>
                </div>


            </div>
        </div>
    )
}

export default memo(EventCard)