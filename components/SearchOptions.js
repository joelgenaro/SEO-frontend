import React, { useState, useEffect, useRef } from "react";
import { Col, Form } from "react-bootstrap";
import { Input, Row } from "reactstrap";
import axios from "axios";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";

function sectorFilter(elem) {
  if (elem.industry == null && elem.industry_two == null) {
    return "";
  } else if (elem.industry == null) {
    return elem.industry_two;
  } else if (elem.industry_two == null) {
    return elem.industry;
  } else {
    return elem.industry + " - " + elem.industry_two;
  }
}

const JobSearchOptions = () => {
  //Use for all the dispatch actions
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.currentAuth.countries);
  const pageNumber = useSelector((state) => state.currentAuth.page);

  const [city, setCity] = useState(null);
  const [town, setTown] = useState(null);
  const [locality, setLocality] = useState(null);
  const [sector, setSector] = useState(null);
  const [search, setSearch] = useState("");
  const [disableForMenu, setDisableForMenu] = useState(false);
  const [disableForTxt, setDisableForTxt] = useState(false);

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current && pageNumber == 1) {
      isFirstRun.current = false;
      return;
    }
    disableForMenu == false ? getDatawithCurrentOption() : getDataWithText();
  }, [pageNumber]);

  const getDatawithCurrentOption = async () => {
    dispatch({ type: "UPDATE_LOADING", payload: true });
    dispatch({ type: "UPDATE_API_ROUTE", payload: "getData" });

    let formData = $("#filterForm").serializeArray();

    axios.defaults.withCredentials = true;
    axios
      .get(
        `https://yes-here.online/api/getData?page=${pageNumber}&country=${formData[0].value}&city=${formData[1].value}&town=${formData[2].value}&locality=${formData[3].value}&sector=${formData[4].value}`
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
    if (search == "") return;

    setCity(null);
    setTown(null);
    setLocality(null);
    setSector(null);
    setDisableForMenu(true);
    setDisableForTxt(false);

    dispatch({ type: "UPDATE_LOADING", payload: true });

    axios.defaults.withCredentials = true;
    axios
      .get(`https://yes-here.online/api/getDataWithText?search=${search}`)
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
    setSearch("");
    setDisableForMenu(false);
    setDisableForTxt(true);

    let formData = $("#filterForm").serializeArray();

    switch (type) {
      case "country":
        setCity(null);
        setTown(null);
        setLocality(null);
        setSector(null);
        break;

      case "city":
        setTown(null);
        setLocality(null);
        setSector(null);
        break;

      case "town":
        setLocality(null);
        setSector(null);
        break;

      case "locality":
        setSector(null);
        break;

      default:
        break;
    }

    if (value != "") {
      axios.defaults.withCredentials = true;
      axios
        .get(
          `https://yes-here.online/api/getSearchOptions?type=${type}&country=${formData[0].value}&city=${formData[1].value}&town=${formData[2].value}&locality=${formData[3].value}`
        )
        .then((res) => {
          switch (type) {
            case "country":
              setCity(res.data.main);
              setSector(res.data.sector);
              break;

            case "city":
              setTown(res.data.main);
              setSector(res.data.sector);
              break;

            case "town":
              setLocality(res.data.main);
              setSector(res.data.sector);
              break;

            case "locality":
              setSector(res.data.sector);
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
  }

  return (
    <>
      <div className="job-list-header">
        <Form action="#" id="textFilter">
          <Row className="g-2">
            <Col lg={8} md={6}>
              <div className="filler-job-form">
                <i className="uil uil-briefcase-alt"></i>
                <Input
                  type="search"
                  className="form-control filter-job-input-box-option"
                  id="exampleFormControlInput1"
                  name="sector"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </Col>{" "}
            <Col lg={4} md={6}>
              <li
                disabled={disableForTxt}
                onClick={() => getDataWithText()}
                className="btn btn-info w-100"
              >
                <i className="uil uil-search"></i> Search
              </li>
            </Col>
          </Row>
        </Form>
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
                        <option key={key} value={country["location"]}>
                          {country["location"]}
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

                  {city
                    ? city.map((city, key) => (
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
                  onChange={(e) => handleChange("town", e.target.value)}
                >
                  <option value="">...</option>
                  {town
                    ? town.map((town, key) => (
                        <option key={key} value={town.metro}>
                          {town.metro}
                        </option>
                      ))
                    : "Loading..."}
                </select>
              </div>
            </Col>
          </Row>

          <Row className="g-2">
            <Col lg={4} md={6}>
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
                  onChange={(e) => handleChange("locality", e.target.value)}
                >
                  <option value="">...</option>
                  {locality
                    ? locality.map((elem, key) => (
                        <option key={key} value={elem.locality}>
                          {elem.locality}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="filler-job-form">
                <label htmlFor="sector" className="form-label">
                  Sector
                </label>
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="sector"
                  id="sector"
                  aria-label="Default select example"
                >
                  <option value="">...</option>
                  {sector
                    ? sector.map((elem, key) => (
                        <option
                          key={key}
                          value={elem.industry + "-" + elem.industry_two}
                        >
                          {sectorFilter(elem)}
                        </option>
                      ))
                    : "Loading..."}
                </select>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <label className="form-label">{"."} </label>
              <li
                disabled={disableForMenu}
                onClick={() => getDatawithCurrentOption()}
                className="btn btn-primary w-100 filterBtn"
              >
                <i className="uil uil-filter"></i> Fliter
              </li>
            </Col>
          </Row>
        </form>
      </div>
    </>
  );
};

export default JobSearchOptions;
