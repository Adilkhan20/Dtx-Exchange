import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: [
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      balance: 0.50034,
      usdValue: 32519.5,
      change24h: 3.2,
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      balance: 4.1205,
      usdValue: 14008.2,
      change24h: -1.5,
    },
    {
      id: "usdt",
      name: "Tether",
      symbol: "USDT",
      balance: 1500.0,
      usdValue: 1500.0,
      change24h: 0.01,
    },
    {
      id: "sol",
      name: "Solana",
      symbol: "SOL",
      balance: 50.8,
      usdValue: 7890.35,
      change24h: 7.8,
    },
    {
      id: "ada",
      name: "Cardano",
      symbol: "ADA",
      balance: 1200.0,
      usdValue: 550.8,
      change24h: -0.5,
    },
  ],
  searchTerm: "",
  showBalance: true,
  totalValue: 0,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    toggleBalanceVisibility: (state) => {
      state.showBalance = !state.showBalance;
    },
    updateAssetBalance: (state, action) => {
      const { assetId, newBalance } = action.payload;
      const asset = state.assets.find((a) => a.id === assetId);
      if (asset) {
        asset.balance = newBalance;
      }
    },
    calculateTotalValue: (state) => {
      state.totalValue = state.assets.reduce(
        (sum, asset) => sum + asset.usdValue,
        0
      );
    },
  },
});

export const {
  setSearchTerm,
  toggleBalanceVisibility,
  updateAssetBalance,
  calculateTotalValue,
} = walletSlice.actions;

export const selectFilteredAssets = (state) => {
  const { assets, searchTerm } = state.wallet;
  if (!searchTerm) return assets;

  return assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const selectTotalValue = (state) =>
  state.wallet.assets.reduce((sum, asset) => sum + asset.usdValue, 0);

export default walletSlice.reducer;
