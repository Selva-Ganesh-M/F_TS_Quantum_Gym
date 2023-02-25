import React from 'react'
import { FcGoogle } from "react-icons/fc"

type Props = {
    variant?: string
}

const GoogleButton = ({ variant }: Props) => {
    return (
        <div className='flex hover:text-white items-center text-inherit' >
            <FcGoogle className={variant === "sm" ? "" : 'mr-5 text-lg'} />{variant === "sm" ? "" : "Sign In with Google"}
        </div>
    )
}

export default GoogleButton