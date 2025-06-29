/// src/pages/Profile.tsx
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../lib/api"

export default function Profile() {
  const [user, setUser] = useState<any>({})
  const navigate = useNavigate()

  useEffect(() => {
    API.get("/profile?token=" + localStorage.getItem("token")).then(res => {
      setUser(res.data)
    }).catch(() => {
      alert("Not authorized")
      navigate("/login")
    })
  }, [])

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Welcome {user.username}</h1>
      <p>Email: {user.email}</p>
      <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => {
        localStorage.removeItem("token")
        navigate("/login")
      }}>Logout</button>
    </div>
  )
}

