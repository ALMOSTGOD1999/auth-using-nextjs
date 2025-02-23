"use client"
import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function SignupPage() {
  const router=useRouter()
  const [user, setUser] = useState({
    email:'', username:'', password:'',
  })

  const[loading, setLoading]=useState(false)

  const [buttonDisabled, setButtonDisabled]=React.useState(false)

  const onSignup = async () => { 
    try {
      setLoading(true)
      const response = await axios.post("api/users/signup", user)
      console.log("Signup success", response.data);
      router.push("/login")
      
    } catch (error: any) {
      console.log("Sign up failed", error.message);
      
      toast.error(error.message)
    }
    finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  },[user])
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-center text-white text-xl ">{loading?"Processing":"Sign Up"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input type="text" id="username" onChange={(e) => setUser({ ...user, username: e.target.value })} value={user.username} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" placeholder="username" />
      
       <label htmlFor="email">email</label>
      <input type="text" id="email" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} placeholder="email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" />
      
       <label htmlFor="password">password</label>
      <input type="password" id="password" onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password} placeholder="password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" />
      
      <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled?"No signup" :"Sign up"}</button>
      <Link href="/login">Login Page</Link>
    </div>
  );
}

export default SignupPage;
