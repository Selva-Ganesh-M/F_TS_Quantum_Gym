import EventCard from '@/components/cards/EventCard'
import EventSearchCard from '@/components/cards/EventSearchCard'
import SrcEventLoader from '@/components/loaders/SrcEventLoader'
import FilledBtn from '@/components/shared/FilledBtn'
import { getAllEvents, getSrcResults, resetSrc, searchEvent, selectAllEvents, setLoading } from '@/features/events/eventSlice'
import { changeHomeRoute, EHomeRoutes } from '@/features/routes/homeRoutesSlice'
import { ETogglers, toggle } from '@/features/togglers/togglerSlice'
import useMediaQuery from '@/hooks/useMediaQuery'
import { TRootState, TStoreDispatch } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import NoResult from "../../../../assets/noResults.png"
import { getToggler } from '@/features/togglers/togglerSlice'
import EventCardLoader from '@/components/loaders/EventCardLoader'
import { getUser } from '@/features/user/authSlice'

export const notFound = NoResult

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

export enum EEventFilter {
    all = "Upcoming",
    myEvents = "My Events",
    registeredEVents = "Registered"
}

type Props = {}

const EventsPage = (props: Props) => {
    //#region : grabbing
    const toggler = useSelector(getToggler)
    const user = useSelector(getUser).user
    const dispatch: TStoreDispatch = useDispatch()
    const navigate = useNavigate()

    const eventsState = useSelector((state: TRootState) => state.events)
    const events = useSelector(selectAllEvents)
    const srcResults = useSelector(getSrcResults)

    const isAboveMobile = useMediaQuery("(min-width:426px")
    const collapseHeader = useMediaQuery("(min-width:860px")
    const shrunkInput = useMediaQuery("(min-width:461px)")
    const haveTitle = useMediaQuery("(min-width:540px)")
    //#endregion

    //#region : custom-declarations
    const [src, setSrc] = useState<string>("")
    const [eventsFilter, setEventsFilter] = useState<EEventFilter>(EEventFilter.all)
    const [shouldBeRenderd, setShouldBeRenderd] = useState<TPEvent[]>(events || [])

    //#endregion


    //#region : side-effects

    // handling the routing
    useEffect(() => {
        dispatch(changeHomeRoute(EHomeRoutes.events))
        return () => {
            dispatch(changeHomeRoute(EHomeRoutes.other))
        }
    }, [])

    // fires and fetches data when the search keyword is changed.
    useEffect(() => {
        if (src) {
            dispatch(searchEvent(src))
        } else {
            dispatch(resetSrc())
        }
    }, [src])

    // loading events for the first time
    useEffect(() => {
        dispatch(getAllEvents())
    }, [])

    // handled fitering events when the filter value changes
    useEffect(() => {
        if (eventsFilter === EEventFilter.all) {
            setShouldBeRenderd(events)
        } else if (eventsFilter === EEventFilter.myEvents) {
            setShouldBeRenderd(events.filter(event => event.userId === user._id))
        } else if (eventsFilter === EEventFilter.registeredEVents) {
            setShouldBeRenderd(events.filter(event => event.registrations.includes(user._id)))
        }
    }, [eventsFilter, events])

    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <section id="events" className='flex w-full h-[calc(100vh-72px)] relative'>


            {/* main */}
            <div className='flex-1 h-full overflow-scroll overflow-x-hidden relative '>


                {/* header */}
                <div className="flex justify-between items-center py-3 px-4 bg-pink-200 sticky z-40 top-0">

                    {/* title */}
                    <div className={`flex items-center ${collapseHeader ? "gap-3" : "gap-0"}`}>
                        {/* conditional title rendering and responsiveness */}
                        <>
                            {
                                haveTitle && (
                                    collapseHeader ? (
                                        <h2 className='text-xs  md:text-3xl font-bold w-max'>{eventsFilter}</h2>
                                    ) : (
                                        <h2 className='text-lg  md:text-3xl font-bold w-max'>{eventsFilter}</h2>
                                    )
                                )
                            }
                        </>
                        {/* filter */}
                        <div className='cursor-pointer relative' >
                            {/* icons */}
                            <AiOutlineCaretDown onClick={() => dispatch(toggle(ETogglers.eventFilterbar))} />

                            {/* menu */}{
                                toggler.eventFilterbar && (

                                    <div className='w-[200px] h-max bg-white shadow-xl rounded-lg overflow-clip  absolute top-[50px]  z-[48]'>
                                        <div
                                            onClick={() => {
                                                dispatch(toggle(ETogglers.eventFilterbar))
                                                setEventsFilter(EEventFilter.all)
                                            }}
                                            className={`p-2 
                                        ${eventsFilter === EEventFilter.all ? "bg-pink-500 text-white" : "bg-white text-black hover:bg-pink-100"}`}>
                                            All Events
                                        </div>
                                        <div
                                            onClick={() => {
                                                dispatch(toggle(ETogglers.eventFilterbar))
                                                setEventsFilter(EEventFilter.registeredEVents)
                                            }}
                                            className={`p-2 
                                        ${eventsFilter === EEventFilter.registeredEVents ? "bg-pink-500 text-white" : "bg-white text-black hover:bg-pink-100"}`}>
                                            Registered Events
                                        </div>
                                        <div
                                            onClick={() => {
                                                dispatch(toggle(ETogglers.eventFilterbar))
                                                setEventsFilter(EEventFilter.myEvents)
                                            }}
                                            className={`p-2 
                                        ${eventsFilter === EEventFilter.myEvents ? "bg-pink-500 text-white" : "bg-white text-black hover:bg-pink-100"}`}>
                                            My Events
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    {/* search */}
                    <div className='flex gap-2 items-center'>
                        <div className='relative'>


                            {/* search bar */}
                            <input
                                type="text"
                                value={src}
                                onChange={((e) => setSrc(e.target.value))}
                                placeholder='eg. Quantum wars'
                                className={`px-2 py-2 ${shrunkInput ? "w-[325px]" : ""} focus:outline-none`} />



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
                                                            <EventSearchCard item={item} key={item._id} />
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
                    </div>

                    {/* create Button */}
                    <div className=''>


                        {/* create buttton */}
                        {
                            collapseHeader ? (
                                <FilledBtn content={"Create Event"} to="/home/events/create" />

                            ) : (

                                <FilledBtn content={"+"} px="px-5" rounded='rounded-full' fz='text-2xl' />
                            )
                        }

                        {/* <div onClick={() => dispatch(setLoading())}>set loading</div> */}

                    </div>

                </div>

                {/* body */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 pt-6 pb-24 relative ">
                    {
                        eventsState.loading ? (
                            [...Array(10).keys()].map((item, index) => (
                                <EventCardLoader key={index} />

                            ))
                        ) : (

                            shouldBeRenderd.length > 0 ? (
                                shouldBeRenderd.map(item => (
                                    <EventCard item={item} key={item._id} />
                                ))

                            ) : (
                                <div className='top-[50%] left-[50%] translate-x-[-50%] m-auto flex flex-col gap-5 absolute'>
                                    <img src={NoResult} alt="" />
                                    <span className='text-center'>No results found.</span>
                                    <span className='text-center'>
                                        {eventsFilter === EEventFilter.all ?
                                            (
                                                <>
                                                    <span>no events found.</span>
                                                    <Link to={"/home/events/create"}>Create your first event.</Link>
                                                </>
                                            ) : eventsFilter === EEventFilter.myEvents ?
                                                (<Link to={"/home/events/create"}>Create your first event.</Link>) : (<Link to={"/home/events/"} onClick={() => setEventsFilter(EEventFilter.all)}>Enroll your first event.</Link>)}
                                    </span>
                                </div>
                            )
                        )
                    }

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