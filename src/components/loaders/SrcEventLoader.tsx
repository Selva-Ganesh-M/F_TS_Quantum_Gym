import React from 'react'

type Props = {}

const SrcEventLoader = (props: Props) => {
    return (
        <>
            {/* loader */}
            <div className=" shadow rounded-md p-4 max-w-sm w-full mx-auto bg-white ">
                <div className="animate-pulse flex flex-col space-x-4">


                    {/* others */}
                    <div className="flex-1 space-y-6 py-1 ">
                        <div className='flex flex-col gap-3'>
                            {/* title and rating */}
                            <div className="h-2 bg-slate-600 rounded"></div>
                            <div className="h-2 bg-slate-600 rounded w-[50%]"></div>
                        </div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="h-2 bg-slate-600 rounded col-span-1"></div>
                                <div className="h-2 bg-slate-600 rounded col-span-2"></div>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="h-2 bg-slate-600 rounded col-span-1"></div>
                                <div className="h-2 bg-slate-600 rounded col-span-2"></div>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="h-2 bg-slate-600 rounded col-span-1"></div>
                                <div className="h-2 bg-slate-600 rounded col-span-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SrcEventLoader