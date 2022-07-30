import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
 
export const Sidebar = (props) => {

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
                <a href="#" className={isSideMenu == "apps" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="apps" ? "": "apps")} ><i className="la la-cube" /> <span> Apps</span> <span className="menu-arrow" /></a>
                { isSideMenu == "apps" ? 
                <ul>
                    <li><Link onClick={()=>localStorage.setItem("minheight","true")} to="/conversation/chat">Chat</Link></li>
                    
                    <li><Link className={pathname.includes('apps/calendar') ?"active" :""} to="/app/apps/calendar">Calendar</Link></li>
                    
                    <li><Link to = "/email/inbox">Email</Link></li>
                </ul>
                    :"" 
                }
                </li>            
                <li className="submenu" >             
                <a href="#" className= {isSideMenu == "employee" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="employee" ? "": "employee")}><i className="la la-user" /> <span> Employees</span> <span className="menu-arrow" /></a>
                { isSideMenu == "employee" ? 
                
                <ul >
                    <li><Link className={pathname.includes('allemployees') ?"active" :pathname.includes('employees-list') ?"active" :""} 
                        to="/admin/allemployees">All Employees</Link></li>
                    <li><Link className={pathname.includes('holidays') ?"active" :""} to="/app/employee/holidays">Holidays</Link></li>
                    <li><Link className={pathname.includes('es-admin') ?"active" :""} to="/app/employee/leaves-admin">Leaves <span className="badge badge-pill bg-primary float-end">1</span></Link></li>
                    <li><Link className={pathname.includes('e-settings') ?"active" :""} to="/app/employee/leave-settings">Leave Settings</Link></li>
                    <li><Link className={pathname.includes('nce-admin') ?"active" :""} to="/app/employee/attendance-admin">Attendance</Link></li>            
                    <li><Link className={pathname.includes('timesheet') ?"active" :""} to="/app/employee/timesheet">Timesheet</Link></li>
                    <li><Link className={pathname.includes('shift-scheduling') || pathname.includes('shift-list') ?"active" :""} 
                        to="/app/employee/shift-scheduling">Shift &amp; Schedule</Link></li>
                    <li><Link className={pathname.includes('overtime') ?"active" :""} to="/app/employee/overtime">Overtime</Link></li>
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
