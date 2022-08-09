import React, {useEffect,useState, useContext } from 'react';

import { DashboardContent } from './DashboardContent'
import { Header } from '../common/Header'
import { SidebarAdmin } from './SidebarAdmin'
import { AuthContext } from '../../contexts/AuthContext';


export const AdminDashboard = () => {
   
    const [menu, setMenu] = useState(false)
    const { role } = useContext(AuthContext);
    
    const toggleMobileMenu = () => {
        setMenu(!menu)
    }

    useEffect( ()=>{
        let firstload = localStorage.getItem("firstload")
        if(firstload === "true"){
            setTimeout(function() {
            window.location.reload(1)
            localStorage.removeItem("firstload")
            },1000)
        }
    });

    return (role==="admin" && 
        <div className={`main-wrapper ${menu ? 'slide-nav': ''}`}>                     
            <Header onMenuClick={(value) => toggleMobileMenu()} />
            <SidebarAdmin /> 
            <div className="page-wrapper">
                <DashboardContent/>
            </div>              
        </div>
    );
 }
 
 