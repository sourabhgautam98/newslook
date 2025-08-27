import React, { useState, useEffect } from "react";
import NewsItem from "./components/NewsItem";
import NewsNavbar from "./components/Navbar";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";

function App() {
  const [articles, setArticles] = useState([]);
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState("popular");

 const API_KEY = process.env.REACT_APP_API_KEY;
  const API_HOST = "real-time-news-data.p.rapidapi.com";

  const fetchArticles = async (type, pageNum = 1, query = "") => {
    if (loading) return;
    setLoading(true);
    try {
      let options = {
        method: "GET",
        url: "https://real-time-news-data.p.rapidapi.com/search",
        params: {
          query: "India",
          country: "US",
          lang: "en",
          page: pageNum,
          limit: 12, // ✅ Load 12 articles per request
        },
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      };

      if (type === "popular") {
        options.params.query = "India";
      } else if (type === "latest") {
        options.url = "https://real-time-news-data.p.rapidapi.com/latest-news";
        options.params = {
          country: "US",
          lang: "en",
          page: pageNum,
          limit: 12,
        };
      } else if (type === "search") {
        options.params.query = query;
        options.params.limit = 12;
      }

      const res = await axios.request(options);
      const newArticles = res.data.data || [];

      setArticles((prev) =>
        pageNum === 1 ? newArticles : [...prev, ...newArticles]
      );
      setHasMore(newArticles.length > 0);
    } catch (err) {
      console.error("Fetch failed", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    setCategory("search");
    setTerm(searchTerm);
    setArticles([]);
    setPage(1);
    fetchArticles("search", 1, searchTerm);
  };

  const handleCategorySelect = (selected) => {
    setCategory(selected);
    setTerm("");
    setArticles([]);
    setPage(1);
    fetchArticles(selected, 1);
  };

  // Load Popular News initially
  useEffect(() => {
    setCategory("popular");
    setTerm("");
    setArticles([]);
    setPage(1);
    fetchArticles("popular", 1);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // Fetch more when page changes
  useEffect(() => {
    if (page === 1) return;
    if (category === "search") {
      fetchArticles("search", page, term);
    } else {
      fetchArticles(category, page);
    }
  }, [page]);

  return (
    <Container
      fluid
      style={{ padding: 0, backgroundColor: "#000", minHeight: "100vh" }}
    >
      <NewsNavbar
        onSearch={handleSearch}
        onSelectCategory={handleCategorySelect}
      />

      <h3 className="text-white px-4 pt-4">
        {category === "popular" && "Indian News"}
        {category === "latest" && "Latest News"}
        {category === "search" && `Search Results for "${term}"`}
      </h3>

      {/* ✅ Responsive Grid: 1 on xs, 3 on md, 4 on lg */}
      <Row className="g-4 px-5 py-4">
        {articles.length === 0 && !loading ? (
          <Col>
            <p className="text-white">No articles found.</p>
          </Col>
        ) : (
          articles.map((article, idx) => (
           <Col key={article.article_id || idx} xs={12} md={4}>
              <NewsItem item={article} />
            </Col>
          ))
        )}
      </Row>

      {loading && (
        <Row className="justify-content-center my-4">
          <Col className="text-center">
            <Spinner animation="border" variant="light" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
