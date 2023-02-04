import React from 'react'
import { FcGoogle } from "react-icons/fc"

type Props = {}

const GoogleButton = (props: Props) => {
    return (
        <div className='flex hover:text-white items-center text-inherit' >
            <FcGoogle className='mr-5 text-lg' />Sign In with Google
        </div>
    )
}

export default GoogleButton