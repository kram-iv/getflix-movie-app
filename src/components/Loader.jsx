import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Loader = () => {
  return (
    <>
      <Container fluid="sm">
      <Row>
          <Col></Col>
          <Col></Col>
          <Col>
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="light" />
      </Col>
      <Col></Col>
      </Row>
      </Container>
    </>
  )
}

export default Loader