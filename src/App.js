import React, { useState, useEffect } from 'react';
import NewsItem from './components/NewsItem';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

function App() {
    const [articles, setArticles] = useState([]);
    const [term, setTerm] = useState('Fortnite');
    const [page, setPage] = useState(0);
    const [searched, setSearched] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchArticles = async (searchTerm, pageNum) => {
        if (loading || !hasMore) return; // Prevent multiple fetches
        setLoading(true);
        
        const encodedTerm = encodeURIComponent(searchTerm);
        try {
            const res = await axios.get(
                `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodedTerm}&page=${pageNum}&api-key=Q5rRzoCrgaDjMJANGKMeKhZQEWuBKsVQ`
            );
            const newArticles = res.data.response.docs;
            setArticles((prev) => [...prev, ...newArticles]);
            setHasMore(newArticles.length > 0);
            setSearched(true);
        } catch (error) {
            console.error('Failed to fetch', error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        const searchTerm = event.target.elements.search.value.trim();
        setTerm(searchTerm);
        setArticles([]);
        setPage(0);
        setHasMore(true);
        
        if (searchTerm) {
            await fetchArticles(searchTerm, 0); // Fetch first page
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop !== 
                document.documentElement.offsetHeight || 
                loading
            ) return;
            setPage((prev) => prev + 1); // Increment page number
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    useEffect(() => {
        if (page > 0) {
            fetchArticles(term, page);
        }
    }, [page]);

    return (
        <Container>
            <Row className="justify-content-center my-4">
                <Col md={5}>
                    <Form onSubmit={handleSearch} className="d-flex">
                        <Form.Control
                            type="text"
                            name="search"
                            defaultValue={term}
                            placeholder="Search for news articles..."
                        />
                        <Button type="submit" className="mx-4">Search</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                {searched && articles.length === 0 ? ( 
                    <Col>
                        <p>No articles found. Try a different search term.</p>
                    </Col>
                ) : (
                    articles.map(article => (
                        <NewsItem key={article._id} item={article} />
                    ))
                )}
            </Row>
            {loading && (
                <Row className="justify-content-center my-4">
                    <Col className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default App;
