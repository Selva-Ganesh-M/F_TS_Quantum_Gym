import { changeHomeRoute, EHomeRoutes } from '@/features/routes/homeRoutesSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

type Props = {}

const GlobalPage = (props: Props) => {
    //#region : declarations
    const dispatch = useDispatch()
    //#endregion

    //#region : custom-declarations

    //#endregion

    //#region : side-effects
    useEffect(() => {
        dispatch(changeHomeRoute(EHomeRoutes.global))

        return () => {
            dispatch(changeHomeRoute(EHomeRoutes.other))
        }
    }, [])
    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <section className='h-full w-full overflow-scroll'>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
            <div>HomePageaskjdfkjsadfksd</div>
        </section>
    )
}

export default GlobalPage