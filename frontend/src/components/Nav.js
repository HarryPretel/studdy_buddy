import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const logged_out_nav = (
    // <ul>
    //   <li onClick={() => props.display_form('login')}>login</li>
    //   <li onClick={() => props.display_form('signup')}>signup</li>
    // </ul>
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div
        className="collapse navbar-collapse"
        id="bs-example-navbar-collapse-1"
      >
        <ul className="nav navbar-nav navbar-right">
          <li onClick={() => props.display_form('login')}>
            <a href="#features" className="page-scroll">
              Login
            </a>
          </li>
          <li onClick={() => props.display_form('signup')}>
            <a href="#features" className="page-scroll">
              Sign up
            </a>
          </li>
        </ul>
      </div>
    </div>
    </nav>
  );

  const logged_in_nav = (
    <ul>
      <li onClick={() => props.display_form('profile')}>profile</li>
      <r><li onClick={props.handle_logout}>logout</li></r>
    </ul>

  );

  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};