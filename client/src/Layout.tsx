import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

const Layout = () => {
    return (
        <main className='max-w-[100vw]'>
            <Header />
            <Outlet />
        </main>
    )
}

export default Layout