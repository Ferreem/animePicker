import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Button( { children , link} ) {
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate(link)
  }


  return (
    <div className='w-56'>
        <button className='p-8 bg-slate-700 rounded-lg text-white mb-8 md:min-w-full'
         onClick={handleClick} 
        >
        {children}
        </button>
    </div>
  )
}
