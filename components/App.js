import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "./Section";
import SearchOptions from "./SearchOptions";
import VacancyList from "./VacancyList";
import Pagination from "./Pagination";

const App = ({}) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/index")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="me-lg-5">
                <SearchOptions />
                {!data ? (
                  <h1 style={{ marginRight: "500px" }}>Loading...</h1>
                ) : (
                  <VacancyList data={data} />
                )}
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
