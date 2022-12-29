import React, { useState, memo, useEffect, useCallback } from "react";
import Link from "next/link";
import { Col, Row } from "reactstrap";
import { useSelector } from "react-redux";
import CompanyModal from "./CompanyModal";
import Geocode from "react-geocode";
import Map from "./Map";

const JobVacancyList = () => {
  const data = useSelector((state) => state.currentAuth.data);
  const [modal, setModal] = useState(false);
  const [companyID, setCompanyID] = useState(null);
  const [markers, setMarkers] = useState([]);
  // Set key
  Geocode.setApiKey("AIzaSyBbN-R50057ZpqFT3mh4MjRWfc60JupK1A");

  // Get geoArray
  const fetchData = (async (companies) => {
    const promises = companies.map(async (obj, key) => {
      if (obj["Company_Location_Geo"]) {
        const coordinate = obj["Company_Location_Geo"].split(",");
        const type = 'mark'

        const lat = Number(coordinate[0] ? coordinate[0].replace('"', "") : "");
        const lng = Number(coordinate[1] ? coordinate[1].replace('"', "") : "");

        return { id: key, position: { lat: lat, lng: lng }, type: 'mark' };

      } else if (obj["Company_Location_Name"]) {
        const city = obj["Company_Location_Name"]
          ? obj["Company_Location_Name"].replaceAll('"', "")
          : "";
        const type = 'circle';
        const position = await geoLatcode(city, key, type)

        return position;

      } else if (obj["location_country"]) {
        let city = obj["location_country"]
          ? obj["location_country"].replaceAll('"', "")
          : "";
        const type = 'circle';
        const position = await geoLatcode(city, key, type)

        return position;
      }
    });
    let tempMarkers = await Promise.all(promises);

    tempMarkers = tempMarkers.filter(function (element) {
      return element != undefined;
    });

    setMarkers(tempMarkers);
  });

  useEffect(() => {
    if (data) {
      fetchData(data)
        .catch(console.error);
    }
  }, [data])

  // Get geocode according to city name
  const geoLatcode = async (city, key, type) => {
    const response = await Geocode.fromAddress(city);
    const { lat, lng } = response.results[0].geometry.location;

    return { id: key, position: { lat: lat, lng: lng }, type: type };
  }

  // Modal
  const openModal = (e) => {
    setCompanyID(e.target.id);
    setModal(!modal);
  };

  return (
    <>
      <div>{markers.length > 0 ? <Map markers={markers} /> : null}</div>
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
                              href="#"
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
                              href="#"
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

        <div>
          {" "}
          <CompanyModal
            modal={modal}
            companyID={companyID}
            openModal={openModal}
          />
        </div>
      </div>
    </>
  );
};

export default memo(JobVacancyList);
