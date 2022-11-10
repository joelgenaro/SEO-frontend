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
  console.log("modal render");

  const data = useSelector((state) => state.currentAuth.data);
  const companyDetails = data
    ? data.filter((item) => item.id == companyID)[0]
    : null;

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
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBbN-R50057ZpqFT3mh4MjRWfc60JupK1A&q=Eiffel+Tower,Paris+France"
                    title="title"
                    referrerpolicy="no-referrer-when-downgrade"
                    style={{ width: `100%`, height: `250` }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </CardBody>
                <ul className="list-unstyled mb-0 companyDetailsUL">
                  {companyDetails
                    ? Object.entries(companyDetails).map(([key, value]) => (
                        <li key={key}>
                          <div className="d-flex">
                            <label className="text-dark">{key}</label>
                            <div>
                              <p className="text-muted mb-0">{value}</p>
                            </div>
                          </div>
                        </li>
                      ))
                    : "Loading"}
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
