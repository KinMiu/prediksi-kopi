import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { GoHomeFill } from 'react-icons/go';
import { FaChartBar, FaCloudSun, FaMapMarkedAlt, FaBrain } from 'react-icons/fa';
import { IoMdExit } from "react-icons/io";
import { jwtDecode } from 'jwt-decode';
import SweetAlertService from "../../helper/sweetalertService";
import ServiceUser from "../../api/service/User.service";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    if (token) {
      const decodeToken = jwtDecode(token);
      setRole(decodeToken.ROLE);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await ServiceUser.logoutUser('');
      localStorage.removeItem('access-token');
      SweetAlertService.showSuccess("Success", response.message);
      navigate('/login');
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  const menuItemsAdmin = [
    { name: "Dashboard", icon: GoHomeFill, path: "/" },
    { name: "Data Produksi", icon: FaChartBar, path: "/produksi" },
    { name: "Data Cuaca", icon: FaCloudSun, path: "/cuaca" },
    { name: "Data Kecamatan", icon: FaMapMarkedAlt, path: "/kecamatan" },
    { name: "Prediksi Panen", icon: FaBrain, path: "/prediksi" },
  ];

  const menuItemsKaryawan = [
    { name: "Dashboard", icon: GoHomeFill, path: "/" },
    { name: "Data Produksi", icon: FaChartBar, path: "/produksi" },
  ];

  const menuItems = role === '2' ? menuItemsKaryawan : menuItemsAdmin;

  return (
    <div className="bg-white border-r w-64 min-h-screen p-4 shadow-md">
      <div className="text-center font-bold text-xl mb-6">PanenKopi</div>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${location.pathname === item.path ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-100'}`}
          >
            <item.icon className="text-base" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700"
        >
          <IoMdExit className="text-xl" /> Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
