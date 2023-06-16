import React from 'react'
import Layout from './Layout'
import Home from "./pages/Home";
import PageNotFound from './pages/Error/PageNotFound';
import { Routes, Route } from "react-router-dom"
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='create-account' element={<Register />} />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default App