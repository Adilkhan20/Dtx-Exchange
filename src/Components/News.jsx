// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function News() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "displayMode": "compact",
          "feedMode": "market",
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "en",
          "market": "crypto",
          "width": "100%",
          "height": "100%"
        }`;
    container.current.append(script);
  }, []);

  return (
    <div className="h-full w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="tradingview-widget-container h-full" ref={container}>
        <div className="tradingview-widget-container__widget h-full"></div>
        <div className="tradingview-widget-copyright hidden">
          <a
            href="https://www.tradingview.com/news/top-providers/tradingview/"
            rel="noopener nofollow"
            target="_blank"
          >
            <span className="blue-text">Top stories</span>
          </a>
          <span className="trademark"> by TradingView</span>
        </div>
      </div>
    </div>
  );
}

export default memo(News);
