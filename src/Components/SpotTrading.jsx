import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Shield,
  Clock,
  BarChart3,
} from "lucide-react";
import CryptoList from "./CryptoList";
import OrderBook from "./OrderBook";

const SpotTrading = () => {
  const [orderType, setOrderType] = useState("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [availableBalance, setAvailableBalance] = useState(18475.32);
  const [cryptoHolding, setCryptoHolding] = useState(0.5432);
  const [orderMode, setOrderMode] = useState("limit"); // limit, market

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Spot Order:", {
      type: orderType,
      amount,
      price,
      mode: orderMode,
    });
    // Order placement logic would go here
  };

  const totalCost = useMemo(() => {
    const numAmount = parseFloat(amount);
    const numPrice = parseFloat(price);
    if (numAmount > 0 && numPrice > 0) {
      return (numAmount * numPrice).toFixed(2);
    }
    return "0.00";
  }, [amount, price]);

  const calculatePercentage = (percent) => {
    const balance = orderType === "buy" ? availableBalance : cryptoHolding;
    return (balance * percent).toFixed(orderType === "buy" ? 2 : 6);
  };

  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-6 gap-6">
      <div className="w-96 flex-shrink-0">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-white">BTC/USDT</h2>
              <div className="flex items-center gap-2 text-green-400">
                <TrendingUp size={16} />
                <span className="text-sm font-semibold">+2.34%</span>
              </div>
            </div>
            <p className="text-3xl font-light text-gray-300">$42,567.89</p>
          </div>

          {/* Order Mode Tabs */}
          <div className="flex bg-gray-700/50 rounded-lg p-1 mb-6">
            {["limit", "market"].map((mode) => (
              <button
                key={mode}
                onClick={() => setOrderMode(mode)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  orderMode === mode
                    ? "bg-gray-600 text-white shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          {/* Buy/Sell Toggle */}
          <div className="flex bg-gray-700/30 rounded-xl p-1 mb-6 border border-gray-600/50">
            <button
              onClick={() => setOrderType("buy")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                orderType === "buy"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30 shadow-lg shadow-green-500/10"
                  : "text-gray-400 hover:text-green-400"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingUp size={18} />
                Buy
              </div>
            </button>
            <button
              onClick={() => setOrderType("sell")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                orderType === "sell"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30 shadow-lg shadow-red-500/10"
                  : "text-gray-400 hover:text-red-400"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingDown size={18} />
                Sell
              </div>
            </button>
          </div>

          {/* Balance Info */}
          <div className="bg-gray-700/30 rounded-xl p-4 mb-6 border border-gray-600/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Available</span>
              <span className="text-blue-400 font-semibold text-sm">
                {orderType === "buy"
                  ? `${availableBalance.toLocaleString()} USDT`
                  : `${cryptoHolding.toFixed(4)} BTC`}
              </span>
            </div>
            <div className="flex gap-1">
              {[25, 50, 75, 100].map((percent) => (
                <button
                  key={percent}
                  onClick={() => {
                    if (orderType === "buy") {
                      setAmount(
                        (
                          calculatePercentage(percent / 100) /
                          parseFloat(price || 42567.89)
                        ).toFixed(6)
                      );
                    } else {
                      setAmount(calculatePercentage(percent / 100));
                    }
                  }}
                  className="flex-1 py-1.5 text-xs bg-gray-600/50 hover:bg-gray-600 rounded transition-colors duration-150"
                >
                  {percent}%
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {orderMode === "limit" && (
              <div>
                <label className="block text-gray-400 text-sm mb-2 font-medium">
                  Price (USDT)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                  <span className="absolute right-3 top-3 text-gray-400 text-sm">
                    USDT
                  </span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">
                Amount (BTC)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="0.000000"
                  step="0.00001"
                  min="0"
                  required
                />
                <span className="absolute right-3 top-3 text-gray-400 text-sm">
                  BTC
                </span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Total</span>
                <span className="text-lg font-semibold text-white">
                  ${totalCost} USDT
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Fee (0.1%)</span>
                <span>${(parseFloat(totalCost) * 0.001).toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                !amount ||
                (orderMode === "limit" && !price) ||
                parseFloat(amount) <= 0
              }
              className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-200 ${
                orderType === "buy"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/25"
                  : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/25"
              } disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none`}
            >
              {orderType === "buy" ? "Buy BTC" : "Sell BTC"}
            </button>
          </form>

          {/* Features */}
          <div className="flex justify-between mt-6 pt-6 border-t border-gray-700/50">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Zap size={14} />
              <span>Fast Execution</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Shield size={14} />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <BarChart3 size={14} />
              <span>Advanced</span>
            </div>
          </div>
        </div>
      </div>

      <OrderBook></OrderBook>
    </div>
  );
};

export default SpotTrading;
