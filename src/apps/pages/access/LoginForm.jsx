import { useNavigate } from "react-router-dom"
import SweetAlertService from "../../helper/sweetalertService"
import { useState } from "react"
import ServiceUser from "../../api/service/User.service"
import { jwtDecode } from "jwt-decode"

const LoginForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        return SweetAlertService.showError('Login Gagal', "Silakan lengkapi username dan password")
      }

      const data = { USERNAME: username, PASSWORD: password }
      const response = await ServiceUser.loginUser(data)

      if (!response.status) {
        return SweetAlertService.showError("Login Gagal", response.message)
      }

      const decode = jwtDecode(response.accessToken)
      localStorage.setItem('access-token', response.accessToken)

      if (decode.ROLE === '2') {
        navigate('/dashboard-user')
      } else {
        navigate('/')
      }
      window.location.reload()
    } catch (error) {
      SweetAlertService.showError('Terjadi Kesalahan', error.message || error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Masuk ke Sistem</h1>
          <p className="text-sm text-gray-500">Prediksi Waktu Panen Kopi</p>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Masukkan password"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-md transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
