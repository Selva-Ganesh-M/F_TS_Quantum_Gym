import React from 'react'
import HealthyGirl from "@/assets/healthy_girl.jpg"

type Props = {}

const IntroBox = (props: Props) => {
    return (
        <div className='w-full mt-10 md:mt-0'>


            {/* first flex box */}
            <div className='
            flex flex-col justify-center items-center
            md:flex-row md:gap-5 md:items-center md:justify-center md:w-[80%] md:m-auto
            '>
                {/* top, left */}
                <div className='
                text-center w-[70%]
                 md:flex-[2] md:text-start
                '>
                    <h1 className='
                    font-bold mb-2 text-lg text-pink-900
                    md:text-2xl
                    xl:text-4xl
                    2xl:text-7xl
                     '>Feel Great. <br />
                        Body and Mind.</h1>
                    <p className='
                    lg:text-xl
                    xl:text-3xl
                    '>Choose from hundreds of workouts, healthy recipes, relaxing meditations, and expert articles, for a whole body and mind approach to feeling great.</p>
                </div>
                {/* bottom, right */}
                <div className='
                w-[80%]
                md:w-auto md:flex-1
                lg:flex-[2]
                '>
                    <img src={HealthyGirl} alt="" />
                </div>
            </div>



            {/* second flex box */}
            <div></div>
        </div>
    )
}

export default IntroBox