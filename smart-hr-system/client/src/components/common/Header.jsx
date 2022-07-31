import { Link } from 'react-router-dom';
import {headerlogo, Avatar_21} from '../../assets/imagepath'

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
          <h3>Dreamguy's Technologies</h3>
        </div>

        <div id="mobile_btn" className="mobile_btn" onClick={() => onMenuClik()}><i className="fa fa-bars" /></div>
        <ul className="nav user-menu">

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