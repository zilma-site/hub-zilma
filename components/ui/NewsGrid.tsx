"use client";

import { useEffect, useState } from "react";

type News = {
  title: string
  link: string
  publishedAt: string
  source: string
}

export default function NewsGrid() {
  const [news, setNews] = useState<News[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mb-20">
      <input
        type="text"
        placeholder="Buscar artigos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-4 text-gray-600 border px-3 py-2 rounded-md w-64"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredNews.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            className="border border-gray-300 p-6 bg-white shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-lg text-black font-semibold mb-3">
              [{item.source}] {item.title}
            </h3>

            <span className="text-gray-400 text-xs">
              {new Date(item.publishedAt).toLocaleDateString()}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}