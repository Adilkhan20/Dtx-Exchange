import React, { useState } from 'react';
import { Wallet, DollarSign, ArrowUpRight, ArrowDownLeft, Shield, TrendingUp, Search } from 'lucide-react';

// Sample data for demonstration
const initialAssets = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: 0.50034, usdValue: 32519.50, change24h: 3.2 },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: 4.1205, usdValue: 14008.20, change24h: -1.5 },
  { id: 'usdt', name: 'Tether', symbol: 'USDT', balance: 1500.00, usdValue: 1500.00, change24h: 0.01 },
  { id: 'sol', name: 'Solana', symbol: 'SOL', balance: 50.8, usdValue: 7890.35, change24h: 7.8 },
  { id: 'ada', name: 'Cardano', symbol: 'ADA', balance: 1200.0, usdValue: 550.80, change24h: -0.5 },
];

const WalletDashboard = () => {
  const [assets, setAssets] = useState(initialAssets);
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate total portfolio value in USD
  const totalValue = assets.reduce((sum, asset) => sum + asset.usdValue, 0).toFixed(2);

  // Filter assets based on search term
  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-500 bg-green-900/30';
    if (change < 0) return 'text-red-500 bg-red-900/30';
    return 'text-gray-400 bg-gray-700/50';
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-3 border-b border-gray-700 pb-4">
        <Wallet size={32} className="text-blue-500" /> My Wallet
      </h1>

      {/* Overview Card */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 mb-8 flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
            Total Portfolio Value <Shield size={16} className="text-yellow-500" />
          </p>
          <p className="text-5xl font-extrabold mt-1 text-white flex items-center">
            <DollarSign size={36} className="text-yellow-400" />
            {totalValue}
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex space-x-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-200 shadow-md shadow-blue-900/50">
            <ArrowDownLeft size={20} /> Deposit
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg font-semibold transition-colors duration-200">
            <ArrowUpRight size={20} /> Withdraw
          </button>
        </div>
      </div>

      {/* Asset List Header and Search */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Asset Balances</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search assets (BTC, ETH...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Asset Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Balance</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">USD Value</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">24h Change</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-700 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white flex items-center gap-3">
                    <TrendingUp size={18} className="text-blue-400" />
                    {asset.name} <span className="text-gray-400/80 font-normal">({asset.symbol})</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300">
                    {asset.balance.toFixed(asset.symbol === 'USDT' ? 2 : 6)} {asset.symbol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-white">
                    ${asset.usdValue.toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-right text-sm`}>
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${getChangeColor(asset.change24h)}`}>
                        {asset.change24h > 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-500 hover:text-blue-400 transition-colors mr-3">Trade</button>
                    <button className="text-gray-400 hover:text-white transition-colors">Details</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                  No assets found matching your search term.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WalletDashboard;