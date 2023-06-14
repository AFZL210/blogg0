import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

const Layout = () => {

    console.log(window.location.href.split("/")[3])

    useEffect(() => {
        if (window.location.href.split("/")[3] === "login") {
            setShow(false);
        }
    }, [window.location.href])

    const [show, setShow] = useState<boolean>(true);

    return (
        <main className='max-w-[100vw]'>
            <div style={{ display: show ? "flex" : "none" }}><Header /></div>
            <Outlet />
        </main>
    )
}

export default Layout