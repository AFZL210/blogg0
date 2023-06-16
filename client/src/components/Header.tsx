import React, { useEffect, useState } from 'react'
import logo from "../assets/images/logo.png";
import SearchBox from './SearchBox';
import ButtonMain from './Buttons/ButtonMain';
import { checkUser } from '../utils/utils';
import Avatar from '@mui/material/Avatar';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UserMenuCard from './settings/UserMenuCard';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const isUser: boolean = true;
  const [search, setSearch] = useState<string>("");


  const searchHandler = (): void => {
    if (search.length > 0) {
      console.log(search);
      setSearch("");
    } else {
      console.log("empty seach box")
    }
  }

  return (
    <div className='w-[100vw] h-[3.8rem] bg-white flex items-center border-b-[1px] border-[#C9C9C9] justify-between px-5'>
      <div className='flex justify-center items-center gap-4'>
        <img src={logo} className='w-[2.4rem]' />
        <SearchBox value={search} setValue={setSearch} OnSearchHandler={searchHandler} />
      </div>
      {isUser ? <SignInBar /> : <LoggedInUserBar />}
    </div>
  )
}



const SignInBar = () => {
  return (
    <div className='flex items-center gap-4'>
      <Link to={"/login"}><span className='text-[.6rem]'>Sign In</span></Link>
      <Link to={"/create-account"}><ButtonMain /></Link>
    </div>
  )
}

const LoggedInUserBar = () => {

  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className='flex items-center gap-5'>
      <Link to={"/create-new-post"}>
        <div className='flex items-center justify-between gap-1'>
          <DriveFileRenameOutlineIcon sx={{ width: "2.4rem" }} />
          <span className='text-[.92rem]'>Write</span>
        </div>
      </Link>

      <div className='relative cursor-pointer'>
        <div onClick={() => setShowMenu(!showMenu)} className='flex items-center justify-between gap-1' >
          <Avatar alt="Travis Howard" src="https://res.cloudinary.com/primeflix/image/upload/v1678206231/download_lhz0or.jpg" sx={{ width: "2.4rem", height: "2.4rem" }} />
          <KeyboardArrowDownIcon />
        </div>
        <div className='absolute right-[18rem] top-[3.2rem]'>
          {showMenu && <UserMenuCard />}
        </div>
      </div>
    </div>
  )
}


export default Header