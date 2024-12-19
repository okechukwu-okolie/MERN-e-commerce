import { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Search = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)

    console.log(location)

    useEffect(()=>{
        const isSearchPage = location.pathname === "/search"
        setIsSearchPage(isSearchPage)
    },[location])


    const redirectToSearchPage = ()=>{
        navigate('/search')
    }
  return (
    <div className='w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-lg border p-1 overflow-hidden text-neutral-500 flex items-center group focus-within:border-primary-200'>
        <button className='flex justify-center items-center h-full p-3 group-focus-within:border-primary-200'>
            <FaSearch size={22} />
        </button>

        <div className='w-full h-full '>
            {
                !isSearchPage ?(
                <div onClick={redirectToSearchPage} className='w-full h-full flex items-center '>
                    <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed once, initially
                                    'Search for groceries',
                                    1000,
                                    'Search for toiletries',
                                    1000,
                                    'Search for home improvement tools',
                                    1000,
                                    'Search for electronics',
                                    1000,
                                ]}
                                speed={50}
                                
                                repeat={Infinity}
                                />
                    </div>
                    ):(
                            <div className='w-full h-full'>
                                <input type="text" placeholder='search for items here' className='bg-transparent w-full h-full border-none outline-none '  />
                            </div>
                    )
            }
        </div>

        

    </div>
  )
}

export default Search