import React from 'react'
import EventCardLoader from '../EventCardLoader'

type Props = {}

const ViewEventLoadingPage = (props: Props) => {
    return (
        <div className={`
        overflow-y-scroll h-[calc(100vh-72px)]
        flex flex-col gap-5 md:gap-3 justify-start p-3
        md:flex-row
        `}>
            {/* back and delete */}
            <div className=' flex md:flex md:flex-col gap-3 justify-start'>
                <div className='h-[40px] w-[40px] rounded-full bg-slate-400'></div>
                <div className='h-[40px] w-[40px] rounded-full bg-slate-400'></div>
            </div>

            {/* event card */}
            <EventCardLoader sx='max-w-3xl md:max-w-max lg:h-max' />

            {/* center and right wrapper */}
            <div className='md:flex-1 flex flex-col gap-5 md:h-full md:overflow-scroll lg:flex-row'>

                {/* description */}
                <div className='rounded-lg lg:flex-[2.5]'>
                    {/* header */}
                    <div className='h-16 w-full bg-slate-500 rounded-t-md'></div>

                    {/* body */}
                    <div className='h-[500px] md:h-[600px] bg-slate-400 animate-pulse rounded-b-md'>
                        <div className='flex flex-col gap-5 pt-6 px-4'>
                            <div className="h-2 w-[30%] bg-slate-600  rounded"></div>
                            <div className="h-2 w-[20%] bg-slate-600  rounded"></div>
                            <div className="h-2 mb-7 w-[30%] bg-slate-600  rounded"></div>
                            <div className="h-2 w-[90%] bg-slate-600  rounded"></div>
                            <div className="h-2 w-[90%] bg-slate-600  rounded"></div>
                            <div className="h-2 w-[90%] bg-slate-600  rounded"></div>
                            <div className="h-2 w-[90%] bg-slate-600  rounded"></div>
                            <div className="h-2 w-[90%] bg-slate-600  rounded"></div>
                            <div className="h-2 w-[90%] bg-slate-600  rounded"></div>
                            <div className="h-2 mb-7 w-[30%] bg-slate-600  rounded"></div>
                            <div className="h-2 w-[30%] bg-slate-600  rounded"></div>
                            <div className="h-2 w-[30%] bg-slate-600  rounded"></div>
                            <div className="h-2 w-[90%] bg-slate-600  rounded"></div>
                            <div className="h-2 w-[90%] bg-slate-600  rounded"></div>
                        </div>
                    </div>
                </div>

                {/* right wrapper */}
                <div className='lg:flex lg:flex-col lg:gap-3 lg:flex-[1]'>

                    {/* competitors */}
                    <div className='rounded-lg'>
                        {/* header */}
                        <div className='h-16 w-full bg-slate-500 rounded-t-md'></div>

                        {/* content */}
                        <div className='h-[200px] bg-slate-400 animate-pulse rounded-b-md py-3 px-5 flex flex-col gap-4'>

                            {/* item */}
                            <div className='flex gap-3 w-full items-center'>

                                {/* image */}
                                <div className='h-[40px] w-[40px] rounded-full bg-slate-500'></div>

                                {/* name */}
                                <div className='flex-1 flex flex-col gap-3'>
                                    <div className="h-2 w-[60%] sm-w-[40%] bg-slate-700  rounded"></div>
                                    <div className="h-2 w-[15%] sm-w-[20%] bg-slate-700  rounded"></div>
                                </div>

                                {/* age */}
                                <div className=''>
                                    <div className="h-2 w-[40px] bg-slate-700  rounded"></div>
                                </div>

                            </div>
                            {/* item */}
                            <div className='flex gap-3 w-full items-center'>

                                {/* image */}
                                <div className='h-[40px] w-[40px] rounded-full bg-slate-500'></div>

                                {/* name */}
                                <div className='flex-1 flex flex-col gap-3'>
                                    <div className="h-2 w-[60%] sm-w-[40%] bg-slate-700  rounded"></div>
                                    <div className="h-2 w-[15%] sm-w-[20%] bg-slate-700  rounded"></div>
                                </div>

                                {/* age */}
                                <div className=''>
                                    <div className="h-2 w-[40px] bg-slate-700  rounded"></div>
                                </div>

                            </div>
                            {/* item */}
                            <div className='flex gap-3 w-full items-center'>

                                {/* image */}
                                <div className='h-[40px] w-[40px] rounded-full bg-slate-500'></div>

                                {/* name */}
                                <div className='flex-1 flex flex-col gap-3'>
                                    <div className="h-2 w-[60%] sm-w-[40%] bg-slate-700  rounded"></div>
                                    <div className="h-2 w-[15%] sm-w-[20%] bg-slate-700  rounded"></div>
                                </div>

                                {/* age */}
                                <div className=''>
                                    <div className="h-2 w-[40px] bg-slate-700  rounded"></div>
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* contact */}
                    <div className='rounded-lg'>
                        {/* header */}
                        <div className='h-16 w-full bg-slate-500 rounded-t-md'></div>
                        <div className='h-[150px] bg-slate-400 animate-pulse rounded-b-md flex gap-3 px-5 py-4'>
                            {/* image */}
                            <div className='h-[40px] w-[40px] rounded-full bg-slate-500'></div>

                            {/* content */}
                            <div className='flex flex-col flex-1 '>

                                {/* info */}
                                <div className='flex flex-col gap-6'>
                                    <div className="h-2 w-[50%] bg-slate-700  rounded"></div>
                                    <div className="h-2 w-[25%] bg-slate-700  rounded"></div>
                                </div>

                                {/* contact btn */}
                                <div className="h-[40px] w-[100px] bg-slate-700  rounded mt-8"></div>


                            </div>
                        </div>
                    </div>

                </div>



            </div>


        </div>
    )
}

export default ViewEventLoadingPage