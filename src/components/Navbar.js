import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';

function NewsNavbar({ onSearch, onSelectCategory }) {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value.trim();
    if (searchValue) {
      onSearch(searchValue);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm sticky-top px-4" style={{ zIndex: 999 }}>
      <Container fluid>
        <Navbar.Brand href="#" className="fw-bold text-white fs-4 me-5">First Look</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav className="me-4">
            <Nav.Link className="text-white me-3" onClick={() => onSelectCategory('popular')}>
              Indian News
            </Nav.Link>
            <Nav.Link className="text-white" onClick={() => onSelectCategory('latest')}>
              Latest News
            </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              name="search"
              placeholder="Search news"
              className="me-2"
            />
            <Button type="submit" variant="light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NewsNavbar;
