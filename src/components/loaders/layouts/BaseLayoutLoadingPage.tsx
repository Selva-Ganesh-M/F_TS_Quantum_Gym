import React from 'react'

type Props = {}

const BaseLayoutLoadingPage = (props: Props) => {
    return (
        <div className="animate-pulse items-center w-1/2">

            {/* img */}
            <div className="bg-slate-700 h-[300px] md:h-[60vh] w-full rounded-3xl"></div>
        </div>
    )
}

export default BaseLayoutLoadingPage