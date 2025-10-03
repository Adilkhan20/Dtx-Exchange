import React, { useState } from 'react';
import { ChevronUp, ChevronDown, List, Clock, Zap } from 'lucide-react';

const OrderBook = ({ symbol = "BTC/USDT" }) => {
  // Static data for Bids (Buy Orders) - Sorted descending by Price
  const bids = [
    { price: 65120.00, amount: 0.85, total: 55352.00 },
    { price: 65119.50, amount: 1.22, total: 79445.79 },
    { price: 65118.90, amount: 0.45, total: 29303.50 },
    { price: 65118.00, amount: 2.50, total: 162795.00 },
    { price: 65117.50, amount: 0.15, total: 9767.62 },
  ];

  // Static data for Asks (Sell Orders) - Sorted ascending by Price
  const asks = [
    { price: 65121.00, amount: 1.50, total: 97681.50 },
    { price: 65121.50, amount: 0.70, total: 45585.05 },
    { price: 65122.20, amount: 2.10, total: 136756.62 },
    { price: 65123.00, amount: 0.35, total: 22793.05 },
    { price: 65123.50, amount: 1.10, total: 71635.85 },
  ];

  // Static data for Recent Trades (Executed Orders)
  const recentTrades = [
    { time: '10:00:05', price: 65120.50, amount: 0.05, type: 'buy' },
    { time: '10:00:02', price: 65120.50, amount: 0.12, type: 'sell' },
    { time: '09:59:58', price: 65120.00, amount: 0.45, type: 'buy' },
    { time: '09:59:55', price: 65120.00, amount: 0.88, type: 'sell' },
    { time: '09:59:52', price: 65119.80, amount: 0.23, type: 'buy' },
    { time: '09:59:49', price: 65119.80, amount: 1.15, type: 'buy' },
    { time: '09:59:45', price: 65119.50, amount: 0.09, type: 'sell' },
    { time: '09:59:40', price: 65119.50, amount: 2.01, type: 'buy' },
    { time: '09:59:35', price: 65119.00, amount: 0.50, type: 'sell' },
  ];
  
  // The current market price (mid-price)
  const lastPrice = 65120.50; 
  const lastPriceChange = 0.50; // Positive change for simulation

  // Function to calculate depth bar width
  const maxAmount = Math.max(...bids.map(b => b.total), ...asks.map(a => a.total));
  const getDepthWidth = (total) => `${(total / maxAmount) * 100}%`;

  return (
    <div className="flex bg-gray-900 text-white p-6 min-h-screen">
      
      {/* 1. Order Book (Left Side) */}
      <div className="w-1/2 p-4 bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 mr-4">
        <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2 border-b border-gray-700 pb-3">
          <List size={22} className="text-blue-400" /> Order Book - {symbol}
        </h3>
        
        {/* Table Header */}
        <div className="flex justify-between text-xs text-gray-400 uppercase font-medium mb-1 px-2">
          <span className="w-1/3 text-left">Price (USDT)</span>
          <span className="w-1/3 text-right">Amount (BTC)</span>
          <span className="w-1/3 text-right">Total (USDT)</span>
        </div>

        {/* ASKS (Sell Orders - Top, Red) */}
        <div className="space-y-0.5 mb-2">
          {asks.map((ask, index) => (
            <div key={index} className="relative flex justify-between text-sm h-6 group cursor-pointer hover:bg-red-900/40">
              {/* Depth Bar */}
              <div 
                className="absolute right-0 h-full bg-red-900/30 transition-all duration-300"
                style={{ width: getDepthWidth(ask.total) }}
              />
              <span className="w-1/3 text-left text-red-500 font-semibold z-10 pl-2">
                {ask.price.toFixed(2)}
              </span>
              <span className="w-1/3 text-right text-gray-300 z-10 pr-2">
                {ask.amount.toFixed(3)}
              </span>
              <span className="w-1/3 text-right text-gray-400 z-10 pr-2">
                {Math.round(ask.total)}
              </span>
            </div>
          ))}
        </div>

        {/* Market Price (The "Gap") */}
        <div className={`p-2 text-xl font-extrabold text-center rounded-lg my-1 shadow-md transition-colors duration-300 ${
          lastPriceChange >= 0 ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
        }`}>
          {lastPrice.toFixed(2)} USDT
          {lastPriceChange >= 0 
            ? <ChevronUp size={18} className="inline ml-2" />
            : <ChevronDown size={18} className="inline ml-2" />
          }
        </div>

        {/* BIDS (Buy Orders - Bottom, Green) */}
        <div className="space-y-0.5 mt-2">
          {bids.map((bid, index) => (
            <div key={index} className="relative flex justify-between text-sm h-6 group cursor-pointer hover:bg-green-900/40">
              {/* Depth Bar */}
              <div 
                className="absolute right-0 h-full bg-green-900/30 transition-all duration-300"
                style={{ width: getDepthWidth(bid.total) }}
              />
              <span className="w-1/3 text-left text-green-500 font-semibold z-10 pl-2">
                {bid.price.toFixed(2)}
              </span>
              <span className="w-1/3 text-right text-gray-300 z-10 pr-2">
                {bid.amount.toFixed(3)}
              </span>
              <span className="w-1/3 text-right text-gray-400 z-10 pr-2">
                {Math.round(bid.total)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Recent Trades (Executions - Right Side) */}
      <div className="w-1/2 p-4 bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50">
        <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2 border-b border-gray-700 pb-3">
          <Zap size={22} className="text-yellow-400" /> Recent Trades (Executed)
        </h3>
        
        {/* Table Header */}
        <div className="flex justify-between text-xs text-gray-400 uppercase font-medium mb-1 px-2">
          <span className="w-1/4 text-left">Time</span>
          <span className="w-1/3 text-right">Price (USDT)</span>
          <span className="w-1/3 text-right">Amount (BTC)</span>
        </div>

        {/* Trade List */}
        <div className="space-y-0.5 h-[500px] overflow-y-auto custom-scrollbar">
          {recentTrades.map((trade, index) => (
            <div 
              key={index} 
              className="flex justify-between text-sm py-1 px-2 transition-colors duration-150 group"
            >
              <span className="w-1/4 text-left text-gray-500 group-hover:text-gray-400 transition-colors">
                {trade.time}
              </span>
              <span className={`w-1/3 text-right font-semibold ${
                trade.type === 'buy' ? 'text-green-500' : 'text-red-500'
              }`}>
                {trade.price.toFixed(2)}
              </span>
              <span className="w-1/3 text-right text-gray-300">
                {trade.amount.toFixed(3)}
              </span>
            </div>
          ))}
        </div>

        {/* Footer/Status */}
        <div className="mt-4 pt-3 border-t border-gray-700 text-sm text-gray-400 flex items-center gap-2">
            <Clock size={16} className="text-blue-400" />
            Live feed updated in real-time.
        </div>
      </div>
    </div>
  );
};

export default OrderBook;