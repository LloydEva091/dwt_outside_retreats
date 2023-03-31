import React, { useState } from "react";
import { Link } from "react-scroll";
import logo from "../img/outside-retreats-logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const goBackHome = () => {
    navigate("/");
  };

  return (
    <nav
      id="header"
      className="w-full z-10 top-0 py-1 sticky bg-white fontStyle"
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
        <label
          htmlFor="menu-toggle"
          className="cursor-pointer md:hidden block"
          onClick={toggleMenu}
        >
          <svg
            className="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input
          className="hidden"
          type="checkbox"
          id="menu-toggle"
          defaultChecked={isOpen}
        />

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:w-auto w-full order-3 md:order-1`}
          id="menu"
        >
          <nav>
            <ul className="md:flex items-center justify-between text-xl text-gray-700 pt-4 md:pt-0">
              <li key="home" onClick={goBackHome}>
                <div
                  className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                  onClick={toggleMenu}
                >
                  Home
                </div>
              </li>
              <li key="about">
                <Link
                  to="about"
                  className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                  smooth={true}
                  duration={500}
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="order-1 md:order-1">
          <div
            className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
            onClick={goBackHome}
          >
            <img
              src={logo}
              className="w-20 md:w-48 md:h-24"
              alt="outside-retreats-logo"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
