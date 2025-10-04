import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Shield,
  BarChart3,
  DollarSign,
  Target,
  Clock,
  Users,
  Activity,
} from "lucide-react";
import OrderBook from "./OrderBook";
import { useSelector } from "react-redux";
import { selectOrderbookData } from "../store/slices/orderbookSlice";

const FuturesTrading = () => {
  const [orderType, setOrderType] = useState("long");
  const [leverage, setLeverage] = useState(10);
  const [orderMode, setOrderMode] = useState("limit");

  const { bids } = useSelector(selectOrderbookData);
  const leverageOptions = [1, 2, 5, 10, 25, 50, 100];

  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-6 gap-6">
      <div className="w-96 flex-shrink-0">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-white">
                BTC/USDT Perpetual
              </h2>
              <div className="flex items-center gap-2 text-green-400">
                <TrendingUp size={16} />
                <span className="text-sm font-semibold">+2.34%</span>
              </div>
            </div>

            <p className="text-3xl font-light text-gray-300"></p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="text-2xl"> Price: {bids?.[0]?.price}</span>
            </p>
          </div>
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
          <div className="flex bg-gray-700/30 rounded-xl p-1 mb-6 border border-gray-600/50">
            <button
              onClick={() => {
                setOrderType("long");
              }}
              className={`flex-1 py-4 px-4 rounded-lg font-semibold transition-all duration-200 ${
                orderType === "long"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30 shadow-lg shadow-green-500/10"
                  : "text-gray-400 hover:text-green-400"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingUp size={20} />
                Long
              </div>
            </button>
            <button
              onClick={() => setOrderType("short")}
              className={`flex-1 py-4 px-4 rounded-lg font-semibold transition-all duration-200 ${
                orderType === "short"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30 shadow-lg shadow-red-500/10"
                  : "text-gray-400 hover:text-red-400"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingDown size={20} />
                Short
              </div>
            </button>
          </div>
          <div className="bg-gray-700/30 rounded-xl p-4 mb-6 border border-gray-600/30">
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-400 text-sm font-medium">
                Leverage
              </label>
              <div className="flex items-center gap-2">
                <Target size={16} className="text-blue-400" />
                <span className="text-blue-400 font-bold text-lg">
                  {leverage}x
                </span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={leverage}
              onChange={(e) => setLeverage(e.target.value)}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none"
            />
            <div className="flex justify-between mt-2">
              {leverageOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setLeverage(option)}
                  className={`text-xs px-2 py-1 rounded ${
                    leverage === option
                      ? "bg-blue-500 text-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {option}x
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {orderMode === "limit" && (
              <div>
                <label className="block text-gray-400 text-sm mb-2 font-medium">
                  Limit Price
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="0.00"
                  />
                  <span className="absolute right-3 top-3 text-gray-400 text-sm">
                    USDT
                  </span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">
                Amount
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="0.000"
                />
                <span className="absolute right-3 top-3 text-gray-400 text-sm">
                  BTC
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {[25, 50, 75, 100].map((percent) => (
                <button
                  key={percent}
                  className="flex-1 py-2 text-xs bg-gray-600/50 hover:bg-gray-600 rounded-lg transition-colors duration-150"
                >
                  {percent}%
                </button>
              ))}
            </div>
            <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Margin</span>
                  <span className="text-white">0.00 USDT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total</span>
                  <span className="text-white">0.00 USDT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Fee (0.02%)</span>
                  <span className="text-gray-500">0.00 USDT</span>
                </div>
              </div>
            </div>
            <button
              className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-200 ${
                orderType === "long"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/25"
                  : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/25"
              }`}
            >
              {orderType === "long" ? "Place Long Order" : "Place Short Order"}
            </button>
          </div>
          <div className="mt-6 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-start gap-2">
              <Shield size={16} className="text-yellow-400 mt-0.5" />
              <div>
                <p className="text-yellow-400 text-xs font-medium">
                  High Risk Warning
                </p>
                <p className="text-yellow-500/80 text-xs mt-1">
                  Trading with leverage can lead to significant losses. Please
                  trade cautiously.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6 pt-6 border-t border-gray-700/50">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Zap size={14} />
              <span>Fast Execution</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Activity size={14} />
              <span>Low Fees</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Users size={14} />
              <span>Deep Liquidity</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 h-full">
          <OrderBook symbol="BTCUSDT" />
        </div>
      </div>
    </div>
  );
};

export default FuturesTrading;
