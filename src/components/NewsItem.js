import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Row, Col } from 'react-bootstrap';

function NewsItem({ item }) {
    const {
        abstract = '',
        headline: { main = '' } = {},
        byline: { original = '' } = {},
        lead_paragraph = '',
        section_name = '',
        web_url = '#',
        multimedia
    } = item;
    const imageUrl = multimedia && multimedia.length > 0
        ? `https://www.nytimes.com/${multimedia[0].url}`
        : null;

    return (
        <Container>
            <Row className="justify-content-center">
                <Card className="mb-4">
                    <Row noGutters>
                        <Col xs={12} sm={6} md={4}>
                            {imageUrl ? (
                                <div className="image-container d-flex justify-content-center p-3">
                                    <Card.Img
                                        variant="top"
                                        src={imageUrl}
                                        alt={main || "No image description"}
                                        className="d-block mx-auto"
                                        style={{ padding: '0px', maxWidth: '100%', height: 'auto', borderRadius: '20px' }}
                                    />
                                </div>
                            ) : (
                                <div style={{
                                    height: '300px',
                                    backgroundColor: '#eee',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    No Image Available
                                </div>
                            )}
                        </Col>
                        <Col>
                            <Card.Body>
                                <Card.Title style={{ color: 'white' }}>
                                    {main || 'No Title Available'}
                                </Card.Title>
                                <Card.Text className='headline'>{abstract || 'No Headline available'}</Card.Text>
                                <Card.Text className='paragraph'>{lead_paragraph || 'No paragraph available'}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item style={{ backgroundColor: 'black', color: 'white' }}>
                                    {original || 'Author Unknown'}
                                </ListGroup.Item>
                                <ListGroup.Item style={{ backgroundColor: 'black', color: 'white' }}>
                                    {section_name || 'No Section Available'}
                                </ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Card.Link className='link' href={web_url} target="_blank" rel="noopener noreferrer">Read more</Card.Link>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </Container>
    );
}

export default NewsItem;
