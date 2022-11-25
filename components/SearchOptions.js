import React, { useState, useEffect, useRef } from "react";
import { Col, Form } from "react-bootstrap";
import { Input, Row } from "reactstrap";
import axios from "axios";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";

const JobSearchOptions = () => {
  //Use for all the dispatch actions
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.currentAuth.countries);
  const pageNumber = useSelector((state) => state.currentAuth.page);

  const [cities, setCities] = useState(null);
  const [town, setTown] = useState(null);
  const [sectorOne, setSectorOne] = useState(null);
  const [sectorTwo, setSectorTwo] = useState(null);
  const [city, setCity] = useState("");
  const [sector, setSector] = useState("");

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current && pageNumber == 1) {
      isFirstRun.current = false;
      return;
    }
    getDatawithCurrentOption();
  }, [pageNumber]);

  const getDatawithCurrentOption = async () => {
    dispatch({ type: "UPDATE_LOADING", payload: true });
    dispatch({ type: "UPDATE_API_ROUTE", payload: "getData" });

    let formData = $("#filterForm").serializeArray();

    axios.defaults.withCredentials = true;
    axios
      .get(
        `https://yes-here.online/api/getData?page=${pageNumber}&country=${formData[0].value}&city=${formData[1].value}&town=${formData[2].value}&sectorOne=${formData[3].value}&sectorTwo=${formData[4].value}`
      )
      .then((res) => {
        dispatch({ type: "UPDATE_DATA", payload: res.data.data });
        dispatch({ type: "UPDATE_LINKS", payload: res.data });
        dispatch({ type: "UPDATE_LOADING", payload: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataWithText = () => {
    if (sector == "" && city == "") return;

    dispatch({ type: "UPDATE_LOADING", payload: true });

    axios.defaults.withCredentials = true;
    axios
      .get(
        `https://yes-here.online/api/getDataWithText?sector=${sector}&city=${city}`
      )
      .then((res) => {
        dispatch({ type: "UPDATE_DATA", payload: res.data.data });
        dispatch({ type: "UPDATE_LINKS", payload: res.data });
        dispatch({ type: "UPDATE_LOADING", payload: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get childrens when changing parent option
  function handleChange(type, value) {
    switch (type) {
      case "country":
        setCities(null);
        setTown(null);
        setSectorOne(null);
        setSectorTwo(null);
        break;

      case "city":
        setTown(null);
        break;

      default:
        break;
    }

    if (value != "") {
      axios.defaults.withCredentials = true;
      axios
        .get(`https://yes-here.online/api/getSearchOptions/${type}/${value}`)
        .then((res) => {
          switch (type) {
            case "country":
              setCities(res.data.data);
              setSectorOne(res.data.sectorOne);
              setSectorTwo(res.data.sectorTwo);
              break;

            case "city":
              setTown(res.data.data);
              break;

            default:
              break;
          }
          // get date with current options
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // getDatawithCurrentOption();
  }
  return (
    <>
      <div className="job-list-header">
        {/* <Form action="#" id="textFilter">
          <Row className="g-2">
            <Col lg={4} md={6}>
              <div className="filler-job-form">
                <i className="uil uil-briefcase-alt"></i>
                <Input
                  type="search"
                  className="form-control filter-job-input-box-option"
                  id="exampleFormControlInput1"
                  name="sector"
                  onChange={(e) => {
                    setSector(e.target.value);
                  }}
                  placeholder="Tailor, Doctor..."
                />
              </div>
            </Col>{" "}
            <Col lg={4} md={6}>
              <div className="filler-job-form">
                <i className="uil uil-briefcase-alt"></i>
                <Input
                  type="search"
                  className="form-control filter-job-input-box-option"
                  id="exampleFormControlInput1"
                  name="city"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  placeholder="City, Locality..."
                />
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div
                to="#"
                onClick={() => getDataWithText()}
                className="btn btn-info w-100"
              >
                <i className="uil uil-search"></i> Search
              </div>
            </Col>
          </Row>
        </Form> */}
        <form action="#" id="filterForm">
          <Row className="g-2">
            <Col lg={4} md={6}>
              <div className="filler-job-form">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="country"
                  id="country"
                  aria-label="Default select example"
                  onChange={(e) => handleChange("country", e.target.value)}
                >
                  <option value="">...</option>
                  {countries
                    ? countries.map((country, key) => (
                        <option key={key} value={country["location_country"]}>
                          {country["location_country"]}
                        </option>
                      ))
                    : "Loading..."}
                </select>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="filler-job-form">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="city"
                  id="city"
                  aria-label="Default select example"
                  onChange={(e) => handleChange("city", e.target.value)}
                >
                  <option value="">...</option>

                  {cities
                    ? cities.map((city, key) => (
                        <option key={key} value={city.region}>
                          {city.region}
                        </option>
                      ))
                    : "loading..."}
                </select>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="filler-job-form">
                <label htmlFor="town" className="form-label">
                  Town
                </label>
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="town"
                  id="town"
                  aria-label="Default select example"
                >
                  <option value="">...</option>
                  {town
                    ? town.map((town, key) => (
                        <option key={key} value={town.locality}>
                          {town.locality}
                        </option>
                      ))
                    : "Loading..."}
                </select>
              </div>
            </Col>
            {/* <Col lg={3} md={6}>
              <div className="filler-job-form">
                <label htmlFor="locality" className="form-label">
                  Locality
                </label>
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="locality"
                  id="locality"
                  aria-label="Default select example"
                  // onChange={() => getDatawithCurrentOption()}
                >
                  <option value="">...</option>

                  {localities
                    ? localities.map((locality, key) => (
                        <option key={key} value={locality.locality}>
                          {locality.locality}
                        </option>
                      ))
                    : "Loading..."}
                </select>
              </div>
            </Col> */}
          </Row>

          <Row className="g-2">
            <Col lg={4} md={6}>
              <div className="filler-job-form">
                <label htmlFor="sectorOne" className="form-label">
                  Sector 1
                </label>
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="sectorOne"
                  id="sectorOne"
                  aria-label="Default select example"
                >
                  <option value="">...</option>
                  {sectorOne
                    ? sectorOne.map((sector, key) => (
                        <option key={key} value={sector.industry}>
                          {sector.industry}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="filler-job-form">
                <label htmlFor="sectorTwo" className="form-label">
                  Sector 2
                </label>
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="sectorTwo"
                  id="sectorTwo"
                  aria-label="Default select example"
                  // onChange={() => getDatawithCurrentOption()}
                >
                  <option value="">...</option>
                  {sectorTwo
                    ? sectorTwo.map((sector, key) => (
                        <option key={key} value={sector.industry_two}>
                          {sector.industry_two}
                        </option>
                      ))
                    : "Loading..."}
                </select>
              </div>
            </Col>
            {/* <Col lg={3} md={6}>
              <div className="filler-job-form">
                <label htmlFor="sectorThree" className="form-label">
                  Sector 3
                </label>
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="sectorThree"
                  id="sectorThree"
                  aria-label="Default select example"
                  // onChange={() => getDatawithCurrentOption()}
                >
                  <option value="">...</option>
                </select>
              </div>
            </Col> */}
            <Col lg={4} md={6}>
              <label className="form-label">{"."} </label>
              <div
                onClick={() => getDatawithCurrentOption()}
                to="#"
                className="btn btn-primary w-100"
              >
                <i className="uil uil-filter"></i> Fliter
              </div>
            </Col>
          </Row>
        </form>
      </div>
    </>
  );
};

export default JobSearchOptions;
