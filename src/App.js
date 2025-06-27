import React, { useState, useEffect } from "react";
import NewsItem from "./components/NewsItem";
import NewsNavbar from "./components/Navbar";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";

function App() {
  const [articles, setArticles] = useState([]);
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState("popular");

  const API_KEY = "Q5rRzoCrgaDjMJANGKMeKhZQEWuBKsVQ";

  const fetchArticles = async (type, pageNum = 0, query = "") => {
    if (loading) return;
    setLoading(true);
    try {
      let url = "";

      if (type === "popular") {
        const encodedQuery = encodeURIComponent("India");
        url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodedQuery}&page=${pageNum}&api-key=${API_KEY}`;
      } else if (type === "latest") {
        url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&page=${pageNum}&api-key=${API_KEY}`;
      } else if (type === "search") {
        const encodedQuery = encodeURIComponent(query);
        url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodedQuery}&page=${pageNum}&api-key=${API_KEY}`;
      }

      const res = await axios.get(url);
      const newArticles = res.data.response.docs;

      setArticles((prev) =>
        pageNum === 0 ? newArticles : [...prev, ...newArticles]
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
    setPage(0);
    fetchArticles("search", 0, searchTerm);
  };

  const handleCategorySelect = (selected) => {
    setCategory(selected);
    setTerm("");
    setArticles([]);
    setPage(0);
    fetchArticles(selected, 0);
  };

  // Load Popular News initially
  useEffect(() => {
    setCategory("popular");
    setTerm("");
    setArticles([]);
    setPage(0);
    fetchArticles("popular", 0);
  }, []);

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

  useEffect(() => {
    if (page === 0) return;
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

      {/* ✅ Smaller cards: 3 per row on md, 4 per row on lg */}
      <Row className="g-4 px-5 py-4">
        {articles.length === 0 && !loading ? (
          <Col>
            <p className="text-white">No articles found.</p>
          </Col>
        ) : (
          articles.map((article, idx) => (
            <Col key={article._id || idx} xs={12} md={4}>
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
