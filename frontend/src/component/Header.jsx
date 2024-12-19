import React from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'
import { FaUsersCog } from "react-icons/fa";

const Header = () => {
  return (
    <header className='h-20 shadow-md sticky top-0 flex justify-between p-7 items-center '>
        <Link to='/'>
          logo
        </Link >
        <div className='hidden lg:block'>
          <Search />
        </div>
        <div>
        <button className=' lg:hidden text-neutral-500'>
            <FaUsersCog size={35} />
          </button>
          <div className='hidden lg:block'>
          add to cart
        </div>
        </div>
        
    </header>
  )
}

export default Header