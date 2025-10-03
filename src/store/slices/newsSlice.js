import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [
    {
      id: 1,
      title: "Bitcoin Surges Past $45,000 Amid Institutional Adoption Wave",
      published_at: new Date().toISOString(),
      url: "https://cointelegraph.com/news/bitcoin-price-45000-institutional-adoption",
      source: { title: "CoinTelegraph" },
      votes: { positive: 15, negative: 2 },
      currencies: [{ code: "BTC", title: "Bitcoin" }],
    },
    {
      id: 2,
      title:
        "Ethereum Completes Successful Upgrade, ETH Price Reacts Positively",
      published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      url: "https://decrypt.com/news/ethereum-upgrade-successful",
      source: { title: "Decrypt" },
      votes: { positive: 8, negative: 1 },
      currencies: [{ code: "ETH", title: "Ethereum" }],
    },
    {
      id: 3,
      title: "Major Financial Institution Announces Crypto Custody Services",
      published_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      url: "https://www.coindesk.com/business/2024/01/15/major-bank-crypto-custody/",
      source: { title: "CoinDesk" },
      votes: { positive: 12, negative: 3 },
      currencies: [{ code: "BTC", title: "Bitcoin" }],
    },
    {
      id: 4,
      title: "DeFi Protocol Reaches $10 Billion in Total Value Locked",
      published_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      url: "https://defipulse.com/blog/defi-protocol-tvl-record",
      source: { title: "DeFi Pulse" },
      votes: { positive: 6, negative: 1 },
      currencies: [{ code: "ETH", title: "Ethereum" }],
    },
    {
      id: 5,
      title: "NFT Marketplace Sees Record Breaking $100M Sales in 24 Hours",
      published_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      url: "https://opensea.io/blog/nft-marketplace-record-sales",
      source: { title: "OpenSea" },
      votes: { positive: 9, negative: 2 },
      currencies: [{ code: "ETH", title: "Ethereum" }],
    },
    {
      id: 6,
      title: "Cryptocurrency Regulations Expected to Clear in Major Economies",
      published_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      url: "https://www.reuters.com/markets/currencies/crypto-regulations-expected-clear-major-economies-2024-01-15/",
      source: { title: "Reuters" },
      votes: { positive: 7, negative: 4 },
      currencies: [
        { code: "BTC", title: "Bitcoin" },
        { code: "ETH", title: "Ethereum" },
      ],
    },
    {
      id: 7,
      title: "Layer 2 Solutions Gain Traction as Ethereum Gas Fees Spike",
      published_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      url: "https://www.theblock.co/post/205432/layer-2-solutions-gain-traction-ethereum-gas-fees",
      source: { title: "The Block" },
      votes: { positive: 11, negative: 2 },
      currencies: [{ code: "ETH", title: "Ethereum" }],
    },
    {
      id: 8,
      title: "Bitcoin Mining Industry Shifts Towards Renewable Energy Sources",
      published_at: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
      url: "https://bitcoinmagazine.com/business/bitcoin-mining-renewable-energy-shift-2024",
      source: { title: "Bitcoin Magazine" },
      votes: { positive: 14, negative: 1 },
      currencies: [{ code: "BTC", title: "Bitcoin" }],
    },
  ],
  filter: "all",
  bookmarks: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsFilter: (state, action) => {
      state.filter = action.payload;
    },
    toggleBookmark: (state, action) => {
      const newsId = action.payload;
      const index = state.bookmarks.indexOf(newsId);
      if (index > -1) {
        state.bookmarks.splice(index, 1);
      } else {
        state.bookmarks.push(newsId);
      }
    },
    updateNews: (state, action) => {
      state.news = action.payload;
    },
  },
});

export const { setNewsFilter, toggleBookmark, updateNews } = newsSlice.actions;

export const selectFilteredNews = (state) => {
  const { news, filter } = state.news;
  if (filter === "all") return news;
  return news.filter((item) =>
    item.currencies?.some(
      (currency) => currency.code.toLowerCase() === filter.toUpperCase()
    )
  );
};

export default newsSlice.reducer;
