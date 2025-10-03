import React, { useEffect, useRef } from "react";
import {
  List,
  Clock,
  Zap,
  RefreshCw,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllOrderbookData,
  fetchOrderbookData,
  fetchRecentTradesData,
  setSymbol,
  clearError,
  selectOrderbookData,
} from "../store/slices/orderbookSlice";
const OrderBook = ({ symbol = "BTCUSDT" }) => {
  const dispatch = useDispatch();
  const intervalRef = useRef(null);
  const {
    bids,
    asks,
    recentTrades,
    loading,
    error,
    lastPrice,
    priceChange,
    lastUpdate,
  } = useSelector(selectOrderbookData);
  useEffect(() => {
    dispatch(setSymbol(symbol));
    dispatch(clearError());
    dispatch(fetchAllOrderbookData(symbol));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      dispatch(fetchOrderbookData(symbol));
    }, 2000); 
    const tradesInterval = setInterval(() => {
      dispatch(fetchRecentTradesData(symbol));
    }, 5000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      clearInterval(tradesInterval);
    };
  }, [dispatch, symbol]);
  const handleRefresh = () => {
    dispatch(clearError());
    dispatch(fetchAllOrderbookData(symbol));
  };
  const calculateDepthWidth = (total) => {
    if (bids.length === 0 && asks.length === 0) return "0%";
    const maxTotal = Math.max(
      ...bids.map((b) => b.total),
      ...asks.map((a) => a.total)
    );
    return `${(total / maxTotal) * 100}%`;
  };

  const formatNumber = (num, decimals = 2) => {
    if (isNaN(num)) return "0.00";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };
  const calculatePercentageChange = () => {
    if (!lastPrice || lastPrice === 0) return "0.00";
    return ((priceChange / lastPrice) * 100).toFixed(2);
  };
  if (loading && bids.length === 0 && asks.length === 0) {
    return (
      <div className="flex bg-gray-900 text-white p-6 min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-400">Loading order book data...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex bg-gray-900 text-white p-6 min-h-screen gap-4">
      <div className="w-1/2 p-6 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <List size={22} className="text-blue-400" />
            Order Book - {symbol.replace("USDT", "/USDT")}
          </h3>
          <div className="flex items-center gap-2">
            {lastUpdate && (
              <span className="text-xs text-gray-400">
                {new Date(lastUpdate).toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 disabled:opacity-50"
              title="Refresh data"
            >
              <RefreshCw
                size={16}
                className={`text-gray-400 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-400 font-medium mb-3 px-2">
          <span className="w-1/3 text-left">Price (USDT)</span>
          <span className="w-1/3 text-right">
            Amount ({symbol.replace("USDT", "")})
          </span>
          <span className="w-1/3 text-right">Total (USDT)</span>
        </div>

        <div className="space-y-1 mb-4">
          {asks.map((ask, index) => (
            <div
              key={`ask-${index}-${ask.price}`}
              className="relative flex justify-between text-sm py-1.5 group cursor-pointer hover:bg-red-500/10 rounded transition-colors duration-150"
            >
              <div
                className="absolute right-0 top-0 h-full bg-red-500/20 z-0 transition-all duration-300 rounded-r"
                style={{ width: calculateDepthWidth(ask.total) }}
              />
              <span className="w-1/3 text-left text-red-400 font-semibold z-10 pl-3">
                {formatNumber(ask.price)}
              </span>
              <span className="w-1/3 text-right text-gray-300 z-10">
                {formatNumber(ask.amount, 6)}
              </span>
              <span className="w-1/3 text-right text-gray-400 z-10 pr-3">
                {formatNumber(ask.total)}
              </span>
            </div>
          ))}
        </div>
        <div
          className={`p-4 text-xl font-bold text-center rounded-xl my-2 shadow-lg transition-all duration-300 ${
            priceChange >= 0
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {formatNumber(lastPrice)} USDT
            {priceChange >= 0 ? (
              <TrendingUp size={20} className="text-green-400" />
            ) : (
              <TrendingDown size={20} className="text-red-400" />
            )}
          </div>
          <div
            className={`text-sm mt-1 ${
              priceChange >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {priceChange >= 0 ? "+" : ""}
            {formatNumber(priceChange)} ({priceChange >= 0 ? "+" : ""}
            {calculatePercentageChange()}%)
          </div>
        </div>
        <div className="space-y-1 mt-4">
          {bids.map((bid, index) => (
            <div
              key={`bid-${index}-${bid.price}`}
              className="relative flex justify-between text-sm py-1.5 group cursor-pointer hover:bg-green-500/10 rounded transition-colors duration-150"
            >
              <div
                className="absolute left-0 top-0 h-full bg-green-500/20 z-0 transition-all duration-300 rounded-l"
                style={{ width: calculateDepthWidth(bid.total) }}
              />
              <span className="w-1/3 text-left text-green-400 font-semibold z-10 pl-3">
                {formatNumber(bid.price)}
              </span>
              <span className="w-1/3 text-right text-gray-300 z-10">
                {formatNumber(bid.amount, 6)}
              </span>
              <span className="w-1/3 text-right text-gray-400 z-10 pr-3">
                {formatNumber(bid.total)}
              </span>
            </div>
          ))}
        </div>
        {bids.length > 0 && asks.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-700/50">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Spread:</span>
              <span>{formatNumber(asks[0].price - bids[0].price)} USDT</span>
            </div>
          </div>
        )}
      </div>
      <div className="w-1/2 p-6 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap size={22} className="text-yellow-400" />
            Recent Trades
          </h3>
          <div className="text-sm text-gray-400">
            {recentTrades.length} trades
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-400 font-medium mb-3 px-2">
          <span className="w-1/4 text-left">Time</span>
          <span className="w-1/3 text-right">Price (USDT)</span>
          <span className="w-1/3 text-right">
            Amount ({symbol.replace("USDT", "")})
          </span>
        </div>
        <div className="space-y-1 max-h-[500px] overflow-y-auto custom-scrollbar">
          {recentTrades.map((trade, index) => (
            <div
              key={`trade-${index}-${trade.time}`}
              className="flex justify-between text-sm py-2 px-3 rounded-lg transition-all duration-150 group hover:bg-gray-700/50"
            >
              <span className="w-1/4 text-left text-gray-500 group-hover:text-gray-400 transition-colors font-mono">
                {trade.time}
              </span>
              <span
                className={`w-1/3 text-right font-semibold ${
                  trade.type === "buy"
                    ? "text-green-400 group-hover:text-green-300"
                    : "text-red-400 group-hover:text-red-300"
                }`}
              >
                {formatNumber(trade.price)}
              </span>
              <span className="w-1/3 text-right text-gray-300 font-mono">
                {formatNumber(trade.amount, 6)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-700/50">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-400" />
              <span>Real-time updates</span>
            </div>
            {error && (
              <div className="text-red-400 text-xs bg-red-500/10 px-2 py-1 rounded">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
