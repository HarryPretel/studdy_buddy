import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import { requirePropFactory } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { makeStyles, withStyles } from '@material-ui/core/styles';

function Navi(props) {

  const logged_out_nav = (
    // <ul>
    //   <li onClick={() => props.display_form('login')}>login</li>
    //   <li onClick={() => props.display_form('signup')}>signup</li>
    // </ul>
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href = "#home">StudyBuddy</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link onClick={() => props.display_form('login')}>Login</Nav.Link>
          <Nav.Link onClick={() => props.display_form('signup')}>Signup</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
 
  const logged_in_nav = (

    
  <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
  <Navbar.Brand onClick={() => props.display_form('')}>StudyBuddy</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    <FormControl type="text" placeholder="SearchCourse" className="mr-sm-2" value = {props.search} onChange = {props.handle_search_value}/>
      <Button variant="outline-light" onClick={props.handle_search}>Search</Button>
      <Nav.Link onClick={() => props.display_form('messaging')}>Messages</Nav.Link>
     
      <Nav.Link href="#pricing">Calendar</Nav.Link>

    
      {/* <Nav.Link onClick = {() => props.display_form('course')}>Course</Nav.Link> */}
      
    </Nav>
    <Nav>
      <Nav.Link onClick = {props.handle_logout}>Logout</Nav.Link>
     
      <Navbar.Brand onClick= {() =>props.display_form('profile')}>
      <PermIdentityIcon style={{ fontSize: 25}} >profile</PermIdentityIcon>
      </Navbar.Brand>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  

  );

  
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Navi;

Navi.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired,
  //handle_course: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  handle_search_value: PropTypes.func.isRequired,
  handle_search: PropTypes.func.isRequired
};