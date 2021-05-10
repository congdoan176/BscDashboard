import React from "react";
import { Card, Container, Row } from "reactstrap";
import Header from "components/Headers/Header.js";


const Maps = () => {
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
