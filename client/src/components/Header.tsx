import React, { useEffect, useState } from 'react'
import logo from "../assets/images/logo.png";
import SearchBox from './SearchBox';
import { checkUser } from '../utils/utils';

const Header = () => {
  const [isUser, setIsUser] = useState<boolean>(checkUser());

  return (
    <div className='w-[100vw] h-[2.2rem] bg-white flex items-center border-b-[1px] border-[#C9C9C9] justify-between px-5'>
      <div className='flex justify-center items-center gap-4'>
        <img src={logo} className='w-[20px]' />
        <SearchBox />
      </div>
      {isUser ? <SignInBar /> : <LoggedInUserBar />}
    </div>
  )
}



const SignInBar = () => {
  return (
    <h1>Create Acccount</h1>
  )
}

const LoggedInUserBar = () => {
  return (
    <h1>Afzal</h1>
  )
}


export default Header