import { changeHomeRoute, EHomeRoutes } from '@/features/routes/homeRoutesSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

type Props = {}

const EventsPage = (props: Props) => {
    //#region : declarations
    const dispatch = useDispatch()
    //#endregion

    //#region : custom-declarations

    //#endregion

    //#region : side-effects
    useEffect(() => {
        dispatch(changeHomeRoute(EHomeRoutes.events))
    }, [])
    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <div>EventsPage</div>
    )
}

export default EventsPage