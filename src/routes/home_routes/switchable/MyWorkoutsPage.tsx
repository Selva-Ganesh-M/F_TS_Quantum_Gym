import { changeHomeRoute, EHomeRoutes } from '@/features/routes/homeRoutesSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

type Props = {}

const MyWorkoutsPage = (props: Props) => {
    //#region : declarations
    const dispatch = useDispatch()
    //#endregion

    //#region : custom-declarations

    //#endregion

    //#region : side-effects
    useEffect(() => {
        dispatch(changeHomeRoute(EHomeRoutes.myWorkouts))
    }, [])
    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <div>MyWorkoutsPage</div>
    )
}

export default MyWorkoutsPage