import React from 'react'
import { Link } from 'react-router-dom'


export const App = () => {
  return (

      <div className='w-1/3 mx-auto mt-52 bg-sky-400 py-10 flex flex-col rounded-xl items-center font-mono text-xl'>
        <Link to={'/login'} className='my-14 block border border-sky-950 rounded-xl w-2/3 text-center py-2 hover:bg-sky-300 active:bg-sky-200'>Login</Link>
        <Link to={'/registration'} className='mb-14 block border border-sky-950 rounded-xl w-2/3 text-center py-2 hover:bg-sky-300 active:bg-sky-200'>Registration</Link>
      </div>
 
  )
}
