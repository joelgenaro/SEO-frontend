import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "./Section";
import SearchOptions from "./SearchOptions";
import VacancyList from "./VacancyList";
import Pagination from "./Pagination";

const App = ({}) => {
  const [data, setData] = useState(null);
  const [countries, setCountries] = useState(null);
  const [sectorOne, setSectorOne] = useState(null);
  const [sectorTwo, setSectorTwo] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/index")
      .then((res) => res.json())
      .then((res) => {
        console.log("initial", res.data);
        setData(res.data.data);
        setCountries(res.countries);
        setSectorOne(res.sectorOne);
        setSectorTwo(res.sectorTwo);
        setLoading(true);
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
                {!countries ? (
                  <br />
                ) : (
                  <SearchOptions
                    setData={setData}
                    countries={countries}
                    sectorOne={sectorOne}
                    sectorTwo={sectorTwo}
                  />
                )}

                {!data ? <h1>Loading...</h1> : <VacancyList data={data} />}
                {/* {!data ? <h1>Loading...</h1> : <Pagination data={data} />} */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default App;
