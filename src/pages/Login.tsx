/// src/pages/Login.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../lib/api"

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await API.post('/login', { username, password })
      localStorage.setItem("token", res.data.access_token)
      navigate("/profile")
    } catch (err) {
      alert("Login failed")
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="border p-2" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2" />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </div>
  )
}

