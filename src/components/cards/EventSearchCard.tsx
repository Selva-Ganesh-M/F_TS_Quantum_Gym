import { TPEvent } from '@/routes/home_routes/switchable/events/EventsPage'
import React from 'react'
import { HiUserGroup } from 'react-icons/hi'
import { ImStarEmpty, ImStarFull } from 'react-icons/im'
import { MdLocationOn } from 'react-icons/md'
import { SlCalender } from 'react-icons/sl'
import { Link } from 'react-router-dom'

type Props = {
    item: TPEvent
}

const EventSearchCard = ({ item }: Props) => {
    return (
        <div className="flex flex-col z-40 bg-white rounded-lg shadow-md cursor-pointer hover:translate-y-[-2px] transition-all duration-[300ms]">
            <div className='border-2 p-3 rounded-lg'>
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
                <hr className=' h-0 border-t-2 border-pink-50 my-5' />

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

export default EventSearchCard