import EventCard from '@/components/cards/EventCard'
import FilledBtn from '@/components/shared/FilledBtn'
import OutlineBtn from '@/components/shared/OutlineBtn'
import { changeHomeRoute, EHomeRoutes } from '@/features/routes/homeRoutesSlice'
import useMediaQuery from '@/hooks/useMediaQuery'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import girl from "../../../assets/bodyBuilder.jpg"
import event1 from "../../../../assets/event1.jpg"
import event2 from "../../../../assets/event2.png"


const events = [
    {
        _id: 1,
        title: "Quantum war",
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum suscipit, totam explicabo temporibus debitis in dicta deserunt mollitia consectetur error voluptatem earum facilis veniam maxime culpa, dolorem facere. Eaque architecto eos odit nemo aut sint, tempore sapiente temporibus quae, aspernatur consequuntur neque modi, officia id veritatis placeat vero necessitatibus ex tenetur cum provident! Earum quod deleniti ipsum non atque aut ullam ratione eum temporibus, et possimus tempora hic placeat provident quam similique quasi ex nostrum delectus ipsa dolorum saepe nulla accusamus totam! Animi natus sequi veniam unde obcaecati sint ex eveniet, blanditiis optio? Nesciunt, ipsum iusto! Voluptatibus velit fugiat at voluptatum ipsum deleniti, impedit inventore cum corrupti vero eligendi cumque odit temporibus similique ea nesciunt soluta! Reiciendis, blanditiis officiis. Nihil, sequi delectus totam sapiente ratione architecto vitae non, vel magni tempore modi praesentium similique voluptatibus quis a alias cupiditate ea temporibus voluptate consectetur perferendis! Debitis aspernatur odit incidunt non repudiandae.",
        date: new Date(),
        prize: ["1M", "100k", "50k"],
        location: "tuticorin",
        registrations: [],
        img: event1,
        rating: [true, true, true, true, false]
    },
    {
        _id: 2,
        title: "Light weight baby",
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum suscipit, totam explicabo temporibus debitis in dicta deserunt mollitia consectetur error voluptatem earum facilis veniam maxime culpa, dolorem facere. Eaque architecto eos odit nemo aut sint, tempore sapiente temporibus quae, aspernatur consequuntur neque modi, officia id veritatis placeat vero necessitatibus ex tenetur cum provident! Earum quod deleniti ipsum non atque aut ullam ratione eum temporibus, et possimus tempora hic placeat provident quam similique quasi ex nostrum delectus ipsa dolorum saepe nulla accusamus totam! Animi natus sequi veniam unde obcaecati sint ex eveniet, blanditiis optio? Nesciunt, ipsum iusto! Voluptatibus velit fugiat at voluptatum ipsum deleniti, impedit inventore cum corrupti vero eligendi cumque odit temporibus similique ea nesciunt soluta! Reiciendis, blanditiis officiis. Nihil, sequi delectus totam sapiente ratione architecto vitae non, vel magni tempore modi praesentium similique voluptatibus quis a alias cupiditate ea temporibus voluptate consectetur perferendis! Debitis aspernatur odit incidunt non repudiandae.",
        date: new Date(),
        prize: ["1M", "100k", "50k"],
        location: "tuticorin",
        registrations: [],
        img: event2,
        rating: [true, true, true, true, true]
    },
    {
        _id: 3,
        title: "Quantum war",
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum suscipit, totam explicabo temporibus debitis in dicta deserunt mollitia consectetur error voluptatem earum facilis veniam maxime culpa, dolorem facere. Eaque architecto eos odit nemo aut sint, tempore sapiente temporibus quae, aspernatur consequuntur neque modi, officia id veritatis placeat vero necessitatibus ex tenetur cum provident! Earum quod deleniti ipsum non atque aut ullam ratione eum temporibus, et possimus tempora hic placeat provident quam similique quasi ex nostrum delectus ipsa dolorum saepe nulla accusamus totam! Animi natus sequi veniam unde obcaecati sint ex eveniet, blanditiis optio? Nesciunt, ipsum iusto! Voluptatibus velit fugiat at voluptatum ipsum deleniti, impedit inventore cum corrupti vero eligendi cumque odit temporibus similique ea nesciunt soluta! Reiciendis, blanditiis officiis. Nihil, sequi delectus totam sapiente ratione architecto vitae non, vel magni tempore modi praesentium similique voluptatibus quis a alias cupiditate ea temporibus voluptate consectetur perferendis! Debitis aspernatur odit incidunt non repudiandae.",
        date: new Date(),
        prize: ["1M", "100k", "50k"],
        location: "tuticorin",
        registrations: [],
        img: event1,
        rating: [true, true, true, true, false]
    },
    {
        _id: 4,
        title: "Light weight baby",
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum suscipit, totam explicabo temporibus debitis in dicta deserunt mollitia consectetur error voluptatem earum facilis veniam maxime culpa, dolorem facere. Eaque architecto eos odit nemo aut sint, tempore sapiente temporibus quae, aspernatur consequuntur neque modi, officia id veritatis placeat vero necessitatibus ex tenetur cum provident! Earum quod deleniti ipsum non atque aut ullam ratione eum temporibus, et possimus tempora hic placeat provident quam similique quasi ex nostrum delectus ipsa dolorum saepe nulla accusamus totam! Animi natus sequi veniam unde obcaecati sint ex eveniet, blanditiis optio? Nesciunt, ipsum iusto! Voluptatibus velit fugiat at voluptatum ipsum deleniti, impedit inventore cum corrupti vero eligendi cumque odit temporibus similique ea nesciunt soluta! Reiciendis, blanditiis officiis. Nihil, sequi delectus totam sapiente ratione architecto vitae non, vel magni tempore modi praesentium similique voluptatibus quis a alias cupiditate ea temporibus voluptate consectetur perferendis! Debitis aspernatur odit incidunt non repudiandae.",
        date: new Date(),
        prize: ["1M", "100k", "50k"],
        location: "tuticorin",
        registrations: [],
        img: event2,
        rating: [true, true, true, true, true]
    },
    {
        _id: 5,
        title: "Quantum war",
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum suscipit, totam explicabo temporibus debitis in dicta deserunt mollitia consectetur error voluptatem earum facilis veniam maxime culpa, dolorem facere. Eaque architecto eos odit nemo aut sint, tempore sapiente temporibus quae, aspernatur consequuntur neque modi, officia id veritatis placeat vero necessitatibus ex tenetur cum provident! Earum quod deleniti ipsum non atque aut ullam ratione eum temporibus, et possimus tempora hic placeat provident quam similique quasi ex nostrum delectus ipsa dolorum saepe nulla accusamus totam! Animi natus sequi veniam unde obcaecati sint ex eveniet, blanditiis optio? Nesciunt, ipsum iusto! Voluptatibus velit fugiat at voluptatum ipsum deleniti, impedit inventore cum corrupti vero eligendi cumque odit temporibus similique ea nesciunt soluta! Reiciendis, blanditiis officiis. Nihil, sequi delectus totam sapiente ratione architecto vitae non, vel magni tempore modi praesentium similique voluptatibus quis a alias cupiditate ea temporibus voluptate consectetur perferendis! Debitis aspernatur odit incidunt non repudiandae.",
        date: new Date(),
        prize: ["1M", "100k", "50k"],
        location: "tuticorin",
        registrations: [],
        img: event1,
        rating: [true, true, true, true, false]
    },
    {
        _id: 6,
        title: "Light weight baby",
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum suscipit, totam explicabo temporibus debitis in dicta deserunt mollitia consectetur error voluptatem earum facilis veniam maxime culpa, dolorem facere. Eaque architecto eos odit nemo aut sint, tempore sapiente temporibus quae, aspernatur consequuntur neque modi, officia id veritatis placeat vero necessitatibus ex tenetur cum provident! Earum quod deleniti ipsum non atque aut ullam ratione eum temporibus, et possimus tempora hic placeat provident quam similique quasi ex nostrum delectus ipsa dolorum saepe nulla accusamus totam! Animi natus sequi veniam unde obcaecati sint ex eveniet, blanditiis optio? Nesciunt, ipsum iusto! Voluptatibus velit fugiat at voluptatum ipsum deleniti, impedit inventore cum corrupti vero eligendi cumque odit temporibus similique ea nesciunt soluta! Reiciendis, blanditiis officiis. Nihil, sequi delectus totam sapiente ratione architecto vitae non, vel magni tempore modi praesentium similique voluptatibus quis a alias cupiditate ea temporibus voluptate consectetur perferendis! Debitis aspernatur odit incidunt non repudiandae.",
        date: new Date(),
        prize: ["1M", "100k", "50k"],
        location: "tuticorin",
        registrations: [],
        img: event2,
        rating: [true, true, true, true, true]
    },
]

