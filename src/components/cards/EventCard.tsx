import React from 'react'
import FilledBtn from '../shared/FilledBtn'
import { ImStarFull } from "react-icons/im"
import { ImStarEmpty } from "react-icons/im"
import { TEvent } from "../../routes/home_routes/switchable/events/EventsPage"
import { MdLocationOn } from "react-icons/md"
import useMediaQuery from '@/hooks/useMediaQuery'
import { HiUserGroup } from "react-icons/hi"
import { SlCalender } from "react-icons/sl"
import { Link } from 'react-router-dom'

type Props = { item: TEvent }

const EventCard = ({ item }: Props) => {
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
        <Link to={"/home/events/view/123"}>
            <div className='flex justify-center flex-col rounded-[10px] overflow-hidden bg-pink-100 hover:shadow-md transition ease-in duration-300 hover:translate-y-[-2px] shadow-md'>
                {/* top */}
                <div className='flex-1 w-full h-auto rounded-md overflow-clip'>
                    <img src={item.img} alt="" className='object-cover h-[300px] w-full' />
                </div>

                {/* bottom */}
                <div className='p-5' >
                    {/* header */}
                    <div className="flex justify-between">
                        <div className='flex flex-col gap-2'>
                            <h2 className=' text-lg font-semibold text-pink-900' >{item.title}</h2>
                            {/* rating */}
                            <div className="flex gap-2 items-center">
                                {
                                    item.rating.map((item: boolean) => {
                                        if (item) {
                                            return <ImStarFull size={10} />
                                        } else {
                                            return <ImStarEmpty size={10} />
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <FilledBtn content={"Enroll"} px={isAboveMobile ? "px-5" : "px-3"} />
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
                                {item.date.toDateString()}
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
        </Link>
    )
}

export default EventCard