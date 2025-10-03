import React from "react";
import {
  FaSearch,
  FaStar,
  FaAngleRight,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

const marketData = [
  {
    name: "APTUSDT",
    leverage: "50.00x",
    short: "5.1182",
    long: "5.1189",
    change: -2.04,
    chart: "down",
  },
  {
    name: "ARUUSDT",
    leverage: "75.00x",
    short: "5.982",
    long: "5.983",
    change: -1.97,
    chart: "down",
  },
  {
    name: "ATOMUSDT",
    leverage: "75.00x",
    short: "4.233",
    long: "4.234",
    change: -1.79,
    chart: "down",
  },
  {
    name: "APEUSDT",
    leverage: "75.00x",
    short: "0.5553",
    long: "0.5554",
    change: -1.7,
    chart: "down",
  },
  {
    name: "BCHUSDT",
    leverage: "75.00x",
    short: "600.55",
    long: "600.56",
    change: 1.11,
    chart: "up",
  },
  {
    name: "ALGUSDT",
    leverage: "75.00x",
    short: "0.2226",
    long: "0.2227",
    change: -1.02,
    chart: "down",
  },
  {
    name: "AVAXUSDT",
    leverage: "75.00x",
    short: "30.706",
    long: "30.707",
    change: -0.83,
    chart: "down",
  },
];

const Sparkline = ({ type = "down" }) => (
  <svg width="100" height="30" className="mx-auto">
    <path
      d={
        type === "down"
          ? "M0 15 Q 25 28, 50 15 T 100 20"
          : "M0 15 Q 25 2, 50 15 T 100 10"
      }
      stroke={type === "down" ? "#ef4444" : "#22c55e"}
      fill="none"
      strokeWidth="2"
    />
  </svg>
);

const LandingPage = () => {
  return (
    <div className="bg-[#0B1120] text-white font-sans min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Trade Crypto with <span className="text-yellow-400">250x</span>{" "}
              Leverage
            </h1>
            <p className="text-gray-400 mb-8">
              List and derivatives markets for BTC, ETH, and top altcoins. Built
              for speed, security, and traders — all on a next-gen
              blockchain-powered trading platform.
            </p>
            <button className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-md flex items-center hover:bg-yellow-500 transition">
              Get Started <BsArrowRight className="ml-2" />
            </button>
          </div>
          <div className="flex justify-center">
            {/* Placeholder for the hero image/animation */}
            <img
              src="https://plus.unsplash.com/premium_photo-1682310075673-b408eb1ca6fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhZGluZ3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Crypto Coins"
              className="w-full max-w-sm"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Left Column: Market Table */}
          <div className="lg:col-span-2 bg-[#121a2f] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <button className="relative text-white font-semibold">
                  Hot
                  <span className="absolute -top-2 -right-2 text-xs bg-red-500 rounded-full px-1.5 py-0.5">
                    HOT
                  </span>
                </button>
                <button className="bg-gray-700 text-white px-4 py-1.5 rounded-md">
                  Spot
                </button>
                <button>Futures</button>
              </div>
              <div className="flex items-center space-x-4 text-gray-400">
                <a
                  href="#"
                  className="flex items-center text-sm hover:text-white"
                >
                  <FaStar className="mr-2 text-yellow-400" /> Favorites
                </a>
                <FaSearch />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-400 border-b border-gray-700">
                  <tr>
                    <th className="py-3 px-2">Max Short</th>
                    <th className="py-3 px-2">Max Leverage</th>
                    <th className="py-3 px-2">Short</th>
                    <th className="py-3 px-2">Long</th>
                    <th className="py-3 px-2 text-center">Charts</th>
                    <th className="py-3 px-2 text-right">Change 24h</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.map((coin) => (
                    <tr
                      key={coin.name}
                      className="border-b border-gray-800 hover:bg-gray-800/50"
                    >
                      <td className="py-4 px-2 font-semibold">{coin.name}</td>
                      <td className="py-4 px-2 text-gray-300">
                        {coin.leverage}
                      </td>
                      <td className="py-4 px-2 text-gray-300">{coin.short}</td>
                      <td className="py-4 px-2 text-gray-300">{coin.long}</td>
                      <td className="py-4 px-2">
                        <Sparkline type={coin.chart} />
                      </td>
                      <td
                        className={`py-4 px-2 text-right font-medium ${
                          coin.change > 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {coin.change > 0 ? "▲" : "▼"} {Math.abs(coin.change)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-6">
              <a href="#" className="text-yellow-400 text-sm font-semibold">
                Show More ⌄
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#121a2f] p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Pay Trading Fees with MBG</h3>
              <p className="text-sm text-gray-400 mb-4">
                Instead of paying trading fees in base or quote currency, pay an
                equivalent amount with MBG.
              </p>
              <a
                href="#"
                className="text-yellow-400 font-semibold text-sm flex items-center"
              >
                Learn More <FaAngleRight className="ml-1" />
              </a>
            </div>
            <div className="bg-[#121a2f] p-6 rounded-lg text-center">
              <h3 className="text-gray-400 font-semibold mb-2">
                Market Sentiment
              </h3>
              <img
                src="https://images.unsplash.com/photo-1644924735973-0ba06d83268e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyYWRpbmd8ZW58MHx8MHx8fDA%3D"
                alt="Greed Index at 63"
                className="mx-auto my-4"
              />
            </div>
            <div className="bg-[#121a2f] p-6 rounded-lg">
              <div className="flex text-sm mb-4 border-b border-gray-700">
                <button className="py-2 px-4 text-white border-b-2 border-yellow-400 font-semibold">
                  Top Gainers
                </button>
                <button className="py-2 px-4 text-gray-500">Top Losers</button>
              </div>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between items-center">
                  <span>MANA</span>{" "}
                  <span className="text-green-500 font-medium">▲ 5.01%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>SOL</span>{" "}
                  <span className="text-green-500 font-medium">▲ 3.97%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>DOGE</span>{" "}
                  <span className="text-green-500 font-medium">▲ 2.75%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>DOT</span>{" "}
                  <span className="text-green-500 font-medium">▲ 2.60%</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-[#121a2f] p-8 rounded-lg flex flex-col items-start">
            <h2 className="text-2xl font-bold mb-2">Derivatives Trading</h2>
            <p className="text-gray-400 mb-6 flex-grow">
              Trade with up to 250x leverage on crypto derivatives!
            </p>
            <button className="mt-auto bg-yellow-400 text-black font-bold py-2 px-5 rounded-md hover:bg-yellow-500">
              Sign Up
            </button>
          </div>
          <div className="bg-[#121a2f] p-8 rounded-lg flex flex-col items-start">
            <h2 className="text-2xl font-bold mb-2">Spot Trading</h2>
            <p className="text-gray-400 mb-6 flex-grow">
              Access the most liquid crypto market in the world.
            </p>
            <button className="mt-auto bg-yellow-400 text-black font-bold py-2 px-5 rounded-md hover:bg-yellow-500">
              Sign Up
            </button>
          </div>
        </section>
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            Quick Access Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Convert Your Assets",
              "Transfer Between Wallets",
              "Quick Buy Crypto",
              "Quick Sell Your Assets",
            ].map((title, i) => (
              <div
                key={title}
                className="bg-[#121a2f] p-6 rounded-lg text-center"
              >
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Quickly perform common actions with a single click.
                </p>
                <button className="bg-gray-700 w-full py-2 rounded-md hover:bg-gray-600">
                  {["Convert", "Transfer", "Instant Buy", "Panic Sell"][i]}
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">On the Go</h2>
            <p className="text-gray-400 mb-6">Download DTX</p>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="bg-black text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaApple className="mr-2 text-xl" /> App Store
              </a>
              <a
                href="#"
                className="bg-black text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaGooglePlay className="mr-2 text-xl" /> Google Play
              </a>
            </div>
            <div className="bg-white p-2 inline-block rounded-lg">
              <img
                src="./DtX.png"
                alt="QR Code"
                className="w-24 h-24"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Market News</h2>
            <ul className="space-y-5">
              <li className="border-b border-gray-800 pb-4">
                <a href="#" className="font-semibold hover:text-yellow-400">
                  Ray Dalio Doubts Any Central Bank Would Take Bitcoin As
                  Reserve Currency
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  Oct 03, 2025 • John Paul satra
                </p>
              </li>
              <li className="border-b border-gray-800 pb-4">
                <a href="#" className="font-semibold hover:text-yellow-400">
                  Bitcoin Breaks $121,000, Ethereum, Dogecoin Also Extend Gains
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  Oct 03, 2025 •Nouman khan
                </p>
              </li>
              <li>
                <a href="#" className="font-semibold hover:text-yellow-400">
                  Bitcoin Surpasses $120,000 As XRP Hits $3
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  Oct 03, 2025 • Zohaib
                </p>
              </li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold text-center mb-8">
            Additional Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-[#121a2f] p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Feature {i + 1}</h3>
                <p className="text-gray-400 text-sm">
                  Additional content to make the page scrollable for
                  demonstration purposes.
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
