import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

class Bootstrap extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row className="bg1">
            <Col>
              <>
                <Button variant="primary">Primary</Button>{" "}
                <Button variant="secondary">Secondary</Button>{" "}
                <Button variant="success">Success</Button>{" "}
                <Button variant="warning">Warning</Button>{" "}
                <Button variant="danger">Danger</Button>{" "}
                <Button variant="info">Info</Button>{" "}
                <Button variant="light">Light</Button>{" "}
                <Button variant="dark">Dark</Button>{" "}
                <Button variant="link">Link</Button>
              </>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Bootstrap;
