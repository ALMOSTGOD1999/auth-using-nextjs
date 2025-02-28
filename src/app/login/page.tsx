"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";


import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function loginpage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email:'',  password:'',
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading]= useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log("Login success", response.data);
      toast.success("Login success")
      router.push("/profile")
      
    } catch (error) {
    console.log(error);
    
    }
    finally{}
   }
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    }else{setButtonDisabled(true)}
  },[user])

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-center text-white text-xl ">log in</h1>
      <hr />
     
      
       <label htmlFor="email">email</label>
      <input type="text" id="email" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} placeholder="email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" />
      
       <label htmlFor="password">password</label>
      <input type="password" id="password" onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password} placeholder="password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" />
      
      <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Log in</button>
      <Link href="/signup">Sign Up Page</Link>
    </div>
  );
}

export default loginpage;
