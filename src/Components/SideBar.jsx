import { useState } from "react";
import {
  BarChart3,
  RotateCw,
  Wallet,
  LayoutGrid,
  Clock,
  LogOut,
  Newspaper,
  LineChart,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

const SideBar = ({ activePath = "/dashboard" }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const navItems = [
    { to: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
    { to: "/spottrading", icon: RotateCw, label: "Spot Trading" },
    { to: "/futures", icon: BarChart3, label: "Futures" },
    { to: "/Wallet", icon: Wallet, label: "Wallet" },
    { to: "/tradingview", icon: LineChart, label: "Charts" },
    { to: "/cryptolist", icon: Newspaper, label: "Markets" },
    { to: "/news", icon: Newspaper, label: "News" },
    { to: "/Order", icon: Newspaper, label: "OrderBook" },
  ];

  const toggleSidebar = () => {
    if (isCollapsed && !isClosed) {
      setIsClosed(true);
    } else if (isClosed) {
      setIsClosed(false);
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  };

  const openSidebar = () => {
    setIsClosed(false);
    setIsCollapsed(false);
  };

  const getLinkClasses = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
      activePath === path
        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 font-semibold"
        : "text-gray-300 hover:bg-gray-800/80 hover:text-white hover:shadow-md"
    } ${isCollapsed ? "justify-center" : ""}`;

  if (isClosed) {
    return (
      <button
        onClick={openSidebar}
        className="fixed left-4 top-4 z-50 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl p-3 transition-all duration-200 hover:scale-110 shadow-lg"
      >
        <Menu size={20} className="text-white" />
      </button>
    );
  }

  return (
    <aside
      className={`bg-gray-900 text-white h-screen flex flex-col justify-between relative transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      } shadow-2xl border-r border-gray-700`}
    >
      <button
        onClick={() => setIsClosed(true)}
        className="absolute -right-3 top-8 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-600/50 rounded-full p-2 transition-all duration-300 hover:scale-105 z-10 shadow-lg hover:shadow-gray-700/30 backdrop-blur-sm group"
      >
        <ChevronLeft
          size={16}
          className="text-gray-300 group-hover:text-white transition-colors duration-300"
        />
      </button>

      <div className="space-y-8 p-6">
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          } mb-10`}
        >
          {isCollapsed ? (
            <img
              src="./DtX-remove.png"
              alt="Logo"
              className="w-10 h-10 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <>
              <div className="flex items-center space-x-3">
                <img
                  src="./DtX-remove.png"
                  alt="Logo"
                  className="w-12 h-12 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                />
                <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wider">
                  DTX
                </span>
              </div>
            </>
          )}
        </div>

        <nav className="space-y-2">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={getLinkClasses(item.to)}>
                  <item.icon
                    size={20}
                    className={`transition-colors duration-200 ${
                      activePath === item.to
                        ? "text-white"
                        : "text-blue-300 group-hover:text-white"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="font-medium transition-all duration-200">
                      {item.label}
                    </span>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 shadow-lg border border-gray-600">
                      {item.label}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        className={`pt-6 border-t border-gray-800 space-y-2 p-6 ${
          isCollapsed ? "px-3" : ""
        }`}
      >
        <Link
          to="/history"
          className={`flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800/80 hover:text-white rounded-xl transition-all duration-200 group relative ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <Clock
            size={20}
            className="text-blue-300 group-hover:text-white transition-colors duration-200"
          />
          {!isCollapsed && <span className="font-medium">Trade History</span>}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 shadow-lg border border-gray-600">
              Trade History
            </div>
          )}
        </Link>

        <button
          className={`flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/30 hover:text-white rounded-xl transition-all duration-200 group relative ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut
            size={20}
            className="group-hover:text-white transition-colors duration-200"
          />
          {!isCollapsed && <span className="font-medium">Logout</span>}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 shadow-lg border border-gray-600">
              Logout
            </div>
          )}
        </button>
      </div>
      {isCollapsed && (
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => setIsClosed(true)}
            className="w-full flex items-center justify-center p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200"
            title="Close sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
