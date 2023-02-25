import React from 'react'
import FilledBtn, { EButtonType } from '../shared/FilledBtn'
import { ImStarFull } from "react-icons/im"
import { ImStarEmpty } from "react-icons/im"
import { MdLocationOn } from "react-icons/md"
import useMediaQuery from '@/hooks/useMediaQuery'
import { HiUserGroup } from "react-icons/hi"
import { SlCalender } from "react-icons/sl"
import { Link } from 'react-router-dom'
import { TSEvent } from '@/routes/home_routes/switchable/events/CreateEvent'
import eventPreviewPlaceholder from "../../assets/eventPreviewPlaceholder.png"

type Props = { item: TSEvent, width?: string }

const EventPreviewCard = ({ item, width }: Props) => {
    //#region : grabbing
    const isAboveMobile = useMediaQuery("(min-width:426px")
    //#endregion

    //#region : custom-declarations

    //#endregion

    //#region : side-effects

    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (

        <div className={`
            flex justify-center flex-col rounded-[10px] overflow-hidden bg-pink-100 hover:shadow-md transition ease-in duration-300 hover:translate-y-[-2px] shadow-md
            ${width ? width : ""}
            `}>
            {/* top */}
            <div className='flex-1 w-full h-auto rounded-md overflow-clip'>
                <img src={item.img || eventPreviewPlaceholder} alt={"event-img"} className='object-cover h-[300px] w-full ' />
            </div>

            {/* bottom */}
            <div className='p-5' >
                {/* header */}
                <div className="flex justify-between gap-3 items-center">
                    {/* name & rating */}
                    <div className='flex flex-col gap-2'>
                        <h2 className=' text-lg font-semibold text-pink-900' >{item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title}</h2>
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

                    {/* button */}
                    <FilledBtn content={"Enroll"} px={isAboveMobile ? "px-5" : "px-3"} h="h-max" disabled />
                </div>

                <hr className='my-5 h-0 border-t-2 border-white' />

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
                            {/* {item.date.toDateString()} */}
                            {new Date("2023-02-25T10:32:51.041Z").toDateString()}
                        </>
                    </div>
                    {/* location */}
                    <div className='flex gap-2 items-center' >
                        <HiUserGroup />
                        0 registrations
                    </div>
                </div>


            </div>
        </div>
    )
}

export default EventPreviewCard