import '../../index.css'
import '../../assets/css/style.css'

import 'bootstrap'
import 'fontawesome'

import 'bootstrap/dist/js/bootstrap.bundle';

import '../../assets/css/font-awesome.min.css';
import '../../assets/css/line-awesome.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../../assets/css/bootstrap.min.css";
import '../../assets/js/app.js';

import "../../assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";
import "../../assets/css/bootstrap-datetimepicker.min.css";
import '../../assets/css/style.css';

import React, {useEffect,useState } from 'react';
import { Routes, Route } from 'react-router';

import { DashboardContent } from './DashboardContent'
import { Header } from '../common/Header'
import { Sidebar } from './Sidebar'


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
                    </Routes>
                </div>
            </div>
        );
 }
 
 