"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function profile() {
  const router = useRouter()
  const [data, setData] = useState("nothing")

  const logout =async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success('Logout successful')
      router.push('/login')
    } catch (error:any) {
      console.log(error.message);

      toast.error(error.message)
      
    }
  }
  const getUserDetails = async () => {
    const res = await axios.get("api/users/me")
    console.log(res.data);
    setData(res.data.data._id)
    
  }
  return (
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
          <h1>profile</h1>
      <hr/>
      <p>profile page</p>
      <h2 className='p-1 rounded bg-orange-600'>{data==='nothing'?'Nothing':<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button onClick={logout} className='border-black bg-green-600 p-2 text-white font-bold mt-2 rounded-md hover:bg-blue-800'>Logout</button>
      <button onClick={getUserDetails} className='border-black bg-blue-600 p-2 text-white font-bold mt-2 rounded-md hover:bg-blue-800'>Get User Details</button>
      </div>
  )
}

export default profile