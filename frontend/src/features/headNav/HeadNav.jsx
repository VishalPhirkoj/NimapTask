import React from "react";
import { Link } from "react-router-dom";

const HeadNav = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            I N D I A N 🇮🇳
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link "
                  aria-current="page"
                  to="/addCategory"
                >
                  Add Category
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addProduct">
                  ADD Products
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeadNav;
