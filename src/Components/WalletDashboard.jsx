import React, { useState } from "react";
import {
  Wallet,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Shield,
  TrendingUp,
  Search,
  Download,
  Upload,
  MoreVertical,
  PieChart,
  Eye,
  EyeOff,
} from "lucide-react";

// Sample data for demonstration
const initialAssets = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    balance: 0.50034,
    usdValue: 32519.5,
    change24h: 3.2,
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    balance: 4.1205,
    usdValue: 14008.2,
    change24h: -1.5,
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    balance: 1500.0,
    usdValue: 1500.0,
    change24h: 0.01,
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    balance: 50.8,
    usdValue: 7890.35,
    change24h: 7.8,
  },
  {
    id: "ada",
    name: "Cardano",
    symbol: "ADA",
    balance: 1200.0,
    usdValue: 550.8,
    change24h: -0.5,
  },
];

const WalletDashboard = () => {
  const [assets, setAssets] = useState(initialAssets);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBalance, setShowBalance] = useState(true);

  // Calculate total portfolio value in USD
  const totalValue = assets.reduce((sum, asset) => sum + asset.usdValue, 0);

  // Filter assets based on search term
  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getChangeColor = (change) => {
    if (change > 0) return "text-green-400";
    if (change < 0) return "text-red-400";
    return "text-gray-400";
  };

  const getChangeBgColor = (change) => {
    if (change > 0) return "bg-green-500/10";
    if (change < 0) return "bg-red-500/10";
    return "bg-gray-500/10";
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatBalance = (balance, symbol) => {
    const decimals = symbol === "USDT" ? 2 : 6;
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(balance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <Wallet size={28} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                Wallet Overview
              </h1>
              <p className="text-gray-400 text-sm">
                Manage your cryptocurrency assets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              <span className="text-sm">
                {showBalance ? "Hide" : "Show"} Balance
              </span>
            </button>
            <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Portfolio Overview Card */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={18} className="text-blue-400" />
                <span className="text-gray-400 text-sm font-medium">
                  Total Portfolio Value
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <DollarSign size={24} className="text-gray-400" />
                <span className="text-3xl lg:text-4xl font-bold text-white">
                  {showBalance ? formatCurrency(totalValue) : "••••••"}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">+2.3% today</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/25 flex-1 lg:flex-none">
                <Download size={18} />
                <span>Deposit</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-xl font-semibold transition-all duration-200 flex-1 lg:flex-none">
                <Upload size={18} />
                <span>Withdraw</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition-all duration-200 lg:flex-none">
                <PieChart size={18} />
                <span className="hidden lg:block">Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assets Section */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
        {/* Section Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-xl font-bold text-white">Your Assets</h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 sm:max-w-xs">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Assets Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  24h Change
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-gray-700/30 transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-700 rounded-lg">
                          <TrendingUp size={18} className="text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {asset.name}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {asset.symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-mono text-white">
                        {showBalance
                          ? formatBalance(asset.balance, asset.symbol)
                          : "••••••"}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {asset.symbol}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-semibold text-white">
                        {showBalance
                          ? formatCurrency(asset.usdValue)
                          : "••••••"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getChangeBgColor(
                          asset.change24h
                        )} ${getChangeColor(asset.change24h)}`}
                      >
                        {asset.change24h > 0 ? "+" : ""}
                        {asset.change24h.toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors duration-200">
                          Trade
                        </button>
                        <button className="p-1.5 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors duration-200">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="text-gray-400 text-sm">
                      No assets found matching your search.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700/50 bg-gray-700/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-400">
            <div>
              Showing {filteredAssets.length} of {assets.length} assets
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Positive</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Negative</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;
