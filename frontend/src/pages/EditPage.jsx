import React from 'react'
import { useState, useEffect } from 'react';
import { useAsyncError, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';



export const EditPage = () => {
   const [loading, setLoading] = useState(true)
   const { id } = useParams();
   const [user, setUser] = useState();
   const navigate = useNavigate();
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`http://localhost:3333/user/${id}`);
            setUser(response.data[0]);
            setUser(prevUser => ({
               ...prevUser,
               password: ''
            }));
            setLoading(false)

         } catch (error) {
            console.log(error);
         }
      };
      fetchData();
   }, [id]);


   const handleChange = (e) => {
      let { name, value } = e.target;
      setUser(prevUser => ({
         ...prevUser,
         [name]: value
      }));
   }




   const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(user);
      try {
         const response = await axios.put(`http://localhost:3333/user/edit/${id}`, user);
         navigate(`/${id}`)
         console.log('User data updated successfully:', response.data);
      } catch (error) {
         console.error("Ошибка входа", error.message);
      }
   }

   return (
      !loading ? (
         <div className='bg-sky-500 md:w-1/3 rounded-lg mx-auto mt-16 md:mt-48 py-8 text-xl font-mono '>
            <form onSubmit={handleSubmit}>
               <p className='text-center text-3xl'>Edit User</p>
               <label htmlFor="username" className='mt-6 flex ml-28' >Username</label>
               <input name='username' id='username' type="text" className='flex mx-auto  w-2/3 h-10 rounded-xl pl-2' value={user.username} onChange={handleChange} />
               <label htmlFor="password" className='mt-6 flex ml-28'>Password</label>
               <input type="text" name='password' id='password' className='flex mx-auto w-2/3 h-10 rounded-xl pl-2' value={user.password} onChange={handleChange} />
               <label htmlFor="fullname" className='mt-6 flex ml-28'>Fullname</label>
               <input type="text" name='fullname' id='fullname' className='flex mx-auto w-2/3 h-10 rounded-xl pl-2' value={user.fullname} onChange={handleChange} />
               <label htmlFor="email" className='mt-6 flex ml-28'>Email</label>
               <input type="text" name='email' id='email' className='flex mx-auto w-2/3 h-10 rounded-xl pl-2 mb-8' value={user.email} onChange={handleChange} />
               <button type="submit" className='mx-auto mt-8 flex bg-sky-600 hover:bg-sky-700 w-2/3 h-10 text-center rounded-lg justify-center items-center active:bg-sky-800' >Submit</button>
            </form>
         </div>) : (<div>...Loading</div>)
   )
}
