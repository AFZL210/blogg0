import React from 'react'
import Layout from './Layout'
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App