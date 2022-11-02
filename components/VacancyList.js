import React, { useState } from "react";
import Link from "next/link";
import { Col, Input, Label, Row, Modal, ModalBody } from "reactstrap";

//Images Import
import jobImage1 from "../public/featured-job/img-01.png";
import jobImage2 from "../public/featured-job/img-02.png";
import jobImage3 from "../public/featured-job/img-03.png";
import jobImage4 from "../public/featured-job/img-04.png";
import jobImage5 from "../public/featured-job/img-05.png";
import jobImage6 from "../public/featured-job/img-06.png";
import jobImage7 from "../public/featured-job/img-07.png";

const JobVacancyList = ({ data }) => {
  //Apply Now Model
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);

  return (
    <>
      <div>
        {data.map((company, key) => (
          <div key={key} className={"job-box card mt-4"}>
            <div className="bookmark-label text-center">
              <Link href="#" className="align-middle text-white">
                <i className="mdi mdi-star"></i>
              </Link>
            </div>
            <div className="p-4">
              <Row className="align-items-center">
                <Col md={2}>
                  <div className="text-center mb-4 mb-md-0">
                    <Link href="/companydetails">
                      {"Company Name: " + company["Full name"]}
                    </Link>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="mb-2 mb-md-0">
                    <h5 className="fs-18 mb-0">
                      <Link href="/jobdetails" className="text-dark">
                        {"Country: " + company["Location"]}
                      </Link>
                    </h5>
                    <p className="text-muted fs-14 mb-0">
                      {"Locality: " + company["Locality"]}
                    </p>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="d-flex mb-2">
                    <div className="flex-shrink-0">
                      <i className="mdi mdi-map-marker text-primary me-1"></i>
                    </div>
                    <p className="text-muted mb-0">
                      {"City: " + company["Metro"]}
                    </p>
                  </div>
                </Col>

                <Col md={2}>
                  <div className="d-flex mb-0">
                    <div className="flex-shrink-0">
                      <i className="uil uil-clock-three text-primary me-1"></i>
                    </div>
                    <p className="text-muted mb-0">
                      {"Town: " + company["Region"]}
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
                      {"Industry: " +
                        company["Industry"] +
                        ", Industry 2: " +
                        company["Industry 2"]}
                    </p>
                  </div>
                </Col>
                <Col lg={2} md={3}>
                  <div>
                    <Link
                      href="#applyNow"
                      onClick={openModal}
                      className="primary-link"
                    >
                      Details <i className="mdi mdi-chevron-double-right"></i>
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        ))}
        <div
          className="modal fade"
          id="applyNow"
          tabIndex="-1"
          aria-labelledby="applyNow"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <Modal isOpen={modal} toggle={openModal} centered>
              <ModalBody className="modal-body p-5">
                <div className="text-center mb-4">
                  <h5 className="modal-title" id="staticBackdropLabel"></h5>
                </div>
                <div className="position-absolute end-0 top-0 p-3">
                  <button
                    type="button"
                    onClick={openModal}
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobVacancyList;
