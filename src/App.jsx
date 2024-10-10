import React, { useState, useEffect } from 'react';
import { fetchTopHeadlines } from './services/api';
import NewsList from './components/NewsList';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import Intro from './components/Intro';
import './styles/App.css';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 10;
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      if (query.trim() === '') {
        setArticles([]);
        setTotalResults(0);
        setError('');
        return;
      }

      try {
        setError('');
        const params = {
          q: query,
          page: currentPage,
          pageSize,
          country: 'us',
        };
        const data = await fetchTopHeadlines(params);
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        setIsInitialLoad(false);
      } catch (err) {
        if (err.response) {
          // Server responded with a status other than 2xx
          setError(`Error: ${err.response.data.message}`);
        } else if (err.request) {
          // Request was made but no response
          setError('Error: Network issue. Please try again.');
        } else {
          // Something else happened
          setError('Error: Something went wrong.');
        }
      }
    };

    getNews();
  }, [query, currentPage]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1);
    setIsInitialLoad(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <div className="app">
      <h1 className="app-title">News Dashboard</h1>
      <Intro />
      <SearchBar onSearch={handleSearch} />
      {error && <div className="error-message">{error}</div>}
      {isInitialLoad && articles.length === 0 ? (
        <div className="intro">
          <h2>Find the Latest News</h2>
          <p>
            Use the search bar above to find news articles that interest you. Enter keywords related to your topics of interest and stay informed with the latest updates.
          </p>
        </div>
      ) : (
        <>
          <NewsList articles={articles} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
