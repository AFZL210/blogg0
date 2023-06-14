import React from 'react'
import Layout from './Layout'
import Home from "./pages/Home";
import PageNotFound from './pages/Error/PageNotFound';
import { Routes, Route } from "react-router-dom"

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />


        <Route path='login' element={<h1>login page</h1>} />

        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default App