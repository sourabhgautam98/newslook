import React from "react";
import { Card, Button } from "react-bootstrap";

const NewsItem = ({ item }) => {
  const {
    title,
    link,
    snippet,
    photo_url,
    source_name,
    published_datetime_utc,
  } = item;

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card
      className="h-100"
      style={{ backgroundColor: "#1a1a1a", color: "white", border: "1px solid #333" }}
    >
      <Card.Img
        variant="top"
        src={photo_url ? photo_url : "/images/no-image.jpg"}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{snippet}</Card.Text>
        <div className="mt-auto">
          <small className="text-muted">
            {source_name} • {formatDate(published_datetime_utc)}
          </small>
        </div>
        <Button
          variant="primary"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2"
        >
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NewsItem;
