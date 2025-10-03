import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TradingViewWidget from "./Components/TradingViewWidget";
import News from "./Components/News";
import SpotTrading from "./Components/SpotTrading";
import CryptoList from "./Components/CryptoList";
import FuturesTrading from "./Components/FutureTrading";
import WalletDashboard from "./Components/WalletDashboard";
import OrderBook from "./Components/OrderBook";
import LandingPage from "./Components/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> }, // Default page
      { path: "tradingview", element: <TradingViewWidget /> },
      { path: "news", element: <News /> },
      { path: "spottrading", element: <SpotTrading /> },
      { path: "cryptolist", element: <CryptoList /> },
      { path: "futures", element: <FuturesTrading /> },
      { path: "wallet", element: <WalletDashboard /> },
      { path: "order", element: <OrderBook /> },
      { path: "dashboard", element: <LandingPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
