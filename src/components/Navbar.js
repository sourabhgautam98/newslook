import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";

function NewsNavbar({ onSearch, onSelectCategory }) {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value.trim();
    if (searchValue) {
      onSearch(searchValue);
    }
  };

  return (
    <Navbar
      expand="lg"
      className="shadow-sm sticky-top px-4"
      style={{ background: "#111", zIndex: 999 }}
    >
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand href="#" className="fw-bold text-white fs-3 me-4">
          📰 First Look
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" className="border-0 bg-light" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link
              className="text-white fw-semibold mx-2"
              onClick={() => onSelectCategory("popular")}
            >
              Indian News
            </Nav.Link>
          </Nav>

          {/* ✅ Search aligned right */}
          <Form className="d-flex ms-auto" onSubmit={handleSearch}>
            <FormControl
              type="search"
              name="search"
              placeholder="Search news..."
              className="me-2 rounded-pill px-3"
              style={{ minWidth: "220px" }}
            />
            <Button
              type="submit"
              variant="primary"
              className="rounded-pill px-4 fw-semibold"
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NewsNavbar;
