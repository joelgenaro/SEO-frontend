import React from "react";
import { Col, Form } from "react-bootstrap";
import { Input, Row } from "reactstrap";

const JobSearchOptions = () => {
  const searchBottom = {
    marginBottom: "50px",
  };
  return (
    <>
      <div className="job-list-header">
        {/* <Form action="#">
          <Row className="g-2" style={searchBottom}>
            <Col lg={4} md={6}>
              <div className="filler-job-form">
                <i className="uil uil-briefcase-alt"></i>
                <Input
                  type="search"
                  className="form-control filter-job-input-box-option"
                  id="exampleFormControlInput1"
                  placeholder="Company Name, Sector"
                />
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="filler-job-form">
                <i className="uil uil-briefcase-alt"></i>
                <Input
                  type="search"
                  className="form-control filter-job-input-box-option"
                  id="exampleFormControlInput1"
                  placeholder="County, City, Town"
                />
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div to="#" className="btn btn-primary w-100">
                <i className="uil uil-filter"></i> Search
              </div>
            </Col>
          </Row>
        </Form> */}
        <Form action="#">
          <Row className="g-2">
            <Col lg={3} md={6}>
              <div className="filler-job-form">
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="choices-single-categories"
                  id="choices-single-categories"
                  aria-label="Default select example"
                ></select>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="filler-job-form">
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="choices-single-categories"
                  id="choices-single-categories"
                  aria-label="Default select example"
                ></select>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="filler-job-form">
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="choices-single-categories"
                  id="choices-single-categories"
                  aria-label="Default select example"
                ></select>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="filler-job-form">
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="choices-single-categories"
                  id="choices-single-categories"
                  aria-label="Default select example"
                ></select>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="filler-job-form">
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="choices-single-categories"
                  id="choices-single-categories"
                  aria-label="Default select example"
                ></select>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="filler-job-form">
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="choices-single-location"
                  id="choices-single-location"
                  aria-label="Default select example"
                ></select>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="filler-job-form">
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="choices-single-categories"
                  id="choices-single-categories"
                  aria-label="Default select example"
                ></select>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div to="#" className="btn btn-primary w-100">
                <i className="uil uil-filter"></i> Fliter
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default JobSearchOptions;
