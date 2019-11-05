import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import logo from "../img/logo.svg";

const NavbarWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }

  .navbar__logo {
    width: 306px;
    height: 82px;
    padding: 0 12px 5px;
    align-items: flex-end;
    img {
      width: 100%;
      height: auto;
      max-width: none;
      max-height: none;
      object-fit: contain;
    }
  }
`;

const NavbarMenu = styled.div`
  flex: 1;
  justify-content: space-between;
  a {
    &:first-child {
      @media screen and (min-width: 1024px) {
        padding-left: 4rem;
      }
    }
    padding: 1rem 0;
    @media screen and (min-width: 1024px) {
      padding: 1rem 1rem 0;
    }
  }
`;

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: ""
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active"
            })
          : this.setState({
              navBarActiveClass: ""
            });
      }
    );
  };

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <NavbarWrapper>
          <div className="navbar-brand">
            <Link to="/" className="navbar-item navbar__logo" title="Logo">
              <img src={logo} alt="Format Extend" />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <NavbarMenu
            id="navMenu"
            className={`has-text-centered navbar-menu ${this.state.navBarActiveClass}`}
          >
            <Link className="navbar-item" to="/">
              Home
            </Link>
            <Link className="navbar-item" to="/projects">
              Projects
            </Link>
            <Link className="navbar-item" to="/contact">
              Contact
            </Link>
          </NavbarMenu>
        </NavbarWrapper>
      </nav>
    );
  }
};

export default Navbar;
