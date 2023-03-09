import { changeHomeRoute, EHomeRoutes } from '@/features/routes/homeRoutesSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import BlueGirl from "@/assets/blue_girl.jpg"
import List from "@/assets/list.jpg"
import BlueRunningGirl from "@/assets/blue_running_girl.jpg"
import Typewriter from 'typewriter-effect';
import Typed from "react-typed"
import IntroBox from '@/components/global/IntroBox'
import Testimonials from '@/components/global/Testimonials'
import Contact from '@/components/global/Contact'
import Footer from '@/components/global/Footer'

type Props = {}

const GlobalPage = (props: Props) => {
    //#region : declarations
    const dispatch = useDispatch()
    //#endregion

    //#region : custom-declarations

    //#endregion

    //#region : side-effects
    useEffect(() => {
        dispatch(changeHomeRoute(EHomeRoutes.global))

        return () => {
            dispatch(changeHomeRoute(EHomeRoutes.other))
        }
    }, [])
    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <section className='w-full h-[calc(100vh-72px)] overflow-scroll'>
            {/* main banner */}
            <div className='md:h-[calc(100vh-72px)] w-full text-center mt-12
            sm:mt-16
            md:flex md:flex-row md:justify-center md:items-center md:mt-0
            '>
                {/* title */}
                <div className='flex-[2]'>
                    <h1 className='2xl:text-9xl xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl xs:text-4xl text-3xl font-extrabold sm:mb-5 mb-2'>Quantum Gym</h1>
                    <div className='lg:text-2xl md:text-xl sm:text-lg xs:text-md   gap-2 items-end flex justify-center'>
                        <span className=''>
                            - One stop for all
                        </span>
                        <Typed
                            className={"lg:text-4xl md:text-2xl sm:text-xl xs:text-lg text-pink-900"}
                            strings={[
                                "Workouts...",
                                "Events..."
                            ]}
                            style={{
                                color: "blue !important",
                            }}
                            typeSpeed={150}
                            backSpeed={100}
                            loop
                        />
                    </div>
                </div>
                {/* banner */}
                <div className='flex-1'>
                    <img src={BlueRunningGirl} alt="" />
                </div>
            </div>

            {/* second grid */}
            <IntroBox />

            {/* third banner */}
            <div className='m-auto w-max lg:block hidden'>
                <img src={List} alt="" className='h-[60vh]' />
            </div>

            {/* testimonials carousel */}
            <Testimonials />

            {/* contact us */}
            <Contact />

            {/* footer */}
            <Footer />
        </section>
    )
}

export default GlobalPage