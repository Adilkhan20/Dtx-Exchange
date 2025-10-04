import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Star,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";


  const CryptoList = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "market_cap",
    direction: "desc",
  });
  const [refreshing, setRefreshing] = useState(false);
  const [watchlist, setWatchlist] = useState(new Set());

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d"
      );
      const data = await res.json();
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coins:", error);
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  };

  const toggleWatchlist = (coinId) => {
    const newWatchlist = new Set(watchlist);
    if (newWatchlist.has(coinId)) {
      newWatchlist.delete(coinId);
    } else {
      newWatchlist.add(coinId);
    }
    setWatchlist(newWatchlist);
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "desc"
          ? "asc"
          : "desc",
    });
  };

  const filteredAndSortedCoins = React.useMemo(() => {
    let filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortConfig.key === "name") {
        return sortConfig.direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      const aVal = a[sortConfig.key] || 0;
      const bVal = b[sortConfig.key] || 0;

      if (sortConfig.direction === "asc") {
        return aVal - bVal;
      }
      return bVal - aVal;
    });

    return filtered;
  }, [coins, searchTerm, sortConfig]);

  const formatNumber = (num) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPercentage = (num) => {
    const value = num ? num.toFixed(2) : "0.00";
    return `${num >= 0 ? "+" : ""}${value}%`;
  };

  const getTrendColor = (percentage) => {
    if (percentage > 0) return "text-green-400";
    if (percentage < 0) return "text-red-400";
    return "text-gray-400";
  };

  const getTrendIcon = (percentage) => {
    if (percentage > 0) return <TrendingUp size={14} />;
    if (percentage < 0) return <TrendingDown size={14} />;
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Market Overview</h2>
          <p className="text-gray-400 text-sm">
            Real-time cryptocurrency prices
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          <span className="text-sm">Refresh</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search coins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-hidden bg-gray-800/50 rounded-2xl border border-gray-700/50">
        <div className="overflow-x-auto h-full">
          <table className="w-full">
            <thead className="bg-gray-700/50 sticky top-0">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-300">
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                  >
                    Asset
                    <Filter size={14} />
                  </button>
                </th>
                <th className="p-4 text-right text-sm font-semibold text-gray-300">
                  <button
                    onClick={() => handleSort("current_price")}
                    className="flex items-center gap-2 justify-end hover:text-white transition-colors duration-200 w-full"
                  >
                    Price
                    <Filter size={14} />
                  </button>
                </th>
                <th className="p-4 text-right text-sm font-semibold text-gray-300">
                  <button
                    onClick={() => handleSort("price_change_percentage_24h")}
                    className="flex items-center gap-2 justify-end hover:text-white transition-colors duration-200 w-full"
                  >
                    24h Change
                    <Filter size={14} />
                  </button>
                </th>
                <th className="p-4 text-right text-sm font-semibold text-gray-300">
                  <button
                    onClick={() => handleSort("price_change_percentage_7d")}
                    className="flex items-center gap-2 justify-end hover:text-white transition-colors duration-200 w-full"
                  >
                    7d Change
                    <Filter size={14} />
                  </button>
                </th>
                <th className="p-4 text-right text-sm font-semibold text-gray-300">
                  <button
                    onClick={() => handleSort("market_cap")}
                    className="flex items-center gap-2 justify-end hover:text-white transition-colors duration-200 w-full"
                  >
                    Market Cap
                    <Filter size={14} />
                  </button>
                </th>
                <th className="p-4 text-right text-sm font-semibold text-gray-300">
                  Watchlist
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {filteredAndSortedCoins.map((coin) => (
                <tr
                  key={coin.id}
                  className="hover:bg-gray-700/30 transition-colors duration-150 group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleWatchlist(coin.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <Star
                          size={16}
                          className={
                            watchlist.has(coin.id)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-400"
                          }
                        />
                      </button>
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-white">
                          {coin.name}
                        </div>
                        <div className="text-gray-400 text-sm uppercase">
                          {coin.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="font-mono text-white font-medium">
                      $
                      {coin.current_price?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: coin.current_price < 1 ? 6 : 2,
                      })}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div
                      className={`flex items-center justify-end gap-1 font-medium ${getTrendColor(
                        coin.price_change_percentage_24h
                      )}`}
                    >
                      {getTrendIcon(coin.price_change_percentage_24h)}
                      {formatPercentage(coin.price_change_percentage_24h)}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div
                      className={`flex items-center justify-end gap-1 font-medium ${getTrendColor(
                        coin.price_change_percentage_7d_in_currency
                      )}`}
                    >
                      {getTrendIcon(
                        coin.price_change_percentage_7d_in_currency
                      )}
                      {formatPercentage(
                        coin.price_change_percentage_7d_in_currency
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="font-mono text-gray-300 text-sm">
                      {formatNumber(coin.market_cap)}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleWatchlist(coin.id)}
                      className="p-1 hover:bg-gray-600 rounded transition-colors duration-200"
                    >
                      <Star
                        size={16}
                        className={
                          watchlist.has(coin.id)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-400"
                        }
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
        <div>
          Showing {filteredAndSortedCoins.length} of {coins.length} coins
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Bullish</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span>Bearish</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoList;
