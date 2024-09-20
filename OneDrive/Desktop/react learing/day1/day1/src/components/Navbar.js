import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <div className={`nav  ${props.mode} `} >
    <div id={`companylogo ${props.mode} `}><Link to="/" className={`${props.mode} `}>{props.logo}</Link></div>
  <ul className={`menu ${props.mode} `}>
    <li id="Gallery" ><Link to="/gallery" className={`${props.mode} `}>{props.Gallery}</Link></li>
    <li className="Contact"><Link to="/contact" className={`${props.mode} `}>{props.Contact}</Link></li>
    <li className="About"><Link to="/about" className={`${props.mode} `}>{props.About}</Link></li>
    <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch"  onClick={props.changcolor} id="flexSwitchCheckDefault" />
  <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
</div>
  <div className="skyblue" onClick={props.changebluecolor}></div>
  </ul>
</div>
  )
}

Navbar.propTypes={
    Gallery:PropTypes.string,
}

