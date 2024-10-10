import React from 'react';

const NewsCard = ({ article }) => {
  const { title, description, url, urlToImage, source, publishedAt } = article;

  return (
    <div className="news-card">
      {urlToImage && <img src={urlToImage} alt={title} className="news-image" />}
      <div className="news-content">
        <h3 className="news-title">{title}</h3>
        <p className="news-description">{description}</p>
        <div className="news-meta">
          <span>{source.name}</span>
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="read-more">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
