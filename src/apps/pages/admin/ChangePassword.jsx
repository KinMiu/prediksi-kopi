"use client"

import { useState } from "react"
import Layout from "../Layout"
import { Eye, EyeOff, Shield, CheckCircle, AlertCircle, Lock, Check, X } from "lucide-react"
import SweetAlertService from "../../helper/sweetalertService"
import ServiceUser from "../../api/service/User.service"
import { useNavigate, useParams } from "react-router-dom"

export default function ChangePasswordPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const calculatePasswordStrength = (password) => {
    let strength = 0
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    strength = Object.values(checks).filter(Boolean).length
    return { strength: (strength / 5) * 100, checks }
  }

  const passwordStrength = calculatePasswordStrength(formData.newPassword)

  const getStrengthColor = (strength) => {
    if (strength < 40) return "from-red-500 to-red-600"
    if (strength < 70) return "from-yellow-500 to-orange-500"
    return "from-green-500 to-emerald-500"
  }

  const getStrengthText = (strength) => {
    if (strength < 40) return "Weak"
    if (strength < 70) return "Medium"
    return "Strong"
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.currentPassword) newErrors.currentPassword = "Current password is required"
    if (!formData.newPassword) newErrors.newPassword = "New password is required"
    else if (formData.newPassword.length < 8) newErrors.newPassword = "Minimum 8 characters"
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm new password"
    else if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (formData.currentPassword === formData.newPassword)
      newErrors.newPassword = "New password must differ from current password"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setSuccess(false)

    try {
      const data = {
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }
      const response = await ServiceUser.changePassword(id, data)
      if (response.status === false) {
        setIsLoading(false)
        return SweetAlertService.showError("Failed", response.message)
      }
      SweetAlertService.showSuccess("Success", response.message)
      setSuccess(true)
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
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

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
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
                  <h3 className="font-semibold text-green-900">Password Updated!</h3>
                  <p className="text-green-800 text-sm">Your password has been successfully updated.</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Security Settings</h2>
                  <p className="text-blue-100">Update your account password</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Current Password */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Lock className="w-4 h-4 text-blue-600" />
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        errors.currentPassword
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      onClick={() => togglePasswordVisibility("current")}
                    >
                      {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                      {errors.currentPassword}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 my-6"></div>

                {/* New Password */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Shield className="w-4 h-4 text-blue-600" />
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        errors.newPassword
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      onClick={() => togglePasswordVisibility("new")}
                    >
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                      {errors.newPassword}
                    </div>
                  )}

                  {/* Password Strength Indicator */}
                  {formData.newPassword && (
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Password Strength</span>
                        <span
                          className={`text-sm font-semibold ${
                            passwordStrength.strength < 40
                              ? "text-red-600"
                              : passwordStrength.strength < 70
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {getStrengthText(passwordStrength.strength)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getStrengthColor(passwordStrength.strength)} transition-all duration-300`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        ></div>
                      </div>

                      {/* Password Requirements */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                        {Object.entries(passwordStrength.checks).map(([key, met]) => (
                          <div
                            key={key}
                            className={`flex items-center gap-2 text-sm ${met ? "text-green-600" : "text-gray-500"}`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                met ? "bg-green-100" : "bg-gray-100"
                              }`}
                            >
                              {met ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                            </div>
                            <span>
                              {key === "length" && "8+ characters"}
                              {key === "uppercase" && "Uppercase letter"}
                              {key === "lowercase" && "Lowercase letter"}
                              {key === "numbers" && "Number"}
                              {key === "special" && "Special character"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Shield className="w-4 h-4 text-blue-600" />
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        errors.confirmPassword
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                      }`}
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      onClick={() => togglePasswordVisibility("confirm")}
                    >
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 flex justify-center items-center gap-3 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Updating Password...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5" />
                        Update Password
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
