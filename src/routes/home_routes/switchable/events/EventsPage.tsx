import EventCard from '@/components/cards/EventCard'
import EventSearchCard from '@/components/cards/EventSearchCard'
import SrcEventLoader from '@/components/loaders/SrcEventLoader'
import FilledBtn from '@/components/shared/FilledBtn'
import { getAllEvents, getSrcResults, resetSrc, searchEvent, selectAllEvents } from '@/features/events/eventSlice'
import { changeHomeRoute, EHomeRoutes } from '@/features/routes/homeRoutesSlice'
import useMediaQuery from '@/hooks/useMediaQuery'
import { TRootState, TStoreDispatch } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NoResult from "../../../../assets/noResults.png"

export type TPEvent = {
    _id: string;
    title: string;
    desc: string;
    date: string;
    location: string;
    registrations: Array<string>;
    img: string;
    rating: number;
    userId: string;
};

type Props = {}

const EventsPage = (props: Props) => {
    //#region : grabbing
    const dispatch: TStoreDispatch = useDispatch()
    const navigate = useNavigate()

    const eventsState = useSelector((state: TRootState) => state.events)
    const events = useSelector(selectAllEvents)
    const srcResults = useSelector(getSrcResults)

    const isAboveMobile = useMediaQuery("(min-width:426px")
    const collapseHeader = useMediaQuery("(min-width:860px")
    const shrunkInput = useMediaQuery("(min-width:461px)")
    //#endregion

    //#region : custom-declarations
    const [src, setSrc] = useState<string>("")

    //#endregion
    //#region : side-effects
    useEffect(() => {
        dispatch(changeHomeRoute(EHomeRoutes.events))

        return () => {
            dispatch(changeHomeRoute(EHomeRoutes.other))
        }
    }, [])

    useEffect(() => {
        if (src) {
            dispatch(searchEvent(src))
        } else {
            dispatch(resetSrc())
        }
    }, [src])

    // loading events
    useEffect(() => {
        dispatch(getAllEvents())
    }, [])
    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <section id="events" className='flex w-full h-[calc(100vh-72px)] relative'>


            {/* main */}
            <div className='flex-1 h-full overflow-scroll overflow-x-hidden relative'>


                {/* header */}
                <div className="flex justify-between items-center py-3 px-4 bg-pink-100 sticky z-40 top-0">
                    {/* title */}
                    {
                        collapseHeader && (
                            <h2 className='text-lg  md:text-3xl font-bold w-max'>Upcoming Events</h2>

                        )
                    }

                    {/* search */}
                    <div className='flex gap-2 items-center'>
                        <div className='relative'>


                            {/* search bar */}
                            <input
                                type="text"
                                value={src}
                                onChange={((e) => setSrc(e.target.value))}
                                placeholder='eg. Quantum wars'
                                className={`px-2 py-2 xs:w-[325px] focus:outline-none`} />



                            {/* src results */}
                            {
                                src.length > 0 && (
                                    <div className='w-full  absolute bg-pink-50 bg-opacity-0 top-14 rounded-lg '>

                                        {/* header */}
                                        <div className={`sticky top-0 p-3 text-white ${eventsState.isSearching ? "bg-white opacity-[0.95]" : "bg-pink-800"} z-[49] my-3 rounded-lg`} >
                                            {
                                                eventsState.isSearching ? (
                                                    <div role="status" className='flex justify-center' >
                                                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                    </div>
                                                ) : (
                                                    `Found: ${srcResults.length} results`
                                                )
                                            }
                                        </div>

                                        {/* content */}
                                        <div className='relative max-h-[405px] overflow-y-scroll flex flex-col gap-3 rounded-lg'>
                                            {/* src results */}
                                            {
                                                eventsState.isSearching ? (
                                                    <>
                                                        <SrcEventLoader />
                                                        <SrcEventLoader />
                                                        <SrcEventLoader />
                                                    </>
                                                ) : (
                                                    srcResults.length > 0 ? (
                                                        srcResults.map(item => (
                                                            <EventSearchCard item={item} />
                                                        ))
                                                    ) : (
                                                        <div className='bg-white p-3 flex flex-col justify-center'>
                                                            <img src={NoResult} alt="" />
                                                            <span className='m-auto text-sm'>Try searching for other keywords</span>
                                                        </div>
                                                    )
                                                )
                                            }

                                        </div>

                                    </div>
                                )
                            }

                        </div>
                        <BsSearch size={20} className={"cursor-pointer"} />
                    </div>

                    {/* create Button */}
                    {
                        collapseHeader ? (
                            <FilledBtn content={"Create Event"} to="/home/events/create" />

                        ) : (

                            <FilledBtn content={"+"} px="px-5" rounded='rounded-full' fz='text-2xl' />
                        )
                    }

                </div>

                {/* body */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 pt-6 pb-24 relative">
                    {events.map(item => (
                        <EventCard item={item} key={item._id} />
                    ))}

                    {/* page will be blurred whenever the search bar is open */}
                    {
                        src.length > 0 && (
                            <div className='absolute w-full h-full bg-gray-900 opacity-75 z-[39]'></div>

                        )
                    }
                </div>

            </div>
        </section>
    )
}

export default EventsPage