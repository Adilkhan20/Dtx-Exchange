import React, { useState, useMemo } from "react";
import { DollarSign, Send, ShoppingBag } from "lucide-react"; 
import CryptoList from "./CryptoList"; 
const SpotTrading = () => {
  const [orderType, setOrderType] = useState("buy"); // buy / sell
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [availableBalance, setAvailableBalance] = useState(5000.00); // User's USDT balance
  const [cryptoHolding, setCryptoHolding] = useState(0.5); // User's BTC holding

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Spot Order:", { type: orderType, amount, price });
    // In a real app, you'd dispatch the order here.
  };

  const totalCost = useMemo(() => {
    const numAmount = parseFloat(amount);
    const numPrice = parseFloat(price);
    if (numAmount > 0 && numPrice > 0) {
      return (numAmount * numPrice).toFixed(2);
    }
    return "0.00";
  }, [amount, price]);

  const buttonColor = orderType === "buy" ? "bg-green-600" : "bg-red-600";
  const hoverColor = orderType === "buy" ? "hover:bg-green-700" : "hover:bg-red-700";

  return (
    // Updated container to use a standard flex layout, with the trading box having a fixed width.
    <div className="flex w-full min-h-screen bg-gray-900 text-white">
      {/* Trading Form - Adjusted max-w-md to a specific width for professional consistency */}
      <div className="w-[380px] p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 mr-6">
        <h2 className="text-3xl font-extrabold text-white mb-6 border-b border-gray-700 pb-3">
          BTC/USDT Spot Trade
        </h2>

        {/* Balance Info - Dynamic based on order type */}
        <div className="flex justify-between text-sm mb-5 p-3 bg-gray-700 rounded-lg">
          <span className="text-gray-400 font-medium">Available {orderType === 'buy' ? 'USDT' : 'BTC'}:</span>
          <span className="text-blue-400 font-semibold">
            {orderType === 'buy' 
              ? `${availableBalance.toFixed(2)} USDT` 
              : `${cryptoHolding.toFixed(6)} BTC`}
          </span>
        </div>

        {/* Order type buttons */}
        <div className="flex mb-8 border border-gray-700 rounded-lg overflow-hidden">
          <button
            type="button"
            className={`flex items-center justify-center gap-2 flex-1 py-3 text-lg font-bold ${
              orderType === "buy"
                ? "bg-green-600 text-white shadow-inner shadow-green-900/50"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            } transition-all duration-300`}
            onClick={() => setOrderType("buy")}
          >
            <ShoppingBag size={20} />
            Buy
          </button>
          <button
            type="button"
            className={`flex items-center justify-center gap-2 flex-1 py-3 text-lg font-bold ${
              orderType === "sell"
                ? "bg-red-600 text-white shadow-inner shadow-red-900/50"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            } transition-all duration-300`}
            onClick={() => setOrderType("sell")}
          >
            <Send size={20} />
            Sell
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Price input */}
          <div className="relative">
            <label className="block text-gray-400 text-sm mb-1">Price (USDT)</label>
            <div className="flex items-center bg-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-white rounded-lg focus:outline-none placeholder-gray-500"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
              <span className="text-gray-400 pr-3 text-sm">USDT</span>
            </div>
          </div>

          {/* Amount input */}
          <div className="relative">
            <label className="block text-gray-400 text-sm mb-1">Amount (BTC)</label>
            <div className="flex items-center bg-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-white rounded-lg focus:outline-none placeholder-gray-500"
                placeholder="0.000000"
                step="0.00001"
                min="0"
                required
              />
              <span className="text-gray-400 pr-3 text-sm">BTC</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-2 p-3 bg-gray-700/70 rounded-lg">
            <span className="text-gray-300 font-medium">Total:</span>
            <span className="text-lg font-bold flex items-center gap-1 text-yellow-400">
                <DollarSign size={18} />
                {totalCost} USDT
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className={`w-full py-4 rounded-lg text-xl font-extrabold ${buttonColor} ${hoverColor} text-white transition-all duration-300 shadow-lg ${orderType === 'buy' ? 'shadow-green-900/50' : 'shadow-red-900/50'}`}
              disabled={!amount || !price || parseFloat(amount) <= 0}
            >
              {orderType === "buy" ? "Place Buy Order" : "Place Sell Order"}
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1 min-w-0">
        <CryptoList className="w-full bg-gray-800 min-h-screen p-6 shadow-2xl" />
      </div>
    </div>
  );
};

export default SpotTrading;