import EventCard from '@/components/cards/EventCard'
import FilledBtn from '@/components/shared/FilledBtn'
import { getAllEvents, selectAllEvents } from '@/features/events/eventSlice'
import { changeHomeRoute, EHomeRoutes } from '@/features/routes/homeRoutesSlice'
import useMediaQuery from '@/hooks/useMediaQuery'
import { TStoreDispatch } from '@/store/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import event1 from "../../../../assets/event1.jpg"
import event2 from "../../../../assets/event2.png"

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
    const isAboveMobile = useMediaQuery("(min-width:426px")
    const events = useSelector(selectAllEvents)
    //#endregion

    //#region : custom-declarations

    //#endregion
    //#region : side-effects
    useEffect(() => {
        dispatch(changeHomeRoute(EHomeRoutes.events))

        return () => {
            dispatch(changeHomeRoute(EHomeRoutes.other))
        }
    }, [])

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
                    <h2 className='text-lg  md:text-3xl font-bold'>Upcoming Events</h2>

                    {/* create event */}
                    {
                        isAboveMobile ? (
                            <FilledBtn content={"Create Event"} to="/home/events/create" />

                        ) : (

                            <FilledBtn content={"+"} px="px-5" rounded='rounded-full' fz='text-2xl' />
                        )
                    }

                </div>

                {/* body */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 pt-6 pb-24">
                    {events.map(item => (
                        <EventCard item={item} key={item._id} />
                    ))}
                </div>

            </div>
        </section>
    )
}

export default EventsPage