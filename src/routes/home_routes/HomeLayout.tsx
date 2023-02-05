import { ETogglers, getToggler, toggle } from '@/features/togglers/togglerSlice'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import HomeNavbar from './static/HomeNavbar'
import HomeSidebar from './static/HomeSidebar'
import HoverBoard from './static/HoverBoard'

type Props = {}

const HomeLayout = (props: Props) => {
    const dispatch = useDispatch()
    const toggler = useSelector(getToggler)

    // custom

    // side-effects
    // cleaner
    useEffect(() => {
        return () => {
            if (toggler.userMenu) {
                dispatch(toggle(ETogglers.userMenu))
            }
        }
    }, [])

    // jsx rendering
    return (
        <section id="HomeLayout" className='relative h-full'>
            <HomeNavbar />
            {/* side nav */}
            <HomeSidebar />
            <HoverBoard />
            <Outlet />
        </section>
    )
}

export default HomeLayout