/// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
})

/// tailwind.config.ts
import { type Config } from "tailwindcss"

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config

/// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

/// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import { isAuthenticated } from "./lib/auth"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
          isAuthenticated() ? <Profile /> : <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  )
}

/// src/lib/auth.ts
export function isAuthenticated() {
  return !!localStorage.getItem("token")
}

/// src/lib/api.ts
import axios from 'axios'

const API = axios.create({
  baseURL: 'https://credinet-backend.onrender.com',
})

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API

/// src/pages/Home.tsx
export default function Home() {
  return (
    <div className="p-10 text-center text-2xl font-bold">
      Welcome to CrediNet
    </div>
  )
}

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

/// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: sans-serif;
  background: #f8f8f8;
  color: #222;
}
