import { TSWorkout } from '@/features/workouts/workouts.slice'
import React, { useState } from 'react'
import { AiOutlineComment, AiOutlineHeart } from 'react-icons/ai'
import { BiCaretDown, BiCategory } from 'react-icons/bi'
import { FaSuperpowers } from 'react-icons/fa'
import { MdOutlineFormatListNumbered } from 'react-icons/md'
import { RiFocus2Line, RiNumbersLine } from 'react-icons/ri'
import { TfiAlarmClock } from 'react-icons/tfi'
import { Link } from 'react-router-dom'
import FilledBtn from '../shared/FilledBtn'
import eventPreviewPlaceholder from "../../assets/eventPreviewPlaceholder.png"
import { ECategories } from '../headers/MyWorkoutsHeader'

type Props = { item: TSWorkout, sx: string }

const WorkoutPreviewCard = ({ item, sx }: Props) => {
    //#region : grabbing


    //#region : functionality
    const [showDetails, setShowDetails] = useState<Boolean>(true)


    //#endregion

    //#region : data

    //#endregion


    //#endregion

    //#region : selectors

    //#endregion

    //#region : custom-declarations


    //#region: simple states


    //#endregion

    //#region: loaders


    //#endregion

    //#endregion

    //#region : side-effects

    //#endregion

    //#region : functions

    // creates focuses string
    const displayFocus = (item: TSWorkout) => {
        const data = item.focuses.slice(0, 2).join(", ").substring(0, 15)
        return ` ${item.focuses.join(", ").length > 15 ? data + "..." : data}`
    }

    //#endregion

    //jsx rendering
    return (
        <div className={`bg-pink-100
                                h-full
                                flex justify-center  flex-col rounded-[10px] overflow-hidden  hover:shadow-md transition ease-in duration-300 hover:translate-y-[-2px] 
                                relative
                                ${sx && sx}
                                `}
        >
            {/* top */}
            <div className='flex-1 w-full h-auto rounded-md overflow-clip'>
                <img src={item.imgUrl ? item.imgUrl : eventPreviewPlaceholder} alt="" className='object-cover h-[300px] w-full' />
                {/* header */}
                <div className="">
                    {/* top part */}
                    <div className='flex justify-between gap-3 p-5'>
                        <Link to={``}>
                            {/* name & like,comments */}
                            <div className='flex flex-col gap-2'>

                                {/* name */}
                                <h2 className=' text-xl capitalize font-semibold text-pink-900' >{item.title.length > 25 ? item.title.substring(0, 25) + "..." : item.title}</h2>

                                {/* likes and comments */}
                                <div className='flex gap-3 items-center'>
                                    {/* likes */}
                                    <div className='flex gap-3 items-center'>
                                        <AiOutlineHeart size={18} />
                                        <span className='text-xs'>{item.likes.length}</span>
                                    </div>
                                    {/* comments */}
                                    <div className='flex gap-3 items-center'>
                                        <AiOutlineComment size={18} />
                                        <span className='text-xs' >{item.comments.length}</span>
                                    </div>
                                </div>
                            </div>

                        </Link>

                        {/* button */}
                        <FilledBtn content={"Train"} px={"px-5"} h="h-max" />
                    </div>
                    {/* time */}
                    <div className='px-5 mb-4 flex justify-between'>
                        <span className='text-sm font-semibold text-gray-600'>{"Just now"}</span>

                        {/* show details */}
                        <BiCaretDown size={18} className={`cursor-pointer ${showDetails ? `rotate-180` : ``}`} onClick={() => setShowDetails(prev => !prev)} />
                    </div>
                </div>
            </div>

            {/* bottom */}
            {
                <div
                    className={`px-5 pt-0 ${showDetails ? item.superSetWith.length > 0 ? "h-[190px]" : "h-[160px]" : "h-0"} transition-all duration-200`}
                >
                    {
                        showDetails && (
                            <hr className=' h-0 border-t-2 border-white' />
                        )
                    }

                    {/* details */}
                    <div className='flex flex-col mt-5 gap-3 text-sm'>

                        {/* sets and reps */}
                        <div className='flex gap-5 items-center'>

                            {/* sets */}
                            <div className='flex gap-2 items-center' >
                                <TfiAlarmClock size={18} />
                                <span>
                                    {item.sets}{" "}sets
                                </span>
                            </div>
                            {/* reps */}
                            <div className='flex gap-2 items-center' >
                                <MdOutlineFormatListNumbered size={18} />
                                <span>
                                    {item.reps}{" "}reps
                                </span>
                            </div>
                        </div>

                        {/* category */}
                        <div className='flex gap-2 items-center' >
                            <BiCategory size={18} />
                            <span>
                                <span className='font-semibold'>Category</span>
                                {" "}{item.category === ECategories.All ? "Combo" : item.category}
                            </span>
                        </div>

                        {/* focuses */}
                        <div className='flex gap-2 items-center' >
                            <RiFocus2Line size={18} />
                            <span>
                                <span className='font-semibold'>Focuses</span>
                                {displayFocus(item)}
                            </span>
                        </div>


                        {/* superset */}
                        {
                            item.superSetWith.length > 0 && (
                                <div className='flex gap-2 items-center' >
                                    <FaSuperpowers size={18} />
                                    <span>
                                        superset with{" "}{item.superSetWith.join(", ").substring(0, 15)}
                                    </span>
                                </div>
                            )
                        }

                        {/* dropset */}
                        <div className='flex gap-2 items-center' >
                            <RiNumbersLine size={18} />
                            <span>
                                {item.dropset ? "Dropset recommended" : "Dropset not recommended."}
                            </span>
                        </div>
                    </div>


                </div>
            }
        </div>
    )
}

export default WorkoutPreviewCard