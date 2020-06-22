import React, { Fragment } from "react";
import "./PageNotFoundComponent.styles.css";
const PageNotFoundComponent = () => {
  return (
    <div className="pagenotFound">
      <Fragment>
        <div>
          <p className="font-weight-bold text-uppercase text-center">
            OOPS Page not found
          </p>
          <h1>404</h1>
        </div>
      </Fragment>
    </div>
  );
};

export default PageNotFoundComponent;
