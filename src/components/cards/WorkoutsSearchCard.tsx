import { TPWorkout } from '@/features/workouts/workouts.slice'
import React, { useEffect } from 'react'
import { BiCategory } from 'react-icons/bi'
import { RiFocus2Line } from 'react-icons/ri'

type Props = {
    item: TPWorkout,
    onClick?: (e: any) => any
}

const WorkoutsSearchCard = ({ item, onClick }: Props) => {
    const displayFocus = (item: TPWorkout) => {
        const data = item.focuses.slice(0, 2).join(", ").substring(0, 10)
        return ` ${item.focuses.join(", ").length > 10 ? data + "..." : data}`
    }
    useEffect(() => {
        console.log("child");
    }, [])
    console.log("workout search card re-renderd.");
    return (
        <div
            className="flex flex-col z-40 bg-white rounded-xl shadow-md cursor-pointer hover:translate-y-[-2px] transition-all duration-[300ms]"
            onClick={onClick}
        >
            <div className='border-2 p-3 rounded-xl  flex flex-col'>
                {/* img and title/desc */}
                <div className='flex gap-3'>
                    {/* image */}
                    <img src={item.imgUrl} alt="" className='w-[120px] object-cover' />

                    {/* title/desc */}
                    <div className='flex flex-col justify-start'>
                        <h1 className='capitalize font-bold'>{item.title.substring(0, 14)}{item.title.length > 14 && "..."}</h1>
                        <p className='text-sm'>{item.desc.substring(0, 20)}{item.desc.length > 20 && "..."}</p>
                        <div className='flex gap-2 items-center' >
                            <BiCategory size={12} />
                            <span>
                                <span className='font-semibold text-xs'>Category</span>
                                {" "}
                                <span className='text-xs'>
                                    {item.category}
                                </span>
                            </span>
                        </div>

                        {/* focuses */}
                        <div className='flex gap-2 items-center' >
                            <RiFocus2Line size={12} />
                            <span>
                                <span className='font-semibold text-xs'>
                                    Focuses
                                </span>
                                <span className='text-xs'>
                                    {displayFocus(item)}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkoutsSearchCard