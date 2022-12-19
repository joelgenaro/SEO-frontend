import React, { useEffect, memo } from "react";
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
    dispatch({ type: "UPDATE_PAGE", payload: pageNumber });
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
          />
        </Col>
      </Row>
    </>
  );
};

export default memo(PaginationWithProgrees);