export type TEvent = {
    _id: number;
    title: string;
    desc: string;
    date: Date;
    prize: string[];
    location: string;
    registrations: Array<string>;
    img: string;
    rating: boolean[];
};

type Props = {}

const EventsPage = (props: Props) => {
    //#region : grabbing
    const dispatch = useDispatch()
    const isAboveMobile = useMediaQuery("(min-width:426px")
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
    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <section id="events" className='flex w-full h-[calc(100vh-72px)] relative'>


            {/* left */}
            <div className='flex-1 h-full overflow-scroll overflow-x-hidden relative'>


                {/* header */}
                <div className="flex justify-between items-center py-3 px-4 bg-pink-100 sticky z-40 top-0">
                    {/* title */}
                    <h2 className='text-lg  md:text-3xl font-bold'>Upcoming Events</h2>

                    {/* create event */}
                    {
                        isAboveMobile ? (
                            <FilledBtn content={"Create Event"} />

                        ) : (

                            <FilledBtn content={"+"} px="px-5" rounded='rounded-full' fz='text-2xl' />
                        )
                    }

                </div>

                {/* body */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 pt-6 pb-24">
                    {events.map(item => (
                        <EventCard item={item} />
                    ))}
                </div>

            </div>


            {/* right */}
            {/* <img src={girl} alt="girl-image" className='w-[700px] h-full overflow-hidden absolute top-0 right-0' /> */}
        </section>
    )
}

export default EventsPage