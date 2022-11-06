import React, { useState, useEffect } from "react";
import { Col, Input, Label, Row, Modal, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

const CompanyModal = ({ modal, openModal }) => {
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
          <Modal isOpen={modal} toggle={openModal} centered>
            <ModalBody className="modal-body p-5">
              <div className="text-center mb-4">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Apply For This Job
                </h5>
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
              <div className="mb-3">
                <Label for="nameControlInput" className="form-label">
                  Name
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="nameControlInput"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <Label for="emailControlInput2" className="form-label">
                  Email Address
                </Label>
                <Input
                  type="email"
                  className="form-control"
                  id="emailControlInput2"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <Label for="messageControlTextarea" className="form-label">
                  Message
                </Label>
                <textarea
                  className="form-control"
                  id="messageControlTextarea"
                  rows="4"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <div className="mb-4">
                <Label className="form-label" for="inputGroupFile01">
                  Resume Upload
                </Label>
                <Input
                  type="file"
                  className="form-control"
                  id="inputGroupFile01"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send Application
              </button>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CompanyModal;
