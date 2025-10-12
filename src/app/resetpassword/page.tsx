"use client"

import React,{useEffect,useState} from "react"
import axios from "axios"
import {useRouter} from "next/navigation"

export default function ResetPasswordPage(){
    const router = useRouter()
    const [newPassword,setNewPassword] = useState("")
    const [token,setToken] = useState("")
    const [message,setMessage] = useState("")
    const [error,setError] = useState("")
    const [loading, setLoading] = useState(false)

    const resetpassword = async (e : React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setMessage("")
        
        try {
            const res = await axios.post('/api/users/resetpassword', {token, newPassword})
            setMessage(res.data.message)
            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push('/login')
            }, 2000)
        } catch (error : any) {
            setError(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Better way to extract token from URL
        const urlToken = new URLSearchParams(window.location.search).get("token")
        if (urlToken) {
            setToken(urlToken)
            console.log("Token extracted:", urlToken);
        } else {
            setError("No token found in URL")
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl mb-4">Reset Password</h1>
            <form onSubmit={resetpassword} className="flex flex-col gap-2 w-96">
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <button 
                    type="submit" 
                    className="p-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
                    disabled={loading || !token}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
            {message && <p className="mt-2 text-green-600">{message}</p>}
            {error && <p className="mt-2 text-red-600">{error}</p>}
            {!token && <p className="mt-2 text-yellow-600">Waiting for token...</p>}
        </div>
    );
}