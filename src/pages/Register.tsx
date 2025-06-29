/// src/pages/Register.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../lib/api"

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      await API.post('/register', { username, email, password })
      alert("Registered successfully")
      navigate("/login")
    } catch (err) {
      alert("Registration failed")
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="border p-2" />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2" />
      <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
    </div>
  )
}

