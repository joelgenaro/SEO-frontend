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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1628067715234!5m2!1sen!2sin"
                    title="title"
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
