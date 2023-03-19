import { api, TPayload } from '@/api/api'
import React, { useEffect, useState } from 'react'
import { TPUser } from "@/features/user/user.slice"

type Props = {
    _id: string
}

const EventMember = ({ _id }: Props) => {
    const [registeredUser, setRegisteredUser] = useState<TPUser>()
    useEffect(() => {
        (async () => {
            console.log(_id);

            const res = await api.get<TPayload<TPUser>>(`/users/${_id}`)
            if (res.data.statusText === "success") {
                setRegisteredUser(res.data.payload)
            }
        })()
    }, [_id])

    return (
        <>
            {registeredUser && (
                <div className='px-3 py-2 flex gap-3 items-center'>
                    {/* image */}
                    <div className='h-8 w-8 rounded-full overflow-hidden'>
                        <img src={registeredUser?.image} alt="" className='rounded-full h-8 w-8 object-cover' />
                    </div>

                    {/* username */}
                    <h3 className='flex-1 text-gray-600 uppercase' >{registeredUser.fullname ?? registeredUser.username}</h3>

                    {/* age */}
                    <h3 className='text-gray-600'>{registeredUser.age}</h3>

                </div>
            )}
        </>
    )
}

export default EventMember