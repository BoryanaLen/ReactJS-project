import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
 
export const SidebarEmployee = (props) => {

    const [isSideMenu, setSideMenu] = useState("")

    const toggleSidebar = (value) => {
        setSideMenu(value);   
    }
    const location = useLocation();
    const pathname = location.pathname

    return (
        <div className="sidebar" id="sidebar">
            <Scrollbars      
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax="95vh"
                    thumbMinSize={30}
                    universal={false}
                    hideTracksWhenNotNeeded={true}
                    >
        <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
            <ul>
                <li className="menu-title"> 
                    <span>Main</span>
                </li>

                <li className="submenu">
                <a href="#" className={isSideMenu === "dashboard" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu ==="dashboard" ? "": "dashboard")}><i className="la la-dashboard" /> <span> Dashboard</span> <span className="menu-arrow" /></a>
                { isSideMenu === "dashboard" ? 
                    <ul >
                        <li><Link className={pathname.includes('main/dashboard') ?"active" :""} to="/employee/dashboard">Dashboard</Link></li>
                    </ul>
                	:"" 
                }
              </li>
                
                <li className="submenu">
                <a href="#" className={isSideMenu == "apps" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="apps" ? "": "apps")} ><i className="la la-cube" /> <span> Apps</span> <span className="menu-arrow" /></a>
                { isSideMenu === "apps" ? 
                <ul>
                    <li><Link className={pathname.includes('apps/calendar') ?"active" :""} to="/admin/calendar">Calendar</Link></li>
                </ul>
                    :"" 
                }
                </li>  

                <li className="submenu" >             
                <a href="#" className= "subdrop" onClick={()=> toggleSidebar(isSideMenu =="employee" ? "": "employee")}><i className="la la-user" /> <span> Employee</span> <span className="menu-arrow" /></a>
                { isSideMenu === "employee" ? 
                
                <ul >
                     <li><Link className={pathname.includes('ves-employee') ?"active" :""} to="/employee/leaves">Leaves</Link></li>
                </ul>
                    :"" 
                }
                </li>
            </ul>
            </div>
        </div>
            </Scrollbars>
        </div>   
        );
}
