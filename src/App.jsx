import TradingViewWidget from "./Components/TradingViewWidget";
import SideBar from "./Components/SideBar";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-900 overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
