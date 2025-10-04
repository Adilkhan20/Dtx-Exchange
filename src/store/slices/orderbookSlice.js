
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchOrderbookData = createAsyncThunk(
  "orderbook/fetchOrderbookData",
  async (symbol = "BTCUSDT") => {
    try {
      const response = await fetch(
        `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=20`
      );
      const data = await response.json();
      const formattedBids = data.bids
        .slice(0, 10)
        .map(([price, quantity]) => ({
          price: parseFloat(price),
          amount: parseFloat(quantity),
          total: parseFloat(price) * parseFloat(quantity),
        }))
        .sort((a, b) => b.price - a.price);

      const formattedAsks = data.asks
        .slice(0, 10)
        .map(([price, quantity]) => ({
          price: parseFloat(price),
          amount: parseFloat(quantity),
          total: parseFloat(price) * parseFloat(quantity),
        }))
        .sort((a, b) => a.price - b.price);

      const lastPrice =
        formattedBids.length > 0 && formattedAsks.length > 0
          ? (formattedBids[0].price + formattedAsks[0].price) / 2
          : 0;

      return {
        bids: formattedBids,
        asks: formattedAsks,
        lastPrice,
        lastUpdate: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error("Failed to fetch order book data");
    }
  }
);

export const fetchRecentTradesData = createAsyncThunk(
  "orderbook/fetchRecentTradesData",
  async (symbol = "BTCUSDT") => {
    try {
      const response = await fetch(
        `https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=15`
      );
      const data = await response.json();
      const formattedTrades = data
        .map((trade) => ({
          time: new Date(trade.time).toLocaleTimeString(),
          price: parseFloat(trade.price),
          amount: parseFloat(trade.qty),
          type: trade.isBuyerMaker ? "sell" : "buy",
        }))
        .reverse();

      // Calculate price change
      let priceChange = 0;
      if (formattedTrades.length > 1) {
        const currentPrice = formattedTrades[0].price;
        const previousPrice = formattedTrades[1].price;
        priceChange = currentPrice - previousPrice;
      }

      return {
        recentTrades: formattedTrades,
        priceChange,
      };
    } catch (error) {
      throw new Error("Failed to fetch recent trades data");
    }
  }
);

export const fetchAllOrderbookData = createAsyncThunk(
  "orderbook/fetchAllData",
  async (symbol, { dispatch }) => {
    await Promise.all([
      dispatch(fetchOrderbookData(symbol)),
      dispatch(fetchRecentTradesData(symbol)),
    ]);
  }
);

const initialState = {
  bids: [],
  asks: [],
  recentTrades: [],
  symbol: "BTCUSDT",
  loading: true,
  error: null,
  lastPrice: 0,
  priceChange: 0,
  lastUpdate: null,
};

const orderbookSlice = createSlice({
  name: "orderbook",
  initialState,
  reducers: {
    setSymbol: (state, action) => {
      state.symbol = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // For real-time updates
    updateBids: (state, action) => {
      state.bids = action.payload;
    },
    updateAsks: (state, action) => {
      state.asks = action.payload;
    },
    updateRecentTrades: (state, action) => {
      state.recentTrades = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orderbook Data
      .addCase(fetchOrderbookData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderbookData.fulfilled, (state, action) => {
        state.loading = false;
        state.bids = action.payload.bids;
        state.asks = action.payload.asks;
        state.lastPrice = action.payload.lastPrice;
        state.lastUpdate = action.payload.lastUpdate;
      })
      .addCase(fetchOrderbookData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        // Fallback static data
        state.bids = [
          { price: 65120.0, amount: 0.85, total: 55352.0 },
          { price: 65119.5, amount: 1.22, total: 79445.79 },
          { price: 65118.9, amount: 0.45, total: 29303.5 },
          { price: 65118.0, amount: 2.5, total: 162795.0 },
          { price: 65117.5, amount: 0.15, total: 9767.62 },
        ];
        state.asks = [
          { price: 65121.0, amount: 1.5, total: 97681.5 },
          { price: 65121.5, amount: 0.7, total: 45585.05 },
          { price: 65122.2, amount: 2.1, total: 136756.62 },
          { price: 65123.0, amount: 0.35, total: 22793.05 },
          { price: 65123.5, amount: 1.1, total: 71635.85 },
        ];
        state.lastPrice = 65120.5;
      })
      // Fetch Recent Trades Data
      .addCase(fetchRecentTradesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentTradesData.fulfilled, (state, action) => {
        state.loading = false;
        state.recentTrades = action.payload.recentTrades;
        state.priceChange = action.payload.priceChange;
      })
      .addCase(fetchRecentTradesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        // Fallback static data
        state.recentTrades = [
          { time: "10:00:05", price: 65120.5, amount: 0.05, type: "buy" },
          { time: "10:00:02", price: 65120.5, amount: 0.12, type: "sell" },
          { time: "09:59:58", price: 65120.0, amount: 0.45, type: "buy" },
          { time: "09:59:55", price: 65120.0, amount: 0.88, type: "sell" },
          { time: "09:59:52", price: 65119.8, amount: 0.23, type: "buy" },
          { time: "09:59:49", price: 65119.8, amount: 1.15, type: "buy" },
          { time: "09:59:45", price: 65119.5, amount: 0.09, type: "sell" },
          { time: "09:59:40", price: 65119.5, amount: 2.01, type: "buy" },
          { time: "09:59:35", price: 65119.0, amount: 0.5, type: "sell" },
        ];
      })
      // Fetch All Data
      .addCase(fetchAllOrderbookData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrderbookData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllOrderbookData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSymbol,
  clearError,
  setLoading,
  updateBids,
  updateAsks,
  updateRecentTrades,
} = orderbookSlice.actions;

// Selectors
export const selectOrderbookData = (state) => state.orderbook;
export const selectBids = (state) => state.orderbook.bids;
export const selectAsks = (state) => state.orderbook.asks;
export const selectRecentTrades = (state) => state.orderbook.recentTrades;
export const selectLastPrice = (state) => state.orderbook.lastPrice;
export const selectPriceChange = (state) => state.orderbook.priceChange;
export const selectOrderbookLoading = (state) => state.orderbook.loading;
export const selectOrderbookError = (state) => state.orderbook.error;
export const selectLastUpdate = (state) => state.orderbook.lastUpdate;

export default orderbookSlice.reducer;
