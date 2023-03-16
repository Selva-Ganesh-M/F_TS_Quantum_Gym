import { api, TPayload } from '@/api/api'
import { format } from "timeago.js"
import FilledBtn from '@/components/shared/FilledBtn'
import { deleteWorkout, dislikeWorkout, likeWorkout, selectAllWorkouts, selectOneWorkout, TPWorkout } from '@/features/workouts/workouts.slice'
import store, { TRootState, TStoreDispatch } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai'
import { BiCaretDown, BiCategory, BiTrash } from 'react-icons/bi'
import { FaBookReader, FaSuperpowers } from 'react-icons/fa'
import { MdOutlineFormatListNumbered } from 'react-icons/md'
import { RiFocus2Line, RiNumbersLine } from 'react-icons/ri'
import { TfiAlarmClock } from 'react-icons/tfi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getUser } from '@/features/user/authSlice'
import { createComment, fetchAllComments, selectAllComments } from '@/features/comments/comment.slice'
import Comment from '@/components/comment/Comment'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { deleteVideo } from '@/utils/deleteFromFirebase'
import { ETogglers, toggleSetFalse } from '@/features/togglers/togglerSlice'

type Props = {}

const ViewWorkout = (props: Props) => {

    //#region : grabbing
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch: TStoreDispatch = useDispatch()
    const user = useSelector(getUser).user
    const comments = useSelector(selectAllComments)

    //#region : selectors
    const item = useSelector((state: TRootState) => selectOneWorkout(state, id!))
    const { isDeleting } = useSelector((state: TRootState) => state.workout)
    const supersetWorkout = useSelector((state: TRootState) => selectOneWorkout(state, item!.superSetWith[0]))
    //#endregion

    //#region : custom-declarations
    const [showDetails, setShowDetails] = useState<Boolean>(true)
    const [isComments, setIsComments] = useState<Boolean>(true)
    const [newComment, setNewComment] = useState<string>("")

    // loaders
    const [isCreating, setIsCreating] = useState<Boolean>(false)

    //#endregion

    //#region : side-effects

    // if url doesn't have id redirect to one step back
    useEffect(() => {
        if (!id) {
            navigate(-1)
        }
    }, [id])

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
        <>
            {
                item ?
                    // if workout fetched show it
                    (
                        <section className='w-full h-[calc(100vh-72px)] bg-white flex p-5 gap-5'>

                            {/* back btn */}
                            <div className='w-max cursor-pointer hidden md:sticky md:top-0 md:flex md:flex-col md:gap-5 items-center'>
                                <BsFillArrowLeftCircleFill color='white' size={40} onClick={() => navigate(-1)} />
                                {
                                    item.userId === user._id && (
                                        <>
                                            {
                                                isDeleting ? (
                                                    <>
                                                        <div
                                                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                                            role="status">
                                                            <span
                                                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                                                Loading...</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <BiTrash
                                                        color='white'
                                                        size={50}
                                                        className={`${false ? "cursor-wait" : "cursor-pointer"} rounded-full hover:bg-red-100 p-2`}
                                                        onClick={async () => {
                                                            await deleteVideo(item.videoUrl)
                                                            await dispatch(deleteWorkout(item._id))
                                                            navigate("/home/my_workouts")
                                                        }}
                                                    />

                                                )
                                            }
                                        </>
                                    )
                                }
                            </div>

                            {/* video, description, comments */}
                            <div className='flex-[5]  h-full overflow-scroll flex flex-col gap-6 relative '>


                                {/* video */}
                                <div>
                                    <iframe
                                        className='basis-full'
                                        width="100%"
                                        height="550px"
                                        src={item.videoUrl}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>

                                {/* title and likes, comments */}
                                <div className='flex justify-between bg-white sticky top-[-2px] z-[45] px-3 pb-3 shadow-md items-start shadow-[1px 2px 3px 4px rgba(0,0,0,0.8)]'>

                                    {/* title */}
                                    <span className='text-3xl'>{item.title}</span>


                                    {/* likes and cmnts */}
                                    <div className='flex gap-3 items-center'>


                                        {/* likes icon */}
                                        <div className='flex gap-3 items-center'>
                                            {
                                                item.likes.includes(user._id) ? (
                                                    <AiFillHeart size={24} onClick={() => dislikeWorkoutHandler(item._id)} className={"cursor-pointer"} />
                                                ) : (
                                                    <AiOutlineHeart size={24} onClick={() => likeWorkoutHandler(item._id)} className={"cursor-pointer"} />
                                                )
                                            }
                                            <span className='text-lg'>{item.likes.length}</span>
                                        </div>


                                        {/* comments icon */}
                                        <div className='flex gap-3 items-center'>
                                            <a href="#comments">
                                                <AiOutlineComment size={24} className={"cursor-pointer"} />
                                            </a>
                                            <span className='text-lg' >{comments.length}</span>
                                        </div>
                                    </div>


                                </div>

                                {/* actions */}
                                <div className='flex w-max'>
                                    <div
                                        className={`${isComments && "bg-pink-100"} p-3 border-2 border-r-0 border-pink-100  rounded-l-lg cursor-pointer`}
                                        onClick={() => setIsComments(true)}
                                    >Comments</div>
                                    <div
                                        className={`${!isComments && "bg-pink-100"} p-3 border-2 border-l-0 border-pink-100 rounded-r-lg cursor-pointer`}
                                        onClick={() => setIsComments(false)}
                                    >Description</div>
                                </div>

                                {/* switch: comment & description */}
                                {
                                    isComments ? (

                                        // comments
                                        <div id='comments'>
                                            {/* create new comment*/}
                                            <div className='flex w-full gap-3'>

                                                {/* input */}
                                                <div className='flex-1 shadown-lg'>
                                                    <input
                                                        type="text"
                                                        value={newComment}
                                                        onChange={(e) => setNewComment(e.target.value)}
                                                        className=' px-2 outline-1 outline-gray-200 border-2 border-gray-200 shadow-sm h-full w-full'
                                                        placeholder='eg. this is awesome' />
                                                </div>

                                                {/* create button */}
                                                {
                                                    <FilledBtn
                                                        sx={isCreating && 'border-none hover:shadow-none cursor-progress bg-transparent'}
                                                        content={
                                                            isCreating ? (
                                                                <div
                                                                    className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                                                    role="status">
                                                                    <span
                                                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                                                    >Loading...</span>
                                                                </div>
                                                            ) :
                                                                <>
                                                                    Create
                                                                </>
                                                        } onClick={async () => {
                                                            setIsCreating(true)
                                                            await dispatch(createComment({
                                                                userId: user._id,
                                                                workoutId: item._id,
                                                                content: newComment,
                                                                likes: []
                                                            }))
                                                            setIsCreating(false)
                                                            setNewComment("")
                                                        }} />
                                                }
                                            </div>

                                            {/* list */}
                                            <div className='mt-5 flex flex-col gap-2'>
                                                {
                                                    comments.map((item) => (
                                                        <Comment item={item} key={item._id} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ) : (

                                        // description
                                        <div id="description" className='text-justify bg-pink-100 p-3 w-full '>
                                            <div className='text-xl font-bold mb-5'>
                                                {item.title}
                                            </div>
                                            <div>
                                                {item.desc}
                                            </div>
                                        </div>

                                    )
                                }
                            </div>

                            {/* workout card */}
                            <div className=' basis-[350px] h-max hidden lg:block'>
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
                                            <div className=' p-5 w-full'>
                                                {/* name & like,comments */}
                                                <div className='flex items-center justify-between gap-2'>

                                                    {/* name */}
                                                    <Link to={`/home/my_workouts/${item._id}`}>
                                                        <h2 className=' text-xl capitalize font-semibold text-pink-900 flex-1' >{item.title.length > 25 ? item.title.substring(0, 25) + "..." : item.title}</h2>
                                                    </Link>

                                                    {/* likes and comments */}
                                                    <div className='flex gap-3 items-center'>
                                                        {/* likes */}
                                                        <div className='flex gap-3 items-center'>
                                                            {
                                                                item.likes.includes(user._id) ? (
                                                                    <AiFillHeart size={18} onClick={() => dislikeWorkoutHandler(item._id)} className={"cursor-pointer"} />
                                                                ) : (
                                                                    <AiOutlineHeart size={18} onClick={() => likeWorkoutHandler(item._id)} className={"cursor-pointer"} />
                                                                )
                                                            }
                                                            <span className='text-xs'>{item.likes.length}</span>
                                                        </div>
                                                        {/* comments */}
                                                        <div className='flex gap-3 items-center'>
                                                            <AiOutlineComment size={18} />
                                                            <span className='text-xs' >{comments.length}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            {/* time */}
                                            <div className='px-5 mb-4 flex justify-between'>
                                                <span className='text-sm font-semibold text-gray-600'>{format(item.createdAt)}</span>

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
                                                        superset with{" "}{supersetWorkout && supersetWorkout.title.substring(0, 15)}
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
                            </div>
                        </section>
                    )

                    :

                    // else show loading screen
                    ("")
            }
        </>
    )
}

export default ViewWorkout