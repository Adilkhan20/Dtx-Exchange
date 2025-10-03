import React from "react";
import {
  BarChart3,
  Clock,
  LayoutGrid,
  Wallet,
  TrendingUp,
  Zap,
} from "lucide-react";
import CryptoList from "./CryptoList";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 flex flex-col gap-8">
      {/* Dashboard Title */}
      <div className="flex items-center gap-3 border-b border-gray-700 pb-4">
        <LayoutGrid size={32} className="text-blue-500" />
        <h1 className="text-3xl font-bold tracking-tight">
          Executive Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700/50 flex items-center gap-5">
          <div className="p-3 bg-green-900/40 rounded-full">
            <Wallet size={28} className="text-green-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              Total Assets
            </p>
            <p className="text-3xl font-extrabold mt-0.5">$12,345.67</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700/50 flex items-center gap-5">
          <div className="p-3 bg-blue-900/40 rounded-full">
            <BarChart3 size={28} className="text-blue-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              24h P&L
            </p>
            <p className="text-3xl font-extrabold mt-0.5 text-green-400">
              +$567.89
            </p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700/50 flex items-center gap-5">
          <div className="p-3 bg-yellow-900/40 rounded-full">
            <Clock size={28} className="text-yellow-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              Open Orders
            </p>
            <p className="text-3xl font-extrabold mt-0.5">5</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700/50 min-h-[300px]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={24} className="text-red-500" /> Market Snapshot
              (Chart Placeholder)
            </h2>
            <div className="h-64 flex items-center justify-center bg-gray-700/50 rounded-lg text-gray-500">
              [Placeholder for TradingView Chart or Graph Component]
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/spottrading"
              className="bg-gray-700 hover:bg-gray-700/70 p-5 rounded-xl shadow-lg transition-all duration-200 border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-bold mb-1">Spot Trading</h3>
              <p className="text-gray-400 text-sm">
                Execute quick Buy/Sell orders instantly.
              </p>
            </a>

            <a
              href="/futures"
              className="bg-gray-700 hover:bg-gray-700/70 p-5 rounded-xl shadow-lg transition-all duration-200 border-l-4 border-yellow-500"
            >
              <h3 className="text-xl font-bold mb-1">Futures Trading</h3>
              <p className="text-gray-400 text-sm">
                Manage leverage and risk in derivatives.
              </p>
            </a>
          </div>
        </div>
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap size={24} className="text-yellow-400" /> Top Markets
          </h2>
          <div className="max-h-[600px] overflow-y-auto">
            <CryptoList />
          </div>
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700/50">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Clock size={24} className="text-blue-400" /> Recent Orders & Trades
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700 sticky top-0">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Time
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Pair
                </th>
                <th className="p-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="p-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="p-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="p-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="hover:bg-gray-700 transition duration-150">
                <td className="p-3 text-sm text-gray-500">10:30:15</td>
                <td className="p-3 text-sm font-medium text-white">BTC/USDT</td>
                <td className="p-3 text-center text-sm font-semibold text-green-400">
                  Buy
                </td>
                <td className="p-3 text-right text-sm">0.5 BTC</td>
                <td className="p-3 text-right text-sm">$27,500.00</td>
                <td className="p-3 text-center">
                  <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900/50 text-green-300">
                    Filled
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-700 transition duration-150">
                <td className="p-3 text-sm text-gray-500">10:25:40</td>
                <td className="p-3 text-sm font-medium text-white">ETH/USDT</td>
                <td className="p-3 text-center text-sm font-semibold text-red-400">
                  Sell
                </td>
                <td className="p-3 text-right text-sm">0.2 ETH</td>
                <td className="p-3 text-right text-sm">$1,800.50</td>
                <td className="p-3 text-center">
                  <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-900/50 text-yellow-300">
                    Open
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-700 transition duration-150">
                <td className="p-3 text-sm text-gray-500">09:55:01</td>
                <td className="p-3 text-sm font-medium text-white">SOL/USDT</td>
                <td className="p-3 text-center text-sm font-semibold text-green-400">
                  Buy
                </td>
                <td className="p-3 text-right text-sm">15 SOL</td>
                <td className="p-3 text-right text-sm">$25.12</td>
                <td className="p-3 text-center">
                  <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900/50 text-green-300">
                    Filled
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
