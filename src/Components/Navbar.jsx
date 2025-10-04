import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-[#0B1120] text-white w-full top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <ul className="hidden md:flex items-center space-x-10">
              <li>
                <Link
                  to="/dashboard"
                  className="text-yellow-400 font-semibold text-sm"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/tradingview"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Markets
                </Link>
              </li>
              <li>
                <Link
                  to="/spottrading"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Trade
                </Link>
              </li>
              <li>
                <Link
                  to="/wallet"
                  className="flex items-center text-gray-300 hover:text-white text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/order"
                  className="flex items-center text-gray-300 hover:text-white text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="flex items-center text-gray-300 hover:text-white text-sm"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white px-4 py-2 rounded-md text-sm font-medium bg-[#2a3249] hover:bg-[#3c4667]">
              Log In
            </button>
            <button className="bg-[#f0b90b] text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-500">
              Sign Up
            </button>
            <div className="flex items-center text-gray-300 text-sm">
              <span className="mr-2">🌐</span>
              <span>EN</span>
              <span className="ml-1">▼</span>
          
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
