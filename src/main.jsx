
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store"; // Import your Redux store
import TradingViewWidget from "./Components/TradingViewWidget";
import News from "./Components/News";
import SpotTrading from "./Components/SpotTrading";
import CryptoList from "./Components/CryptoList";
import FuturesTrading from "./Components/FutureTrading";
import WalletDashboard from "./Components/WalletDashboard";
import OrderBook from "./Components/OrderBook";
import LandingPage from "./Components/LandingPage";

const AppWithProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWithProvider />,
    children: [
      { index: true, element: <LandingPage /> }, 
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
