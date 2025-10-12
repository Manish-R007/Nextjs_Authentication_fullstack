"use client"

import React,{useEffect,useState} from "react"
import axios from "axios"


export default function ForgotPasswordPage(){
    const [email,setEmail] = useState("")
    const [message,setMessage] = useState("")
    const [error,setError] = useState("")

    const forgotpassword = async (e : React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/users/forgotpassword', {email})
            setMessage(res.data.message)
        } catch (error: any) {
            setError(error.message)
        }
    }

    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Forgot Password</h1>
      <form onSubmit={forgotpassword} className="flex flex-col gap-2 w-96">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Send Reset Email
        </button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}