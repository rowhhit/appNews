import React from 'react';
import NewsCard from './NewsCard';

const NewsList = ({ articles }) => {
  if (!articles.length) {
    return <p>No news articles available.</p>;
  }

  return (
    <div className="news-list">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsList;
