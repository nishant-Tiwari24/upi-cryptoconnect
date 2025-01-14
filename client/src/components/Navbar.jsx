import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { close, menu, logo } from "../assets";
import { navLinks } from "../constants";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [userLoginIn, setUserLoginIn] = useState(true);
  const [name, setName] = useState("bhowmik");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavLinkClick = (title) => {
    setActive(title);
    setToggle(false);
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setUserLoginIn(false);
    }
  }, []);

  useEffect(() => {
    try {
      const email = Cookies.get("userEmail");
      const USER = async () => {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/fetchdetail`,
          { email: email }
        );
        const details = await res.data.user;
        // console.log(details);
        setName(details.name);
      };
      USER();
    } catch (error) {
      console.log(error);
    }
  }, [name]);

  const toHome = ()=>{
    window.location.href="/";
  }

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar px-6">
      <h1 onClick={toHome} className="w-[124px] h-[38px] text-4xl text-gradient font-extrabold">
        DeFie
      </h1>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1 space-x-8">
        {navLinks.map((nav) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            }`}
            onClick={() => handleNavLinkClick(nav.title)}
          >
            <Link
              to={`/${nav.title.toLowerCase()}`}
              className={`hover:text-blue-500 transition-colors duration-300 ease-in-out`}
            >
              {nav.title}
            </Link>
          </li>
        ))}
        <li>
          {userLoginIn && (
            <Link
              to="/login"
              className="text-white border border-zinc-500 px-4 py-2 rounded-md font-medium focus:outline-none"
            >
              Login
            </Link>
          )}
        </li>
        <li>
          {userLoginIn && (
            <Link
              to="/register"
              className="text-white border border-zinc-500 px-4 py-2 rounded-md font-medium focus:outline-none"
            >
              Register
            </Link>
          )}
        </li>
      </ul>
      {!userLoginIn && (
        <div
          onClick={toggleDropdown}
          className="flex flex-col relative justify-center items-center"
        >
          <p className="text-white text-3xl text-icon">
            <FaUserCircle className="text-icon"/>
          </p>
          <p className="text-gray-400 text-sm text-poppins font-bold">{name}</p>

          {isDropdownOpen && (
            <div className="absolute top-16 w-48 bg-boxbg rounded-md shadow-lg z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-300 hover:bg-zinc-700"
              >
                Profile
              </Link>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-gray-300 hover:bg-zinc-700"
              >
                Dashboard
              </Link>
              <Link
                to="/bank detail"
                className="block px-4 py-2 text-gray-300 hover:bg-zinc-700"
              >
                Bank detail
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } mb-4`}
                onClick={() => handleNavLinkClick(nav.title)}
              >
                <Link
                  to={`/${nav.title.toLowerCase()}`}
                  className={`hover:text-blue-500 transition-colors duration-300 ease-in-out`}
                >
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
