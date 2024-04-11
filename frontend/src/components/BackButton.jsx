import React from 'react'
import { Link } from 'react-router-dom'

export const BackButton = () => {
   return (
      <Link to={'/'} className=' flex p-2 m-auto border border-black w-1/6 rounded-lg justify-center mt-3 hover:bg-sky-600'>Back</Link>

   )
}
