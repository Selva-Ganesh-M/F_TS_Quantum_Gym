import MyWorkoutsHeader from '@/components/headers/MyWorkoutsHeader'
import { dislikeWorkout, likeWorkout, selectAllWorkouts, TPWorkout } from '@/features/workouts/workouts.slice'
import { useDispatch, useSelector } from 'react-redux'
import { BiCaretDown, BiCategory } from 'react-icons/bi'
import { FaComments, FaSuperpowers } from 'react-icons/fa'
import { MdOutlineFormatListNumbered, MdOutlineModeComment } from 'react-icons/md'
import { RiFocus2Line, RiNumbersLine } from 'react-icons/ri'
import * as timeago from "timeago.js"
import { TfiAlarmClock } from 'react-icons/tfi'
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai'
import FilledBtn from '@/components/shared/FilledBtn'
import OutlineBtn from '@/components/shared/OutlineBtn'
import { Link } from 'react-router-dom'

import { useState } from "react"
import { api, TPayload } from '@/api/api'
import { TRootState, TStoreDispatch } from '@/store/store'
import { getUser } from '@/features/user/authSlice'
import EventCardLoader from '@/components/loaders/EventCardLoader'
import { notFound } from '../events/EventsPage'

type Props = {}


const MyWorkoutsPage = (props: Props) => {

    //#region : grabbing
    const workouts = useSelector(selectAllWorkouts)
    const { isWorkoutsLoading } = useSelector((state: TRootState) => state.workout)
    const dispatch: TStoreDispatch = useDispatch()
    //#endregion

    //#region : selectors

    //#endregion

    //#region : custom-declarations
    const user = useSelector(getUser).user

    // #region : togglers
    const [showDetails, setShowDetails] = useState<Boolean>(true)

    // #endregion

    //#endregion

    //#region : side-effects

    //#endregion

    //#region : functions
    const displayFocus = (item: TPWorkout) => {
        const data = item.focuses.slice(0, 2).join(", ").substring(0, 15)
        return ` ${item.focuses.join(", ").length > 15 ? data + "..." : data}`
    }

    const likeWorkoutHandler = async (id: string) => {
        const res = await api.patch<TPayload<TPWorkout>>(`/workouts/like/${id}`)

        if (res.data.statusText === "success") {
            dispatch(likeWorkout(res.data.payload))
        }
    }

    const dislikeWorkoutHandler = async (id: string) => {
        const res = await api.patch<TPayload<TPWorkout>>(`/workouts/dislike/${id}`)

        if (res.data.statusText === "success") {
            dispatch(dislikeWorkout(res.data.payload))
        }
    }

    //#endregion

    //jsx rendering
    return (
        <section id='myWorkouts' className='  w-full h-[calc(100vh-72px)] overflow-scroll relative'>
            <MyWorkoutsHeader />
            {/* body */}
            <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 pt-6 pb-24 relative bg-white`}
            >
                {
                    isWorkoutsLoading ? (
                        [...Array(10).keys()].map((item, index) => (
                            <EventCardLoader key={index} />

                        ))
                    ) : (<>
                        {
                            workouts.length > 0 ? (
                                workouts.map(item => (
                                    <div className={`bg-pink-100
                                h-full
                                flex justify-center  flex-col rounded-[10px] overflow-hidden  hover:shadow-md transition ease-in duration-300 hover:translate-y-[-2px] 
                                relative
                                `}
                                        key={item._id}
                                    >
                                        {/* top */}
                                        <div className='flex-1 w-full h-auto rounded-md overflow-clip'>
                                            <Link to={`/home/my_workouts/${item._id}`}>
                                                <img src={item.imgUrl} alt="" className='object-cover h-[300px] w-full' />
                                            </Link>
                                            {/* header */}
                                            <div className="">
                                                {/* top part */}
                                                <div className='flex justify-between gap-3 p-5'>
                                                    <Link to={``}>
                                                        {/* name & like,comments */}
                                                        <div className='flex flex-col gap-2'>

                                                            {/* name */}
                                                            <Link to={`/home/my_workouts/${item._id}`}>
                                                                <h2 className=' text-xl capitalize font-semibold text-pink-900' >{item.title.length > 25 ? item.title.substring(0, 25) + "..." : item.title}</h2>
                                                            </Link>

                                                            {/* likes and comments */}
                                                            <div className='flex gap-3 items-center'>
                                                                {/* likes */}
                                                                <div className='flex gap-3 items-center'>
                                                                    {
                                                                        item.likes.includes(user._id) ? (
                                                                            <AiFillHeart size={18} onClick={() => dislikeWorkoutHandler(item._id)} />
                                                                        ) : (
                                                                            <AiOutlineHeart size={18} onClick={() => likeWorkoutHandler(item._id)} />
                                                                        )
                                                                    }
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
                                                    <Link to={`/home/my_workouts/${item._id}`}>
                                                        <FilledBtn content={"Train"} px={"px-5"} h="h-max" />
                                                    </Link>
                                                </div>
                                                {/* time */}
                                                <div className='px-5 mb-4 flex justify-between'>
                                                    <span className='text-sm font-semibold text-gray-600'>{timeago.format(item.createdAt)}</span>

                                                    {/* show details */}
                                                    <BiCaretDown size={18} className={`cursor-pointer ${showDetails ? `rotate-180` : ``}`} onClick={() => setShowDetails(prev => !prev)} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* bottom */}
                                        {
                                            <div
                                                className={`px-5 pt-0 ${showDetails ? "h-[190px]" : "h-0"} transition-all duration-200`}
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
                                                            {" "}{item.category}
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
                                                    <div className='flex gap-2 items-center' >
                                                        <FaSuperpowers size={18} />
                                                        <span>
                                                            superset with{" "}{item.superSetWith.join(", ").substring(0, 15)}
                                                        </span>
                                                    </div>
                                                    {/* dropset */}
                                                    <div className='flex gap-2 items-center' >
                                                        <RiNumbersLine size={18} />
                                                        <span>
                                                            {item.dropset ? "Dropset not recommended." : "Dropset recommended"}
                                                        </span>
                                                    </div>
                                                </div>


                                            </div>
                                        }
                                    </div>
                                ))
                            ) : (
                                <div className='top-[50%] left-[50%] translate-x-[-50%] m-auto flex flex-col gap-5 absolute'>
                                    <img src={notFound} alt="" />
                                    <span className='text-center'>No results found.</span>
                                    <span className='text-center'>
                                        <Link to={"/home/events/create"}>Create your first event.</Link>
                                    </span>
                                </div>
                            )
                        }
                    </>
                    )
                }
            </div>
        </section>
    )
}

export default MyWorkoutsPage