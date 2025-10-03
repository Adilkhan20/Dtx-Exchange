import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget({ height = "600px" }) {
  const container = useRef();

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

    // Clean up function to remove the script when component unmounts
    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, []);

  return (
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
  );
}

export default memo(TradingViewWidget);