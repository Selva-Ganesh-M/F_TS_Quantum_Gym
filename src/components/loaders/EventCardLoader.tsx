import React from 'react'

type Props = {}

const EventCardLoader = (props: Props) => {
    return (
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            {/* container */}
            <div className="animate-pulse flex flex-col space-x-4">
                {/* image */}
                <div className=" bg-slate-700 h-[280px] w-full"></div>

                {/* content */}
                <div className="flex-1 space-y-6 py-1">
                    {/* header */}
                    <div className='flex mt-5 justify-between'>
                        {/* name and rating */}

                        <div className='flex flex-col gap-5'>
                            <div className="h-2 w-[150px] bg-slate-700  rounded"></div>
                            <div className="h-2 w-[100px] bg-slate-700  rounded"></div>
                        </div>

                        {/* button */}
                        <div className="h-[40px] w-[100px] bg-slate-700  rounded"></div>

                    </div>

                    <hr className='h-0 border-t-2 w-full' />

                    {/* body */}
                    <div className="space-y-5">
                        <div className="h-2 w-[40%] bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 w-[60%] bg-slate-700 rounded col-span-1"></div>
                        <div className="h-2 w-[40%] bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCardLoader