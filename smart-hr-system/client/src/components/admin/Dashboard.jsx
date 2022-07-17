import React, {useEffect,useState } from 'react';
import { Routes, Route } from 'react-router';

import { DashboardContent } from './DashboardContent'
import { Header } from '../common/Header'
import { Sidebar } from './Sidebar'
import { AllEmployees } from '../admin/Employees/AllEmployess';


export const AdminDashboard = () => {
   
    const [menu, setMenu] = useState(false)
    
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
    
        return (
            <div className={`main-wrapper ${menu ? 'slide-nav': ''}`}>      
                
                <Header onMenuClick={(value) => toggleMobileMenu()} />
                <Sidebar /> 

                <div className="page-wrapper">
                    <Routes>
                        <Route path="/" element={(< DashboardContent />)} />
                        <Route path="/allemployees" element={(< AllEmployees />)} />
                    </Routes>
                </div>
            </div>
        );
 }
 
 