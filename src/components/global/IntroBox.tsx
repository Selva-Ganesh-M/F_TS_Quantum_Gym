import React from 'react'
import HealthyGirl from "@/assets/healthy_girl.jpg"
import LiftingMan from "@/assets/lifting_man.jpg"
import FilledBtn from '../shared/FilledBtn'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { BsArrowRightCircleFill } from 'react-icons/bs'

type Props = {}

const IntroBox = (props: Props) => {
    return (
        <div className='w-full flex flex-col mt-10 md:mt-0 gap-10'>


            {/* first flex box */}
            <div className='
            flex flex-col justify-center items-center gap-5
            md:flex-row md:gap-5 md:items-center md:justify-center md:w-[80%] md:m-auto
            '>
                {/* top, left */}
                <div className='
                text-center w-[70%]
                 md:flex-[1] md:text-start
                '>
                    <h1 className='
                    font-bold mb-2 text-lg text-pink-900
                    md:text-2xl
                    xl:text-3xl
                    2xl:text-7xl
                     '>Feel Great. <br />
                        Let the world know.</h1>
                    <p className='
                    mb-4
                    lg:text-xl
                    xl:text-2xl
                    '>Choose from hundreds of events, happening all across the world. It's the perfect timing to see the man shining.</p>

                    {/* events button */}
                    <FilledBtn content={
                        "Events"
                    } to="/home/events" />
                </div>
                {/* bottom, right */}
                <div className='
                w-[80%]
                md:w-auto md:flex-1
                lg:flex-[1]
                '>
                    <img src={HealthyGirl} alt="" />
                </div>
            </div>

            {/* second flex box */}
            <div className='
            flex flex-col justify-center items-center
            md:flex-row md:gap-5 md:items-center md:justify-center md:w-[80%] md:m-auto
            '>
                {/* top, left */}
                <div className='
                w-[80%] order-2
                md:w-auto md:flex-1
                lg:flex-[1] md:order-1
                '>
                    <img src={LiftingMan} alt="" />
                </div>
                {/* bottom, right */}
                <div className='
                    text-center w-[70%]
                     md:flex-[1] md:text-start
                     md:order-2
                    '>
                    <h1 className='
                        font-bold mb-2 text-lg text-pink-900
                        md:text-2xl
                        xl:text-3xl
                        2xl:text-7xl
                         '>Lift Heavy. <br />
                        Respect the Grind.</h1>
                    <p className='
                        lg:text-xl
                        xl:text-2xl
                        mb-5
                        '>Choose from hundreds of workouts, healthy recipes, relaxing meditations, and expert articles, for a whole body and mind approach to feeling great.</p>

                    {/* my_workouts button */}
                    <FilledBtn content={
                        "Workouts"
                    } to="/home/my_workouts" />
                </div>
            </div>
        </div>
    )
}

export default IntroBox