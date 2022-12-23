import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "./Section";
import SearchOptions from "./SearchOptions";
import VacancyList from "./VacancyList";
import Pagination from "./Pagination";

const App = ({}) => {
  return (
    <>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="me-lg-5 parentDiv">
                <SearchOptions />
                <VacancyList />
                <Pagination />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default App;
