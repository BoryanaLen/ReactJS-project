import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {headerlogo} from '../../assets/imagepath'
import { useContext } from "react";
import {AuthContext } from '../../contexts/AuthContext';
import {signOut} from 'firebase/auth'
import * as requester from '../../services/requester'


  export const Header = (props) => {
    
    const[userName, setUserName] = useState("");
    const { userLogout } = useContext(AuthContext);

    useEffect(() => {

        async function getData() {
            requester.getUser()
            .then(user => {
                setUserName(user.email)
            })
        }
      
        getData();
       
    },[])

    function onLogoutClick(){
        signOut()
        .then(authData => {
            userLogout();
        })
        .catch(err => console.log(err))
    }

    const handlesidebar=()=>{
      document.body.classList.toggle('mini-sidebar');
    }
    const onMenuClik = () => {
      props.onMenuClick()
    }

    let pathname = window.location.pathname

      return (
         <div className="header" style={{right:"0px"}}>

            <div className="header-left">
            <Link to="/app/main/dashboard" className="logo">
                <img src={headerlogo} width={40} height={40} alt="" />
            </Link>
            </div>

            <div id="toggle_btn" style={{display: pathname.includes('tasks') ?"none" :pathname.includes('compose') ? "none" :""}}onClick={handlesidebar}>
            <span className="bar-icon"><span />
                <span />
                <span />
            </span>
            </div>

            <div className="page-title-box">
            <h3>Smart Hr System</h3>
            </div>

            <div id="mobile_btn" className="mobile_btn" onClick={() => onMenuClik()}><i className="fa fa-bars" /></div>
            <ul className="nav user-menu">

            <li className="nav-item dropdown has-arrow main-drop">
                <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                <span>{userName}</span>
                </a>
                <div className="dropdown-menu">
                {/* <Link className="dropdown-item" to="/profile">My Profile</Link>
                <Link className="dropdown-item" to="/settings/companysetting">Settings</Link> */}
                <Link className="dropdown-item" to="/" onClick={onLogoutClick}>Logout</Link>
                </div>
            </li>

            </ul>
            <div className="dropdown mobile-user-menu">
            <div className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></div>
            <div className="dropdown-menu dropdown-menu-right">
                <Link className="dropdown-item" to="/app/profile/employee-profile">My Profile</Link>
                <Link className="dropdown-item" to="/settings/companysetting">Settings</Link>
                <Link className="dropdown-item" to="/login">Logout</Link>
            </div>
            </div>
        </div>       
      );
   }