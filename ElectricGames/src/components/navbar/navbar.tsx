import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "./navbarstyle";
import TokenService from "../../services/token.service";

import "../../App.css";
function handleScroll() {
  window.scroll({
    top: document.body.offsetHeight,
    left: 0,
    behavior: "smooth",
  });
}

const NavbarEx = (props: any) => {
  useEffect(() => {
    let user = TokenService.getUser();
    if (user?.accessToken?.length > 0) {
      props.setIsLogged(true);
      props.setUserName(user?.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="sticky-top"
    >
      <Container>
        <NavLink to="/">
          <img src={require("../../assets/images/logo.svg")} alt="logo" />
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/products">Games</NavLink>
            <NavLink to="/gamecharacters">Characters</NavLink>
            <div
              onClick={handleScroll}
              className="link"
              style={{ cursor: "pointer" }}
            >
              Contact
            </div>
            <NavLink to="/faq">FAQ</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarEx;
