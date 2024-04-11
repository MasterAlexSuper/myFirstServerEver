import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BackButton } from '../components/BackButton';

export const Login = () => {
   const navigate = useNavigate(); // Используем хук useNavigate для программного перенаправления

   const handleSubmit = async (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      console.log(`username: ${username} password ${password}`);

      try {
         const response = await axios.post('http://localhost:3333/login', {
            username: username,
            password: password
         });
         if (response.data.allowed) {
            // Перенаправляем пользователя на страницу с идентификатором
            navigate(`/${response.data.id}`);
         } else {
            console.log('Ошибка входа: неверное имя пользователя или пароль');
         }
      } catch (error) {
         console.error("Ошибка входа", error.message);
      }
   }

   return (
      <div className='bg-sky-500 md:w-1/3 rounded-lg mx-auto mt-16 md:mt-64 py-8 text-xl font-mono '>
         <p className='text-black text-3xl text-center'>Login</p>
         <form onSubmit={handleSubmit}>
            <input id='username' className='flex mx-auto mt-10 w-2/3 h-10 rounded-xl pl-2' type="text" placeholder='Username' />
            <input id='password' className='flex mx-auto mt-8 w-2/3 h-10 rounded-xl pl-2' type="password" placeholder='Password' />
            <button type="submit" className='mx-auto mt-8 flex bg-sky-600 hover:bg-sky-700 w-2/3 h-10 text-center rounded-lg justify-center items-center active:bg-sky-800'>Login</button>
         </form>
         <BackButton />
      </div>
   )
}
