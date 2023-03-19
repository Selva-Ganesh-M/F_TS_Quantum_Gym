import React from 'react'

type Props = {}

const WelcomeLoadingPage = (props: Props) => {
    return (
        <div className='flex-1 h-[calc(100vh-80px)] flex justify-center items-center'>
            <div className="animate-pulse flex flex-col w-3/4 md:w-full lg:w-[70%]">
                <div className="w-full space-y-8 md:space-y-12 flex flex-col items-center ">
                    <div className="h-10 bg-slate-700 rounded w-[90%] md:w-[45%]"></div>
                    <div className="h-7 bg-slate-700 rounded w-[80%] md:w-[60%]"></div>
                    <div className='flex flex-col md:flex-row gap-3 w-full md:w-[70%]'>

                        {/* buttons */}
                        <div className="flex-1 flex gap-3 ">
                            <div className="h-12 bg-slate-700 rounded flex-1"></div>
                            <div className="h-12 bg-slate-700 rounded flex-1"></div>
                        </div>

                        {/* google btn */}
                        <div className='flex gap-3 md:basis-[50px]'>
                            <div className="h-12 bg-slate-700 w-full basis-[50px] rounded-full md:hidden"></div>
                            <div className="h-12 bg-slate-700 md:rounded-full rounded-lg w-full flex-1 md:basis-[50px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeLoadingPage