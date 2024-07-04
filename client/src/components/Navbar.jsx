import { useState } from "react";
import { Link } from "react-router-dom";
import { close, menu } from "../assets"; // Assuming these are your menu icons
import { navLinks } from "../constants"; // Assuming this is where your navLinks are defined

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  const handleNavLinkClick = (title) => {
    setActive(title);
    setToggle(false);
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar px-6">
      <h1 className="w-[124px] h-[38px] text-4xl text-gradient font-extrabold">UPI 2.0</h1>

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
              to={nav.redirect}
              className="hover:text-blue-500 transition-colors duration-300 ease-in-out"
            >
              {nav.title}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to="/login"
            className="text-white border border-zinc-500 px-4 py-2 rounded-md font-medium focus:outline-none"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="text-white border border-zinc-500 px-4 py-2 rounded-md font-medium focus:outline-none"
          >
            Register
          </Link>
        </li>
      </ul>

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
                  to={nav.redirect}
                  className="hover:text-blue-500 transition-colors duration-300 ease-in-out"
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
