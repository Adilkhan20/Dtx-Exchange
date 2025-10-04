import React from "react";
import { ExternalLink, Calendar, Bookmark, Share2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilteredNews } from "../store/slices/newsSlice";

function News() {
  const dispatch = useDispatch();
  const filteredNews = useSelector(selectFilteredNews);
  const { filter, bookmarks } = useSelector((state) => state.news);


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
