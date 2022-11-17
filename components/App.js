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
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.currentAuth.loading);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .post(`https://yes-here.online/api/index`)
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: "UPDATE_DATA", payload: res.data.data });
        dispatch({ type: "UPDATE_LINKS", payload: res.data });
        dispatch({ type: "UPDATE_COUNTRIES", payload: res.countries });
        dispatch({ type: "UPDATE_SECTOR_ONE", payload: res.sectorOne });
        dispatch({ type: "UPDATE_SECTOR_TWO", payload: res.sectorTwo });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
