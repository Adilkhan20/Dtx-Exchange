import React from "react";
import { ExternalLink, Calendar, Bookmark, Share2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setNewsFilter, toggleBookmark } from "../store/slices/newsSlice";
import { selectFilteredNews } from "../store/slices/newsSlice";

function News() {
  const dispatch = useDispatch();
  const filteredNews = useSelector(selectFilteredNews);
  const { filter, bookmarks } = useSelector((state) => state.news);

  const categories = [
    { id: "all", name: "All News" },
    { id: "bitcoin", name: "Bitcoin" },
    { id: "ethereum", name: "Ethereum" },
    { id: "defi", name: "DeFi" },
    { id: "nft", name: "NFT" },
    { id: "regulation", name: "Regulation" },
  ];

  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    } catch {
      return "Recently";
    }
  };

  const getSentimentColor = (votes) => {
    if (!votes) return "text-gray-400";

    const positive = votes.positive || 0;
    const negative = votes.negative || 0;
    const total = positive + negative;

    if (total === 0) return "text-gray-400";
    const ratio = positive / total;

    if (ratio > 0.6) return "text-green-400";
    if (ratio > 0.4) return "text-yellow-400";
    return "text-red-400";
  };

  const getSentimentIcon = (votes) => {
    if (!votes) return "➡️";

    const positive = votes.positive || 0;
    const negative = votes.negative || 0;
    const total = positive + negative;

    if (total === 0) return "➡️";
    const ratio = positive / total;

    if (ratio > 0.6) return "📈";
    if (ratio > 0.4) return "➡️";
    return "📉";
  };
  const handleFilterChange = (categoryId) => {
    dispatch(setNewsFilter(categoryId));
  };

  const handleBookmarkToggle = (newsId) => {
    dispatch(toggleBookmark(newsId));
  };

  const handleShare = async (title, url) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="h-full w-full bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Crypto News</h2>
            <p className="text-gray-400 text-sm">
              Latest market updates & analysis
            </p>
          </div>
          <div className="text-sm text-gray-400">
            {filteredNews.length} articles
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterChange(category.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                filter === category.id
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* News List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-700/30">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="p-6 hover:bg-gray-700/30 transition-colors duration-150 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar size={14} />
                  <span>{formatTime(item.published_at)}</span>
                  <span className="flex items-center gap-1">
                    {getSentimentIcon(item.votes)}
                    <span className={getSentimentColor(item.votes)}>
                      {item.votes?.positive || 0}👍
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handleBookmarkToggle(item.id)}
                    className="p-1 hover:bg-gray-600 rounded transition-colors duration-200"
                  >
                    <Bookmark
                      size={16}
                      className={
                        bookmarks.includes(item.id)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-400"
                      }
                    />
                  </button>
                  <button
                    onClick={() => handleShare(item.title, item.url)}
                    className="p-1 hover:bg-gray-600 rounded transition-colors duration-200"
                  >
                    <Share2 size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 leading-tight line-clamp-2">
                {item.title}
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
                    {item.source?.title || "Crypto News"}
                  </span>
                  {item.currencies?.map((currency) => (
                    <span
                      key={currency.code}
                      className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded"
                    >
                      {currency.code}
                    </span>
                  ))}
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  Read More
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700/50 bg-gray-700/20">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Demo News Feed</span>
          <span>Static data - {filteredNews.length} articles</span>
        </div>
      </div>
    </div>
  );
}

export default News;
