import React, { useState } from "react";
import Link from "next/link";
import { Col, Input, Label, Row } from "reactstrap";
import { useSelector } from "react-redux";
import CompanyModal from "./CompanyModal";

const JobVacancyList = () => {
  //Apply Now Model
  const data = useSelector((state) => state.currentAuth.data);

  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);

  return (
    <>
      <div>
        {data ? (
          data.map((company, key) => (
            <div key={key} className={"job-box card mt-4"}>
              <div className="p-4">
                <Row className="align-items-center">
                  <Col md={2}>
                    <div className="text-center mb-4 mb-md-0">
                      <Link href="/companydetails">
                        {"Company Name: " + company["full_name"]}
                      </Link>
                    </div>
                  </Col>

                  <Col md={3}>
                    <div className="mb-2 mb-md-0">
                      <h5 className="fs-18 mb-0">
                        <Link href="/jobdetails" className="text-dark">
                          {"Country: " + company["location"]}
                        </Link>
                      </h5>
                      <p className="text-muted fs-14 mb-0">
                        {"Locality: " + company["locality"]}
                      </p>
                    </div>
                  </Col>

                  <Col md={3}>
                    <div className="d-flex mb-2">
                      <div className="flex-shrink-0">
                        <i className="mdi mdi-map-marker text-primary me-1"></i>
                      </div>
                      <p className="text-muted mb-0">
                        {"City: " + company["metro"]}
                      </p>
                    </div>
                  </Col>

                  <Col md={2}>
                    <div className="d-flex mb-0">
                      <div className="flex-shrink-0">
                        <i className="uil uil-clock-three text-primary me-1"></i>
                      </div>
                      <p className="text-muted mb-0">
                        {"Town: " + company["region"]}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="p-3 bg-light">
                <Row className="justify-content-between">
                  <Col md={4}>
                    <div>
                      <p className="text-muted mb-0">
                        <span className="text-dark"> :</span>
                      </p>
                    </div>
                  </Col>
                  <Col lg={2} md={3}>
                    <div>
                      <button
                        onClick={openModal}
                        className="primary-link openModalBtn"
                      >
                        more <i className="mdi mdi-chevron-double-right"></i>
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          ))
        ) : (
          <div className="spinner-border text-primary m-1" role="status"></div>
        )}

        <CompanyModal modal={modal} openModal={openModal} />
      </div>
    </>
  );
};

export default JobVacancyList;
