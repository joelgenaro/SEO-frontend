import React, { useState, useEffect } from "react";
import {
  Col,
  Input,
  Label,
  Row,
  Modal,
  ModalBody,
  Card,
  CardBody,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

const CompanyModal = ({ modal, openModal, companyID }) => {
  const data = useSelector((state) => state.currentAuth.data);
  const companyDetails = data
    ? data.filter((item) => item.id == companyID)[0]
    : null;

  let companySrc = "";

  if (companyDetails?.["Company Location Street Address"] != null) {
    companySrc =
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBbN-R50057ZpqFT3mh4MjRWfc60JupK1A&q=" +
      companyDetails?.["Company Location Street Address"];
  } else if (companyDetails?.["Company Location Region"] != null) {
    companySrc =
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBbN-R50057ZpqFT3mh4MjRWfc60JupK1A&q=" +
      companyDetails?.["Company Location Region"];
  } else {
    companySrc =
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d37494223.23909492!2d103!3d55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sru!4v1668142028924!5m2!1sen!2sru";
  }

  return (
    <>
      <div
        className="modal fade"
        id="applyNow"
        tabIndex="-1"
        aria-labelledby="applyNow"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <Modal
            className="modal-xl"
            isOpen={modal}
            toggle={openModal}
            centered
          >
            <ModalBody className="modal-body p-5">
              <CardBody className="candidate-profile-overview border-top p-4">
                {" "}
                <CardBody className="p-4 ">
                  <h6 className="fs-17 fw-semibold mb-4">Company Location</h6>
                  <iframe
                    src={companySrc}
                    width="100%"
                    height="200"
                    referrerpolicy="no-referrer-when-downgrade"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </CardBody>
                <ul className="list-unstyled mb-0 companyDetailsUL">
                  {companyDetails ? (
                    Object.entries(companyDetails).map(([key, value]) => (
                      <li key={key}>
                        <div className="d-flex">
                          <label className="text-dark">{key}</label>
                          <div>
                            <p className="text-muted mb-0">{value}</p>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div
                      className="spinner-border text-primary m-1"
                      role="status"
                    ></div>
                  )}
                </ul>
              </CardBody>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CompanyModal;
