import React, { useState, useMemo } from "react";
import { Sliders, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const FuturesTrading = () => {
  const [orderType, setOrderType] = useState("long"); // long / short
  const [amount, setAmount] = useState("");
  const [leverage, setLeverage] = useState(10); // default leverage
  const [balance, setBalance] = useState(5.0); // user balance in BTC
  const [price, setPrice] = useState("");

  // Calculate the percentage based on the current amount
  const currentPercentage = useMemo(() => {
    if (!amount || !balance) return 0;
    const percentage = ((parseFloat(amount) / balance) * 100).toFixed(0);
    return Math.min(100, Math.max(0, parseInt(percentage))); // Ensure it's between 0 and 100
  }, [amount, balance]);

  // Handle slider change to set amount
  const handleSliderChange = (e) => {
    const percentage = e.target.value;
    const newAmount = ((balance * percentage) / 100).toFixed(6);
    setAmount(newAmount);
  };

  // Handle direct amount input change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Futures Order:", { orderType, amount, price, leverage });
    // In a real app, you'd dispatch the order here
  };

  const totalValue = amount && price ? (parseFloat(amount) * parseFloat(price)).toFixed(2) : "0.00";

  const buttonColor = orderType === "long" ? "bg-green-600" : "bg-red-600";
  const hoverColor = orderType === "long" ? "hover:bg-green-700" : "hover:bg-red-700";

  return (
    <div className="w-full max-w-md p-6 bg-gray-900 rounded-xl shadow-2xl border border-gray-700/50">
      <h2 className="text-3xl font-extrabold text-white mb-6 border-b border-gray-700 pb-3">
        Futures Order
      </h2>

      {/* Account Info */}
      <div className="flex justify-between text-sm mb-4">
        <span className="text-gray-400">Available Balance:</span>
        <span className="text-blue-400 font-semibold">{balance.toFixed(4)} BTC</span>
      </div>

      {/* Order type buttons */}
      <div className="flex mb-6 border border-gray-700 rounded-lg overflow-hidden">
        <button
          type="button"
          className={`flex items-center justify-center gap-2 flex-1 py-3 text-lg font-medium ${
            orderType === "long"
              ? "bg-green-600 text-white shadow-inner shadow-green-900/50"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          } transition-all duration-300`}
          onClick={() => setOrderType("long")}
        >
          <TrendingUp size={20} />
          Long
        </button>
        <button
          type="button"
          className={`flex items-center justify-center gap-2 flex-1 py-3 text-lg font-medium ${
            orderType === "short"
              ? "bg-red-600 text-white shadow-inner shadow-red-900/50"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          } transition-all duration-300`}
          onClick={() => setOrderType("short")}
        >
          <TrendingDown size={20} />
          Short
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Leverage Selector */}
        <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
            <label className="block text-gray-300 text-sm mb-2 font-medium">
                Leverage: <span className="text-blue-400 font-bold">{leverage}x</span>
            </label>
            <input
                type="range"
                min="1"
                max="100" // Adjusted max for typical exchange limits
                step="1"
                value={leverage}
                onChange={(e) => setLeverage(e.target.value)}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:bg-blue-600 [&::-moz-range-thumb]:bg-blue-600"
                style={{ accentColor: '#3B82F6' }} // Custom color for the thumb
            />
        </div>

        {/* Price input */}
        <div className="relative">
          <label className="block text-gray-400 text-sm mb-1">Limit Price (USDT)</label>
          <div className="flex items-center bg-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 65000"
              className="w-full px-4 py-3 bg-transparent text-white rounded-lg focus:outline-none placeholder-gray-500"
            />
            <span className="text-gray-400 pr-3">USDT</span>
          </div>
        </div>

        {/* Amount input */}
        <div className="relative">
          <label className="block text-gray-400 text-sm mb-1">Margin Amount (BTC)</label>
          <div className="flex items-center bg-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.000000"
              className="w-full px-4 py-3 bg-transparent text-white rounded-lg focus:outline-none placeholder-gray-500"
            />
            <span className="text-gray-400 pr-3">BTC</span>
          </div>
        </div>
        
        {/* Slider for % of balance */}
        <div className="pt-2">
          <label className="text-gray-400 text-sm flex justify-between items-center mb-1">
            <span className="flex items-center gap-1"><Sliders size={16} className="text-blue-400" /> Use Balance</span>
            <span className="text-blue-300 font-semibold">{currentPercentage}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={currentPercentage}
            onChange={handleSliderChange}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"
            style={{ accentColor: orderType === 'long' ? '#10B981' : '#EF4444' }} // Color matches trade type
          />
        </div>

        {/* Order Details and Submit Button */}
        <div className="pt-4 space-y-3">
            {/* Calculated Total Value */}
            <div className="flex justify-between text-sm p-3 bg-gray-800 rounded-lg border border-gray-700">
                <span className="text-gray-400 font-medium">Order Value (with leverage):</span>
                <span className="text-white font-bold flex items-center gap-1">
                    <DollarSign size={16} className="text-yellow-400" />
                    {totalValue} USDT
                </span>
            </div>
            
            <button
                type="submit"
                className={`w-full py-3 rounded-lg text-xl font-bold ${buttonColor} ${hoverColor} text-white transition-all duration-300 shadow-lg ${orderType === 'long' ? 'shadow-green-900/50' : 'shadow-red-900/50'}`}
                disabled={!amount || !price}
            >
                {orderType === "long" ? "Buy / Long" : "Sell / Short"}
            </button>
        </div>
      </form>
    </div>
  );
};

export default FuturesTrading;