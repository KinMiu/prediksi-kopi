"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle, Edit3, User, Lock } from "lucide-react"
import Layout from "../Layout"
import SweetAlertService from "../../helper/sweetalertService"
import ServiceUser from "../../api/service/User.service"
import { useNavigate, useParams } from "react-router-dom"

export default function ChangeNamePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [newName, setNewName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError({})
    setSuccess(false)

    const errors = {}
    if (!newName.trim()) {
      errors.newName = "Name cannot be empty"
    }
    if (!password.trim()) {
      errors.password = "Password is required for confirmation"
    }

    if (Object.keys(errors).length > 0) {
      setError(errors)
      return
    }

    setIsLoading(true)
    try {
      const data = {
        newName,
        password,
      }
      const response = await ServiceUser.changeName(id, data)
      if (response.status === false) {
        setIsLoading(false)
        return SweetAlertService.showError("Failed", response.message)
      }
      SweetAlertService.showSuccess("Success", response.message)
      setSuccess(true)
      setNewName("")
      setPassword("")
      // Redirect atau reload jika perlu:
      navigate(`/profile/${id}`)
      window.location.reload()
    } catch (error) {
      SweetAlertService.showError("Error !!", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToProfile = () => {
    navigate(`/profile/${id}`)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Success Alert */}
          {success && (
            <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">Success!</h3>
                  <p className="text-green-800 text-sm">Your name has been updated successfully!</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-blue-500 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Update Display Name</h2>
                  <p className="text-blue-100">Change how others see your name</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Name Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <User className="w-4 h-4 text-blue-600" />
                    New Display Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        error.newName
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                      placeholder="Enter your new display name"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {error.newName && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                      {error.newName}
                    </div>
                  )}
                </div>

                {/* Password Confirmation */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Lock className="w-4 h-4 text-blue-600" />
                    Password Confirmation
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        error.password
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                      placeholder="Enter your current password to confirm"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {error.password && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                      {error.password}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 flex justify-center items-center gap-3 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-400 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-5 h-5" />
                        Save New Name
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleBackToProfile}
                    className="flex-1 sm:flex-none px-6 py-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
