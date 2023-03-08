import { TPWorkout } from '@/features/workouts/workouts.slice'
import { TPEvent } from '@/routes/home_routes/switchable/events/EventsPage'
import React, { useEffect } from 'react'
import { HiUserGroup } from 'react-icons/hi'
import { ImStarEmpty, ImStarFull } from 'react-icons/im'
import { MdLocationOn } from 'react-icons/md'
import { SlCalender } from 'react-icons/sl'
import { Link } from 'react-router-dom'

type Props = {
    item: TPWorkout,
    onClick?: (e: any) => any
}

const WorkoutsSearchCard = ({ item, onClick }: Props) => {
    useEffect(() => {
        console.log("child");
    }, [])
    console.log("workout search card re-renderd.");
    return (
        <div
            className="flex flex-col z-40 bg-white rounded-lg shadow-md cursor-pointer hover:translate-y-[-2px] transition-all duration-[300ms]"
            onClick={onClick}
        >
            <div className='border-2 p-3 rounded-lg'>
                {/* name & rating */}
                <div className='flex flex-col gap-2'>
                    <h2 className=' text-md font-semibold text-pink-900' >{item.title.length > 25 ? item.title.substring(0, 25) + "..." : item.title}</h2>
                </div>

                <hr className=' h-0 border-t-2 border-pink-50 my-5' />

                {/* details */}
                <div className='flex flex-col mt-5 gap-3 text-sm'>
                    {/* location */}
                    <div className='flex gap-2 items-center' >
                        <MdLocationOn />
                        {/* {item.location} */}
                    </div>
                    {/* location */}
                    <div className='flex gap-2 items-center' >
                        <SlCalender />
                        <>
                            {/* {new Date(item.date).toDateString()} */}
                        </>
                    </div>
                    {/* location */}
                    <div className='flex gap-2 items-center' >
                        <HiUserGroup />
                        {/* {item.registrations.length} registrations */}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default WorkoutsSearchCard