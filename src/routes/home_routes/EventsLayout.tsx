import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const EventsLayout = (props: Props) => {
    return (
        <Outlet />
    )
}

export default EventsLayout