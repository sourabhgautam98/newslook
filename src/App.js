import React, { useState, useEffect } from 'react';
import NewsItem from './components/NewsItem';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function App() {
    const [articles, setArticles] = useState([]);
    const [term, setTerm] = useState('Fortnite');
    const [searched, setSearched] = useState(false); 

    useEffect(() => {
        const fetchData = async () => {
            const encodedTerm = encodeURIComponent(term);
            const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodedTerm}&api-key=Q5rRzoCrgaDjMJANGKMeKhZQEWuBKsVQ`);
            if (!res.ok) {
                throw new Error('Failed to fetch');
            }
            const data = await res.json();
            setArticles(data.response.docs);
            setSearched(true); 
        };
        if (term) {
            fetchData();
        }
    }, [term]);

    const handleSearch = (event) => {
        event.preventDefault();
        setTerm(event.target.elements.search.value.trim());
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
                        <Button  type="submit" className="mx-4">Search</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                {searched && articles.length === 0 ? ( 
                    <Col>
                        <p >No articles found. Try a different search term.</p>
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
