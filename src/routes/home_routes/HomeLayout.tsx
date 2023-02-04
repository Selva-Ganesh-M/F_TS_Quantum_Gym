import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import HomeNavbar from './static/HomeNavbar'
import HomeSidebar from './static/HomeSidebar'
import HoverBoard from './static/HoverBoard'

type Props = {}

const HomeLayout = (props: Props) => {
    const [sidebarOpen, setSidebarOpen] = useState<Boolean>(false)
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