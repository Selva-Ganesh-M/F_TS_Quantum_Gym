import EventCard from '@/components/cards/EventCard'
import React, { useEffect } from 'react'
import event1 from "../../../../assets/event1.jpg"
import { HiUser, HiUserGroup } from "react-icons/hi"
import { MdEmail } from "react-icons/md"
import OutlineBtn from '@/components/shared/OutlineBtn'
import FilledBtn from '@/components/shared/FilledBtn'
import { AiOutlineArrowLeft } from "react-icons/ai"
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectById } from '@/features/events/eventSlice'
import { TRootState } from '@/store/store'
import { getUser } from '@/features/user/authSlice'

type Props = {}

const ViewEvent = (props: Props) => {
    //#region : grabbing
    const navigate = useNavigate()
    const { id } = useParams()

    const event = useSelector((state: TRootState) => selectById(state, id!))!
    const user = useSelector(getUser).user
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
                w-screen h-[calc(100vh-72px)] 
                p-6  flex-col gap-y-5
                md:flex-row md:flex md:gap-5
                overflow-y-scroll
                ">

                    {/* back btn */}
                    <div className='w-max cursor-pointer md:block hidden'>
                        <BsFillArrowLeftCircleFill color='white' size={40} onClick={() => navigate(-1)} />
                    </div>

                    {/* left */}
                    <div id="left" className='flex flex-[1.5] flex-col gap-7'>

                        {/* event card */}
                        <div className='w-auto'>
                            <EventCard item={event} />
                        </div>
                    </div>


                    {/* center */}
                    <div id="center" className='mt-5 md:mt-0 flex-[4] bg-pink-100 rounded-lg overflow-y-scroll relative'>
                        {/* header */}
                        <div className='bg-pink-900 font-bold text-2xl p-5 rounded-t-lg sticky top-0' >
                            <h1 className='text-white'>{event.title}</h1>
                        </div>

                        {/* body */}
                        <div className='p-5'>
                            {event.desc}
                        </div>
                    </div>



                    {/* right */}
                    <div id="right" className='mt-5 md:mt-0 flex-[1.5] flex flex-col gap-6'>

                        {/* registered users */}
                        <div className='max-h-[310px] bg-pink-100 overflow-scroll relative shadow-md rounded-lg'>

                            {/* header */}
                            <div className='p-3 bg-pink-900 text-lg font-extrabold flex items-center gap-4 sticky top-0'>
                                {/* <HiUserGroup /> */}
                                <span className='text-white'>
                                    Competitors
                                </span>
                            </div>

                            {/* competitors */}
                            <div className=' flex flex-col gap-1 text-sm'>
                                {/* item */}
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
                                {/* item */}
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
                                {/* item */}
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
                                {/* item */}
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
                                {/* item */}
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


                            </div>
                        </div>

                        {/* event organizer */}
                        <div className='shadow-md overflow-clip rounded-lg'>

                            {/* header */}
                            <div className='bg-pink-900 font-bold text-white text-xl p-3'>Event Organizer</div>

                            {/* content */}
                            <div className='flex items-start gap-3 p-2 flex-col'>
                                {/* top */}
                                <div className='flex gap-3 items-center'>
                                    {/* left */}
                                    <div className='flex-[1] h-max bg-gray-600 rounded-full'>
                                        <img src={user.image} alt="" className='object-cover min-w-[32px] h-full rounded-full' />
                                    </div>

                                    {/* right */}
                                    <div>

                                        <h2>Selva Ganesh M</h2>
                                        <div className='flex gap-1 items-center '>
                                            <MdEmail />
                                            <p className='text-sm text-gray-600'> selvadev2k@gmail.com</p>
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
                </div >
            )
        }
    </>
    )
}

export default ViewEvent