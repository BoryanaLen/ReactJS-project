import React,  {useState} from 'react'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {headerlogo,lnEnglish,lnFrench,lnSpanish,lnGerman,Avatar_21} from '../../assets/imagepath'

  export const Header = (props) => {

    const handlesidebar=()=>{
      document.body.classList.toggle('mini-sidebar');
    }
    const onMenuClik = () => {
      props.onMenuClick()
    }

    let pathname = window.location.pathname

      return (
         <div className="header" style={{right:"0px"}}>
        {/* Logo */}
        <div className="header-left">
          <Link to="/app/main/dashboard" className="logo">
            <img src={headerlogo} width={40} height={40} alt="" />
          </Link>
        </div>
        {/* /Logo */}
        <a id="toggle_btn" href="#"  style={{display: pathname.includes('tasks') ?"none" :pathname.includes('compose') ? "none" :""}}onClick={handlesidebar}>
          <span className="bar-icon"><span />
            <span />
            <span />
          </span>
        </a>
        {/* Header Title */}
        <div className="page-title-box">
          <h3>Dreamguy's Technologies</h3>
        </div>
        {/* /Header Title */}
        <a id="mobile_btn" className="mobile_btn" href="#" onClick={() => onMenuClik()}><i className="fa fa-bars" /></a>
        {/* Header Menu */}
        <ul className="nav user-menu">
          {/* Search */}
          <li className="nav-item">
            <div className="top-nav-search">
              <a href="" className="responsive-search">
                <i className="fa fa-search" />
              </a>
              <form>
                <input className="form-control" type="text" placeholder="Search here" />
                <button className="btn" type="submit"><i className="fa fa-search" /></button>
              </form>
            </div>
          </li>
          {/* /Search */}
          {/* Flag */}
          <li className="nav-item dropdown has-arrow flag-nav">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">
              <img src={lnEnglish} alt="" height={20} /> <span>English</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
            <a href="" className="dropdown-item">
                    <img src={lnEnglish} alt="" height={16} /> English
                  </a>
                  <a href="" className="dropdown-item">
                    <img src={lnFrench} alt="" height={16} /> French
                  </a>
                  <a href="" className="dropdown-item">
                    <img src={lnSpanish} alt="" height={16} /> Spanish
                  </a>
                  <a href="" className="dropdown-item">
                    <img src={lnGerman} alt="" height={16} /> German
                  </a>
            </div>
          </li>

          <li className="nav-item dropdown has-arrow main-drop">
            <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
              <span className="user-img me-1"><img src={Avatar_21} alt="" />
                <span className="status online" /></span>
              <span>Admin</span>
            </a>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/app/profile/employee-profile">My Profile</Link>
              <Link className="dropdown-item" to="/settings/companysetting">Settings</Link>
              <Link className="dropdown-item" to="/login">Logout</Link>
            </div>
          </li>
        </ul>
        {/* /Header Menu */}
        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to="/app/profile/employee-profile">My Profile</Link>
            <Link className="dropdown-item" to="/settings/companysetting">Settings</Link>
            <Link className="dropdown-item" to="/login">Logout</Link>
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>
       
      );
   }