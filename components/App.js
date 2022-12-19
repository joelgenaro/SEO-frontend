import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Section from "./Section";
import SearchOptions from "./SearchOptions";
import VacancyList from "./VacancyList";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const App = ({}) => {
  //Use for all the dispatch actions
  const loading = useSelector((state) => state.currentAuth.loading);

  return (
    <>
      <Section />

      <section className="section">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="me-lg-5 parentDiv">
                <SearchOptions />
                {!loading ? (
                  <VacancyList />
                ) : (
                  <div
                    className="spinner-border text-primary m-1"
                    role="status"
                  ></div>
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
