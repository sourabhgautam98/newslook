import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function NewsItem({ item }) {
  const {
    abstract = "",
    headline: { main = "" } = {},
    byline: { original = "" } = {},
    lead_paragraph = "",
    section_name = "",
    web_url = "#",
    multimedia,
  } = item;

  const imageUrl =
    multimedia && multimedia.length > 0 && multimedia[0]?.url
      ? `https://www.nytimes.com/${multimedia[0].url}`
      : '/images/no-image.jpg';

  console.log('🖼 Image:', imageUrl);

  return (
    <Card className="h-100 bg-dark text-white border border-secondary mb-4">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={main || "News image"}
        style={{
          height: "200px",
          objectFit: "cover",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
      />
      <Card.Body>
        <Card.Title className="fs-6">{main}</Card.Title>
        <Card.Text className="text-truncate">{abstract}</Card.Text>
        <Card.Text className="small text-secondary">
          {lead_paragraph?.slice(0, 100)}...
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="bg-black text-white small">
          {original || "Unknown Author"}
        </ListGroup.Item>
        <ListGroup.Item className="bg-black text-white small">
          {section_name || "No Section"}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href={web_url} target="_blank" className="text-info">
          Read more
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default NewsItem;
