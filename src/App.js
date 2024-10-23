import React, { useState } from 'react';
import NewsItem from './components/NewsItem';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function App() {
    const [articles, setArticles] = useState([]);
    const [term, setTerm] = useState('Fortnite');
    const [searched, setSearched] = useState(false); 

    const handleSearch = async (event) => {
        event.preventDefault();
        const searchTerm = event.target.elements.search.value.trim();
        setTerm(searchTerm);

        if (searchTerm) {
            const encodedTerm = encodeURIComponent(searchTerm);
            try {
                const res = await axios.get(
                    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodedTerm}&api-key=Q5rRzoCrgaDjMJANGKMeKhZQEWuBKsVQ`
                );
                setArticles(res.data.response.docs);
                setSearched(true);
            } catch (error) {
                console.error('Failed to fetch', error);
                setArticles([]);
                setSearched(true);
            }
        }
    };

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
        </Container>
    );
}

export default App;
