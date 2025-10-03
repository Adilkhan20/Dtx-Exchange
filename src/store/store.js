import { configureStore } from "@reduxjs/toolkit";
import walletSlice from "./slices/walletSlice";
import tradingSlice from "./slices/tradingSlice";
import newsSlice from "./slices/newsSlice";
import orderbookSlice from "./slices/orderbookSlice";

export const store = configureStore({
  reducer: {
    wallet: walletSlice,
    trading: tradingSlice,
    news: newsSlice,
    orderbook: orderbookSlice,
  },
});

export default store;
