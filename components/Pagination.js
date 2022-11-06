import React, { useEffect } from "react";
import Link from "next/link";
import { Col, Row } from "reactstrap";
import Pagination from "react-js-pagination";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const PaginationWithProgrees = () => {
  //Use for all the dispatch actions
  const dispatch = useDispatch();

  const apiRoute = useSelector((state) => state.currentAuth.apiRoute);
  const data = useSelector((state) => state.currentAuth.links);

  const fetchData = async (pageNumber) => {
    dispatch({ type: "UPDATE_LOADING", payload: true });

    if (apiRoute == "index") {
      const api = await fetch(
        `http://localhost:8000/api/index?page=${pageNumber}`
      );
      const res = await api.json();

      dispatch({ type: "UPDATE_DATA", payload: res.data.data });
      dispatch({ type: "UPDATE_LINKS", payload: res.data });

      dispatch({ type: "UPDATE_LOADING", payload: false });
    } else {
      axios.defaults.withCredentials = true;

      axios
        .post(`http://localhost:8000/api/getData?page=${pageNumber}`)
        .then((res) => {
          dispatch({ type: "UPDATE_DATA", payload: res.data.data });
          dispatch({ type: "UPDATE_LINKS", payload: res.data });

          dispatch({ type: "UPDATE_LOADING", payload: false });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Row>
        <Col lg={12} className="mt-4 pt-2">
          <Pagination
            activePage={data?.current_page ? data?.current_page : 0}
            itemsCountPerPage={data?.per_page ? data?.per_page : 0}
            totalItemsCount={data?.total ? data?.total : 0}
            onChange={(pageNumber) => {
              fetchData(pageNumber);
            }}
            pageRangeDisplayed={5}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="|<"
            lastPageText=">|"
          />
        </Col>
      </Row>
    </>
  );
};

export default PaginationWithProgrees;
