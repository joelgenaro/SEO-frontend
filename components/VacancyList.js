import React, { useState, memo } from "react";
import Link from "next/link";
import { Col, Input, Label, Row } from "reactstrap";
import { useSelector } from "react-redux";
import CompanyModal from "./CompanyModal";
import Map from "./Map";

const JobVacancyList = () => {
  //Apply Now Model
  const data = useSelector((state) => state.currentAuth.data);
  const [modal, setModal] = useState(false);
  const [companyID, setCompanyID] = useState(null);

  const openModal = (e) => {
    setCompanyID(e.target.id);
    setModal(!modal);
  };
  return (
    <>
      <div>
        <Map companies={data} />
      </div>
      <div>
        {data ? (
          data.map((company, key) => (
            <div key={key} className={"job-box card mt-4"}>
              <div className="p-4">
                {company["company_name"] ? (
                  <>
                    <Row>
                      <Col md={12} lg={6}>
                        <div className="mb-2 mb-md-1">
                          <h5 className="fs-18 mb-3">
                            <Link
                              id={company["id"]}
                              onClick={openModal}
                              className="companyName"
                              href="javascript:;"
                            >
                              {"Company Name: " + company["company_name"]}
                            </Link>
                          </h5>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} lg={6}>
                        <div className="mb-2 mb-md-1">
                          <p className="text-muted mb-0">
                            {"Full Name: " + company["full_name"]}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    {" "}
                    <Row>
                      <Col md={12} lg={6}>
                        <div className="mb-2 mb-md-1">
                          <p className="text-muted mb-0">
                            {"Company Name: " + company["company_name"]}
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} lg={6}>
                        <div className="mb-2 mb-md-1">
                          <h5 className="fs-18 mb-3">
                            <Link
                              id={company["id"]}
                              onClick={openModal}
                              className="companyName"
                              href="javascript:;"
                            >
                              {"Full Name: " + company["full_name"]}
                            </Link>
                          </h5>
                        </div>
                      </Col>
                    </Row>
                  </>
                )}

                <Row>
                  <Col md={12} lg={6}>
                    <div className="d-flex mb-0">
                      <p className="text-muted mb-0">
                        {"Job Title: " + company["Job_title"]}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} lg={6}>
                    <div className="d-flex mb-0">
                      <p className="text-muted mb-0">
                        {"Company_Location_Street_Address: " +
                          company["Company_Location_Street_Address"]}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} lg={6}>
                    <div className="d-flex mb-0">
                      <p className="text-muted mb-0">
                        {"Main Sector: " + company["industry"]}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} lg={6}>
                    <div className="d-flex mb-0">
                      <p className="text-muted mb-0">
                        {"Sub Sector: " + company["industry_two"]}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} lg={6}>
                    <div className="d-flex mb-0">
                      <p className="text-muted mb-0">
                        {"Coordinate: " + company["Company_Location_Geo"]}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          ))
        ) : (
          <div className="spinner-border text-primary m-1" role="status"></div>
        )}

        <CompanyModal
          modal={modal}
          companyID={companyID}
          openModal={openModal}
        />
      </div>
    </>
  );
};

export default memo(JobVacancyList);
