import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BackButton } from '../components/BackButton';

export const Registration = () => {

  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      fullname: document.getElementById("fullname").value,
      email: document.getElementById("email").value
    }
    console.log(newUser);
    try {
      const response = await axios.post(`http://localhost:3333/user/create`, newUser);
      navigate(`/login`)
      console.log('User was created successfully:', response.data);
    } catch (error) {
      console.error("Ошибка входа", error.message);
    }
  }

  return (

    <div className='bg-sky-500 md:w-1/3 rounded-lg mx-auto mt-16 md:mt-48 py-8 text-xl font-mono '>
      <form onSubmit={handleSubmit}>
        <p className='text-center text-3xl'>Create User</p>
        <label htmlFor="username" className='mt-6 flex ml-28' >Username</label>
        <input name='username' id='username' type="text" className='flex mx-auto  w-2/3 h-10 rounded-xl pl-2' />
        <label htmlFor="password" className='mt-6 flex ml-28'>Password</label>
        <input type="text" name='password' id='password' className='flex mx-auto w-2/3 h-10 rounded-xl pl-2' />
        <label htmlFor="fullname" className='mt-6 flex ml-28'>Fullname</label>
        <input type="text" name='fullname' id='fullname' className='flex mx-auto w-2/3 h-10 rounded-xl pl-2' />
        <label htmlFor="email" className='mt-6 flex ml-28'>Email</label>
        <input type="text" name='email' id='email' className='flex mx-auto w-2/3 h-10 rounded-xl pl-2 mb-8' />
        <button type="submit" className='mx-auto mt-8 flex bg-sky-600 hover:bg-sky-700 w-2/3 h-10 text-center rounded-lg justify-center items-center active:bg-sky-800' >Submit</button>
      </form>
      <BackButton />
    </div>)
}
