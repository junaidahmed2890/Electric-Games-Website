import React from "react";

const Footer = () => {
  return (
    <div className="row  bg-dark stick-bottom mt-5 p-5 " style={{}} id="down">
      <div className="col-lg-5 col-md-12   col-sm-12 offset-lg-1  offset-lg-1 mb-3 ">
        <div className="row text-white ">
          <div className="col">
            <h3 className="ml-3 d-flex justify-content-center align-items-center">
              Products
            </h3>
          </div>
        </div>
        <div className="row text-white "></div>
      </div>
      <div className="col-lg-5 col-md-12 col-sm-12 text-center">
        <div className="row text-white d-flex justify-content-center align-items-center">
          More Links
        </div>
        <div className="row text-white mt-2 d-flex justify-content-center align-items-center">
          Blogs
        </div>
      </div>
    </div>
  );
};

export default Footer;
