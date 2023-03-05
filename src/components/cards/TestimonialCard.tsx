import { faker } from '@faker-js/faker'
import React from 'react'
type Props = {
    item: { _id: number, content: string, username: string, image: any, designition: string }
}

const TestimonialCard = ({ item }: Props) => {
    return (
        <div className='flex gap-3 items-start justify-start shadow-lg h-full border-2 mx-4 py-4 px-3 rounded-lg bg-white'>
            {/* image */}
            <img src={item.image} alt="" className='rounded-full w-[40px] h-[40px]' />

            {/* content */}
            <div className='flex flex-col gap-3 justify-between flex-1 h-full'>
                <div>{item.content}</div>
                <div className='flex items-end flex-col text-end'>
                    {/* username */}
                    <div className='font-bold text-base capitalize inline'>
                        <span className='font-normal'>-{" "}</span>  {item.username}</div>
                    {/* designation */}
                    <div className='text-xs'>{item.designition}</div>
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard