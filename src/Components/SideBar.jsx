import {
  BarChart3,
  RotateCw,
  Wallet,
  LayoutGrid,
  Clock,
  LogOut,
  Newspaper,
  LineChart,
} from "lucide-react";
import { Link } from "react-router-dom";

const SideBar = ({ activePath = "/dashboard" }) => {
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

  const getLinkClasses = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      activePath === path
        ? "bg-blue-600 text-white shadow-lg font-semibold"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col justify-between p-6 shadow-2xl left-0 top-0">
      <div className="space-y-8">
        <div className="flex items-center space-x-3 mb-10">
          <div className="p-2 rounded-2xl text-4xl">
            {/* <LogOut size={26} className="text-white transform rotate-90" /> */}
          </div>
          {/* <span className="text-2xl font-extrabold text-blue-400 tracking-wider">
            DTX <span className="text-white">Exchange</span>
          </span> */}
          <img
            src="./DtX-remove.png"
            alt="Logo"
            className="w-15 h-12 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        </div>

        <nav className="space-y-2">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={getLinkClasses(item.to)}>
                  <item.icon
                    size={20}
                    className="text-blue-300 group-hover:text-white"
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="pt-6 border-t border-gray-800 space-y-2">
        <Link
          to="/history"
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-xl transition-colors duration-200"
        >
          <Clock size={20} className="text-blue-300" />
          <span className="font-medium">Trade History</span>
        </Link>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/50 hover:text-white rounded-xl transition-colors duration-200 mt-2">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
