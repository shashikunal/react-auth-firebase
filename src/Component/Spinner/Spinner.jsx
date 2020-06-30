import React, { Fragment } from "react";
import "./spinner.styles.css";
const Spinner = () => {
  return (
    <div>
      <Fragment>
        <div className="container">
          <div className="loader">
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--text"></div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default Spinner;
