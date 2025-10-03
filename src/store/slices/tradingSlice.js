import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Spot Trading
  spotOrderType: "buy",
  spotAmount: "",
  spotPrice: "",
  spotAvailableBalance: 18475.32,
  spotCryptoHolding: 0.5432,
  spotOrderMode: "limit",

  // Futures Trading
  futuresOrderType: "long",
  futuresLeverage: 10,
  futuresOrderMode: "limit",
  futuresBalance: 5.0,
};

const tradingSlice = createSlice({
  name: "trading",
  initialState,
  reducers: {
    // Spot Trading Actions
    setSpotOrderType: (state, action) => {
      state.spotOrderType = action.payload;
    },
    setSpotAmount: (state, action) => {
      state.spotAmount = action.payload;
    },
    setSpotPrice: (state, action) => {
      state.spotPrice = action.payload;
    },
    setSpotOrderMode: (state, action) => {
      state.spotOrderMode = action.payload;
    },
    submitSpotOrder: (state, action) => {
      // Handle spot order submission logic
      console.log("Spot order submitted:", action.payload);
    },

    // Futures Trading Actions
    setFuturesOrderType: (state, action) => {
      state.futuresOrderType = action.payload;
    },
    setFuturesLeverage: (state, action) => {
      state.futuresLeverage = action.payload;
    },
    setFuturesOrderMode: (state, action) => {
      state.futuresOrderMode = action.payload;
    },
    submitFuturesOrder: (state, action) => {
      // Handle futures order submission logic
      console.log("Futures order submitted:", action.payload);
    },
  },
});

export const {
  setSpotOrderType,
  setSpotAmount,
  setSpotPrice,
  setSpotOrderMode,
  submitSpotOrder,
  setFuturesOrderType,
  setFuturesLeverage,
  setFuturesOrderMode,
  submitFuturesOrder,
} = tradingSlice.actions;

// Selectors
export const selectSpotTradingData = (state) => state.trading;
export const selectFuturesTradingData = (state) => state.trading;

export default tradingSlice.reducer;
