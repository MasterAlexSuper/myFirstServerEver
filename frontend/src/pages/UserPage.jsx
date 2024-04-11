import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BackButton } from '../components/BackButton';

export const UserPage = () => {
   const [user, setUser] = useState();
   const { id } = useParams();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`http://localhost:3333/user/${id}`);
            setUser(response.data);

         } catch (error) {
            console.log(error);
         }
      };

      fetchData();
   }, [id]);

   const formatDateTime = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);
      const date = dateTime.toLocaleDateString();
      const time = dateTime.toLocaleTimeString();
      return `${date} ${time}`;
   };
   const handleDelete = async () => {
      await axios.delete(`http://localhost:3333/user/delete/${id}`)

   }

   return (
      <div className=''>
         {user ? (
            <div className='w-1/3 m-auto bg-sky-500 rounded-md px-4 py-4 mt-32 text-xl font-mono'>
               <p className='text-center text-2xl'>Profil details</p>
               <p>User ID: {user[0]._id}</p>
               <p>Username: {user[0].username}</p>
               <p>Fullname: {user[0].fullname}</p>
               <p>Email: {user[0].email}</p>
               <p>Last Update: {formatDateTime(user[0].updatedAt)}</p>
               <p>Created: {formatDateTime(user[0].createdAt)}</p>
               <div className="flex flex-row justify-around">
                  <Link to={`/edit/${id}`} className='flex mt-4 p-3 w-1/3 bg-sky-700 rounded-lg felx justify-center text-white text-xl  hover:bg-sky-200 hover:text-black'>Edit profile</Link>
                  <Link to={`/`} className='flex mt-4 p-3 w-1/3 bg-sky-700 rounded-lg felx justify-center text-white text-xl hover:text-red-500 hover:bg-sky-200 active:bg-red-400' onClick={handleDelete}>Delete profile</Link>
               </div>
               <BackButton />
            </div>
         ) : (
            <p className='flex  mt-20 text-center'>Loading...</p>
         )}
      </div>
   );
};
