
import React, { useEffect, useState } from "react";

const CryptoList = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await res.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coins:", error);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Poll every 10 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Loading coins...</p>;
  }

  return (
    <div className="p-6 max-h-screen overflow-y-auto bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-white">
        🔥 Top 100 Crypto Prices
      </h1>
      <table className="w-full border-collapse bg-gray-800 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-700 text-white sticky top-0">
            <th className="p-3 text-left">Coin</th>
            <th className="p-3">Symbol</th>
            <th className="p-3">Price (USD)</th>
            <th className="p-3">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr
              key={coin.id}
              className="border-b border-gray-700 hover:bg-gray-700 transition"
            >
              <td className="p-3 flex items-center gap-2 text-white">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                {coin.name}
              </td>
              <td className="p-3 uppercase text-white">{coin.symbol}</td>
              <td className="p-3 text-white">
                ${coin.current_price.toLocaleString()}
              </td>
              <td className="p-3 text-white">
                ${coin.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;
