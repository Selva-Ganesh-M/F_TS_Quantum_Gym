import React from 'react'
import gym_vector from "@/assets/gym_vector.jpg"
type Props = {}

const BaseLogo = (props: Props) => {
    return (
        <div className="basis-1/2 ">
            <img
                className="object-cover h-full"
                src={gym_vector}
                alt="quantum-gym-logo"
            // className="absolute top-0"
            />
        </div>
    )
}

export default BaseLogo