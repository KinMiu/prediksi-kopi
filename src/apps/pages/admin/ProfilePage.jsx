"use client"

import { useNavigate, useParams } from "react-router-dom"
import { IMAGES } from "../../assets"
import Layout from "../Layout"
import SweetAlertService from "../../helper/sweetalertService"
import ServiceUser from "../../api/service/User.service"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()

  const getDataUserById = async () => {
    try {
      setLoading(true)
      const response = await ServiceUser.getById(id)
      setData(response.data)
      console.log(response)
    } catch (error) {
      SweetAlertService.showError("Error", error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = () => {
    navigate(`/profile/change-password/${id}`)
  }

  const handleChangeName = () => {
    navigate(`/profile/change-name/${id}`)
  }

  useEffect(() => {
    getDataUserById()
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="animate-pulse">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 space-y-4">
                    <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Main Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            {/* Header Background */}
            <div className="h-32 bg-blue-500 relative">
            </div>

            {/* Profile Content */}
            <div className="relative px-8 pb-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
                {/* Avatar */}
                <div className="relative z-10">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
                    <img
                      src={IMAGES.profile || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center sm:text-left sm:pb-4">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{data.NAME}</h2>
                  <p className="text-gray-600 text-lg mb-3">{data.EMAIL}</p>
                  <div className="inline-flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {data.ROLE === "1" ? "Administrator" : "User"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Full Name</p>
                    <p className="text-gray-900 font-medium">{data.NAME}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Username</p>
                    <p className="text-gray-900 font-medium">{data.USERNAME}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Role</p>
                    <p className="text-gray-900 font-medium">{data.ROLE === '1' ? "Admin" : "User"}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Account Settings Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Account Settings</h3>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleChangeName}
                  className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group border border-blue-100"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">Change Name</p>
                    <p className="text-sm text-gray-600">Update your display name</p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <button
                  onClick={handleChangePassword}
                  className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-all duration-200 group border border-green-100"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}
