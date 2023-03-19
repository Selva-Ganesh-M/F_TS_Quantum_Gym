import React from 'react'

type Props = {}

const GlobalLoadingPage = (props: Props) => {
    return (
        <div className='w-[80%] sm:w-[70%] md:w-[80%] m-auto h-[calc(100vh-72px)] overflow-scroll'>

            {/* seciton 1 */}
            <div className="animate-pulse flex flex-col md:flex-row gap-14 mt-16 items-center">

                {/* text */}
                <div className="w-full space-y-8 md:space-y-12 flex flex-col ">
                    <div className="h-6 bg-slate-700 rounded w-[90%] md:w-[70%]"></div>
                    <div className="h-6 bg-slate-700 rounded w-[80%] md:w-[60%]"></div>
                    <div className='flex gap-3 w-[50%]'>
                        <div className="h-6 bg-slate-700 rounded flex-1"></div>
                        <div className="h-6 bg-slate-700 rounded flex-1"></div>
                    </div>
                </div>

                {/* img */}
                <div className="bg-slate-700 h-[300px] md:h-[60vh] w-full rounded-3xl"></div>
            </div>

            {/* seciton 2 */}
            <div className="animate-pulse flex flex-col md:flex-row gap-14 md:gap-16 mt-16 items-center w-full">

                {/* img */}
                <div className='flex justify-center items-center flex-1'>
                    <div className="bg-slate-700 h-[250px] w-[250px] md:h-[300px] md:w-[300px] rounded-full"></div>
                </div>

                {/* text */}
                <div className="space-y-8 w-full md:w-full flex-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="h-2 bg-slate-700 rounded w-[85%]"></div>
                    <div className="h-2 bg-slate-700 rounded w-[25%]"></div>
                </div>

            </div>

            {/* seciton 3 */}
            <div className="animate-pulse flex flex-col md:flex-row gap-14 md:gap-16 mt-16 items-center w-full mb-16">


                {/* text */}
                <div className="space-y-8 w-full md:w-full flex-1 order-[2] md:order-[1]">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="h-2 bg-slate-700 rounded w-[85%]"></div>
                    <div className="h-2 bg-slate-700 rounded w-[25%]"></div>
                </div>

                {/* img */}
                <div className='flex justify-center items-center flex-1 order-[1] md:order-[2]'>
                    <div className="bg-slate-700 h-[250px] w-[250px] md:h-[300px] md:w-[300px] rounded-full"></div>
                </div>

            </div>



        </div >
    )
}

export default GlobalLoadingPage