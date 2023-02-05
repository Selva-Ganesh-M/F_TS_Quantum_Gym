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
    const [sidebarOpen, setSidebarOpen] = useState<Boolean>(false)

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
            <HomeNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* side nav */}
            <HomeSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <HoverBoard />
            <Outlet />
        </section>
    )
}

export default HomeLayout