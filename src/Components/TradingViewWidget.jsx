import React, { useEffect, useRef, memo, useState } from "react";

function TradingViewWidget({ height = "600px" }) {
  const container = useRef();
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderBook = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=20');
      const data = await response.json();
      
      const formattedBids = data.bids.slice(0, 10).map(([price, quantity]) => ({
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        total: parseFloat(price) * parseFloat(quantity)
      }));
      
      const formattedAsks = data.asks.slice(0, 10).map(([price, quantity]) => ({
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        total: parseFloat(price) * parseFloat(quantity)
      }));

      setOrderBook({
        bids: formattedBids,
        asks: formattedAsks
      });
    } catch (err) {
      setError('Failed to fetch order book data');
      console.error('Error fetching order book:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderBook();
    
    // Set up interval to refresh order book data every 5 seconds
    const interval = setInterval(fetchOrderBook, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // TradingView Widget Effect
  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.text = `{
      "symbol": "BINANCE:BTCUSDT",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "withdateranges": true,
      "allow_symbol_change": true,
      "details": true,
      "hotlist": true,
      "calendar": false,
      "studies": [
        "STD;Relative%20Strength%20Index"
      ],
      "support_host": "https://www.tradingview.com",
      "autosize": true,
      "hide_side_toolbar": false,
      "hide_top_toolbar": false,
      "container_id": "tradingview_widget"
    }`;
    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, []);

  // Calculate max total for percentage bars
  const maxTotal = Math.max(
    ...orderBook.bids.map(item => item.total),
    ...orderBook.asks.map(item => item.total)
  );

  // Format number with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 bg-gray-900 min-h-screen">
      {/* Trading View Chart - Takes 70% width on large screens */}
      <div className="lg:w-3/4">
        <div
          className="tradingview-widget-container bg-gray-900 border border-gray-700/70 p-1 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-blue-500/30"
          ref={container}
          style={{ height, minHeight: '300px' }}
        >
          <div
            className="tradingview-widget-container__widget w-full h-full"
            id="tradingview_widget"
          ></div>
        </div>
      </div>

      {/* Order Book - Takes 30% width on large screens */}
      <div className="lg:w-1/4">
        <div className="bg-gray-800 border border-gray-700/70 rounded-xl shadow-2xl p-4 h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Order Book</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-400">BTC/USDT</span>
              <button 
                onClick={fetchOrderBook}
                className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors"
                disabled={isLoading}
              >
                {isLoading ? '...' : '↻'}
              </button>
            </div>
          </div>

          {error ? (
            <div className="text-red-400 text-center py-4 text-sm">
              {error}
            </div>
          ) : (
            <>
              {/* Asks (Sell Orders) */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-red-400 mb-2 px-2">
                  <span>Price (USDT)</span>
                  <span>Amount (BTC)</span>
                  <span>Total</span>
                </div>
                <div className="space-y-1">
                  {orderBook.asks.map((ask, index) => (
                    <div key={index} className="relative group">
                      <div 
                        className="absolute right-0 top-0 h-full bg-red-500/20 z-0 transition-all duration-300"
                        style={{ 
                          width: `${(ask.total / maxTotal) * 100}%`,
                          opacity: 0.6
                        }}
                      />
                      <div className="flex justify-between text-xs px-2 py-1 relative z-10">
                        <span className="text-red-400 font-medium">
                          {formatNumber(ask.price)}
                        </span>
                        <span className="text-gray-300">
                          {ask.quantity.toFixed(6)}
                        </span>
                        <span className="text-gray-400">
                          {formatNumber(ask.total)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Price Indicator */}
              <div className="flex justify-center items-center my-4">
                <div className="bg-gray-700 px-3 py-1 rounded-lg border border-gray-600">
                  <span className="text-white font-bold text-sm">
                    {orderBook.bids[0] && orderBook.asks[0] 
                      ? `$${formatNumber((orderBook.bids[0].price + orderBook.asks[0].price) / 2)}`
                      : 'Loading...'
                    }
                  </span>
                </div>
              </div>

              {/* Bids (Buy Orders) */}
              <div>
                <div className="flex justify-between text-xs text-green-400 mb-2 px-2">
                  <span>Price (USDT)</span>
                  <span>Amount (BTC)</span>
                  <span>Total</span>
                </div>
                <div className="space-y-1">
                  {orderBook.bids.map((bid, index) => (
                    <div key={index} className="relative group">
                      <div 
                        className="absolute left-0 top-0 h-full bg-green-500/20 z-0 transition-all duration-300"
                        style={{ 
                          width: `${(bid.total / maxTotal) * 100}%`,
                          opacity: 0.6
                        }}
                      />
                      <div className="flex justify-between text-xs px-2 py-1 relative z-10">
                        <span className="text-green-400 font-medium">
                          {formatNumber(bid.price)}
                        </span>
                        <span className="text-gray-300">
                          {bid.quantity.toFixed(6)}
                        </span>
                        <span className="text-gray-400">
                          {formatNumber(bid.total)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spread */}
              {orderBook.bids[0] && orderBook.asks[0] && (
                <div className="mt-4 pt-3 border-t border-gray-700">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Spread:</span>
                    <span>
                      {formatNumber(orderBook.asks[0].price - orderBook.bids[0].price)} USDT
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Loading State */}
          {isLoading && !error && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);