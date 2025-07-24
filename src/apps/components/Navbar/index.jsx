import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CiMenuBurger } from "react-icons/ci";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceUser from "../../api/service/User.service";

const Navbar = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      const decode = jwtDecode(token);
      setProfile(decode);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await ServiceUser.logoutUser("");
      localStorage.removeItem("access-token");
      SweetAlertService.showSuccess("Success", response.message);
      navigate("/login");
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  const toLogin = () => navigate("/login");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <header className="bg-white shadow-sm border-b px-6 py-3 flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <button className="text-2xl md:hidden">
          <CiMenuBurger />
        </button>
        <Link to="/" className="text-lg font-semibold">
          PanenKopi
        </Link>
      </div>
      <div className="relative">
        {localStorage.getItem("access-token") ? (
          <>
            <button
              onClick={toggleDropdown}
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-400 flex items-center gap-2"
            >
              {profile.NAME}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <a
                      href={`/profile/${profile.IDUSER}`}
                      onClick={closeDropdown}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Setting
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <button
            className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-500"
            onClick={toLogin}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
