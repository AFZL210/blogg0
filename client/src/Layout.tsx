import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { RootState } from './main'
import { useSelector } from 'react-redux'

const Layout = () => {

    console.log(window.location.href.split("/")[3])
    const route = useSelector((state: RootState) => state.route.value);
    console.log(route.url)

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