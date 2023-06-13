import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = () => {
    return (
        <div className='flex items-center justify-between bg-[#fafafa] h-5 rounded-full px-2 gap-2'>
            <SearchIcon style={{ width: "15px", opacity: "50%" }} />
            <input className='search__input focus:outline-none text-[.65rem] bg-transparent' placeholder='Seach Blogg0' />
        </div>
    )
}
export default SearchBox