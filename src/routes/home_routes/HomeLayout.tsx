import { ETogglers, getToggler, toggle } from '@/features/togglers/togglerSlice'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import HomeNavbar from './static/HomeNavbar'
import HomeSidebar from './static/HomeSidebar'
import HoverBoard from './static/HoverBoard'

type Props = {}

const HomeLayout = (props: Props) => {

    //#region : grabbing
    const dispatch = useDispatch()
    const toggler = useSelector(getToggler)
    const { pathname } = useLocation()
    //#endregion

    //#region : custom-declarations

    //#endregion

    //#region : side-effects
    // cleaner
    useEffect(() => {
        return () => {
            if (toggler.userMenu) {
                dispatch(toggle(ETogglers.userMenu))
            }
        }
    }, [])

    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering


    // jsx rendering
    return (
        <section id="HomeLayout" className='relative h-full'>
            <HomeNavbar />
            {/* side nav */}
            <HomeSidebar />
            {
                pathname !== "/home/events/create" && <HoverBoard />
            }

            <Outlet />
        </section>
    )
}

export default HomeLayout