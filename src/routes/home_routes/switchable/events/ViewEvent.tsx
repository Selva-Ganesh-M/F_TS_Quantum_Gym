import EventCard from '@/components/cards/EventCard'
import React, { useEffect } from 'react'
import event1 from "../../../../assets/event1.jpg"
import { HiUser, HiUserGroup } from "react-icons/hi"
import { MdEmail } from "react-icons/md"
import OutlineBtn from '@/components/shared/OutlineBtn'
import FilledBtn from '@/components/shared/FilledBtn'
import { AiOutlineArrowLeft } from "react-icons/ai"
import { BiTrash } from "react-icons/bi"
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEvent, selectById } from '@/features/events/eventSlice'
import { TRootState, TStoreDispatch } from '@/store/store'
import { getUser } from '@/features/user/authSlice'
import useMediaQuery from '@/hooks/useMediaQuery'
import { deleteImg } from '@/utils/deleteFromFirebase'

type Props = {}

const ViewEvent = (props: Props) => {
    //#region : grabbing
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch: TStoreDispatch = useDispatch()

    const event = useSelector((state: TRootState) => selectById(state, id!))!
    const user = useSelector(getUser).user
    const isDeleting = useSelector((state: TRootState) => state.events.isDeleting)
    const isLaptop = useMediaQuery("(min-width:1024px)")
    //#endregion

    //#region : custom-declarations

    const Competitors = []
    //#endregion

    //#region : side-effects
    useEffect(() => {
        console.log(id, event);
        if (id && !event) {
            navigate("/home/events")
        }
    }, [event])

    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (<>
        {
            event && (
                <div className="
                w-screen h-[calc(100vh-80px)] 
                p-6  flex-col gap-y-5
                md:flex-row md:flex md:gap-5
                overflow-y-scroll
                relative
                ">

                    {/* back btn */}
                    <div className='w-max cursor-pointer hidden md:sticky md:top-0 md:flex md:flex-col md:gap-5 items-center'>
                        <BsFillArrowLeftCircleFill color='white' size={40} onClick={() => navigate(-1)} />
                        <BiTrash
                            color='white'
                            size={50}
                            className={`${isDeleting ? "cursor-wait" : "cursor-pointer"} rounded-full hover:bg-red-100 p-2`}
                            onClick={async () => {
                                await deleteImg(event.img)
                                await dispatch(deleteEvent(event._id))
                            }}
                        />
                    </div>

                    {/* left */}
                    <div id="left" className='flex flex-col md:max-w-[300px] gap-7 md:sticky md:top-0'>

                        {/* event card */}
                        <div className='w-auto'>
                            <EventCard item={event} />
                        </div>
                    </div>


                    {/* center + right */}
                    <div className={`${isLaptop ? "flex gap-5" : "flex flex-col gap-5"} h-full flex-1`}>


                        {/* center */}
                        <div id="center" className='mt-5 md:mt-0 flex-[4] bg-pink-50 rounded-lg overflow-y-scroll min-h-full h-full relative'>
                            {/* header */}
                            <div className='bg-pink-900 font-bold text-2xl p-5 rounded-t-lg sticky top-0 ' >
                                <h1 className='text-white'>{event.title}</h1>
                            </div>

                            {/* body */}
                            <div className='p-5'>
                                {event.desc}
                            </div>
                        </div>


                        {/* right */}
                        <div id="right" className={`mt-5 md:mt-0 flex-[1.5] flex flex-col md:w-full md:m-auto justify-center md:flex-col gap-6 sm:flex-row"} mb-5`}>

                            {/* Competitors */}
                            <div className='max-h-[310px] bg-pink-100 overflow-scroll relative shadow-md rounded-lg '>

                                {/* header */}
                                <div className='p-3 bg-pink-900 text-lg font-extrabold flex items-center gap-4 sticky top-0'>
                                    {/* <HiUserGroup /> */}
                                    <span className='text-white'>
                                        Competitors
                                    </span>
                                </div>

                                {/* competitors list */}
                                <div className=' flex flex-col gap-1 text-sm'>
                                    {
                                        event.registrations.length > 0 ? (event.registrations.map(event => (
                                            <div className='px-3 py-2 flex gap-3 items-center'>
                                                {/* image */}
                                                <div className='h-8 w-8 rounded-full overflow-hidden'>
                                                    <img src={event1} alt="" className='rounded-full h-8 w-8 object-cover' />
                                                </div>

                                                {/* username */}
                                                <h3 className='flex-1 text-gray-600 uppercase' >SELVA GANESH M</h3>

                                                {/* age */}
                                                <h3 className='text-gray-600'>23</h3>

                                            </div>
                                        ))) : (
                                            <div className='p-3'>Be the first to register for this event.</div>
                                        )
                                    }



                                </div>
                            </div>

                            {/* event organizer */}
                            <div className='shadow-lg bg-pink-100 overflow-clip rounded-lg h-max flex-1'>

                                {/* header */}
                                <div className='bg-pink-900 font-bold text-white text-lg p-3'>Event Organizer</div>

                                {/* content */}
                                <div className='flex items-start gap-3 p-2 flex-col'>
                                    {/* top */}
                                    <div className='flex gap-3 items-center '>
                                        {/* left */}
                                        <div className='flex-[1] bg-gray-600 rounded-full w-[40px]'>
                                            <img src={user.image} alt="" className='bg-gray-600 object-cover rounded-full' />
                                        </div>

                                        {/* right */}
                                        <div>

                                            <h2>{user.username}</h2>
                                            <div className='flex gap-1 items-center '>
                                                <MdEmail />
                                                <p className='text-sm text-gray-600'> {user.email}</p>
                                            </div>
                                        </div>


                                    </div>
                                    {/* bottom */}
                                    <div className='flex-[2] py-2 flex flex-col gap-3'>
                                        <OutlineBtn
                                            p="p-2"
                                            width="w-max"
                                            content={<a href="mailto:selvadev@k@gmail.com"
                                            >contact</a>}></OutlineBtn>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div >
            )
        }
    </>
    )
}

export default ViewEvent