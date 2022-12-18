import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Col, Container, Row } from "reactstrap";

const Section = () => {
  const [isMenu, setIsMenu] = useState(false);

  useEffect(() => {
    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function (e) {
      if (e.target.className != "dropDownIcon") {
        setIsMenu(false);
      }
    };
  }, []);

  const dropDown = () => {
    setIsMenu(true);
  };

  return (
    <>
      <section className="pageHeader">
        <Container>
          <Col lg={12}>
            <div className="me-lg-5 headerDiv">
              <div className="pCompanyLogo">
                <img className="companyLogo" src="./vercel.svg" />
              </div>
              <div className="dropdownMenu">
                <button onClick={dropDown} name="dropbtn" className="dropbtn">
                  <span className="dropDownIcon">&#9776;</span>
                </button>
                {isMenu ? (
                  <div id="myDropdown" className="dropdown-content show">
                    <a href="#">ABOUT US</a>
                    <a href="#">CONTACT</a>
                    <a href="#">PRIVACY POLICY</a>
                    <a href="#">SITE MAP</a>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Col>
        </Container>
      </section>
    </>
  );
};

export default Section;
