import useMediaQuery from '@/hooks/useMediaQuery'
import React from 'react'
import EventCardLoader from '../EventCardLoader'

type Props = {}

const ViewWorkoutLoadingPage = (props: Props) => {
    const isLap = useMediaQuery('(min-width:1024px)')
    return (
        <div className='h-[calc(100vh-72px)]] flex p-5 gap-3'>
            {/* left  */}

            <div className='hidden md:flex flex-col gap-3 justify-start'>
                <div className='h-[40px] w-[40px] rounded-full bg-slate-400'></div>
                <div className='h-[40px] w-[40px] rounded-full bg-slate-400'></div>
            </div>

            {/* middle */}
            <div className='flex flex-col flex-1 h-[calc(100vh-92px)] overflow-scroll gap-3'>

                {/* video and title */}
                <div>
                    {/* video */}
                    <div className="h-[90vh] bg-slate-700 animate-pulse "></div>
                    {/* title and likes comnts*/}
                    <div className='flex justify-between items-center mt-5'>
                        {/* title */}
                        <div className='flex flex-col items-start gap-3'>
                            <div className='h-2 bg-slate-700 animate-pulse w-[200px]'></div>
                            <div className='h-2 bg-slate-700 animate-pulse w-[50px]'></div>

                        </div>

                        {/* like and comments */}
                        <div className='flex gap-3 items-center'>
                            <div className="flex items-center gap-2">
                                <div className='h-[40px] w-[40px] rounded-full bg-slate-400'></div>
                                <div className='h-2 bg-slate-700 animate-pulse'></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className='h-[40px] w-[40px] rounded-full bg-slate-400'></div>
                                <div className='h-2 bg-slate-700 animate-pulse'></div>
                            </div>

                        </div>
                    </div>


                </div>

                {/* switch */}
                <div className='h-[2rem] bg-slate-700 animate-pulse w-[400px]'></div>

                {/* create commmnt */}
                <div className='flex gap-5 justify-between'>
                    {/* input  */}
                    <div className='h-8 bg-slate-700 animate-pulse w-[80%] mt-4'></div>
                    {/* button */}
                    <div className='h-8 bg-slate-700 animate-pulse w-[15%] mt-4'></div>
                </div>

            </div>

            {/* right */}
            {
                isLap && <EventCardLoader />
            }
        </div>
    )
}

export default ViewWorkoutLoadingPage