import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../common/Header';
import { SidebarEmployee } from '../Sidebar';
import { AddLeave } from './AddLeave';
import * as leavesService  from "../../../services/leavesService";
import {useAuthValue} from '../../../contexts/AuthContext';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../../../assets/css/antdstyle.css";
// import {itemRender,onShowSizeChange} from "../../paginationfunction"
// import  Delete from "../../../_components/modelbox/Delete"

export const Leaves = () => {

    const {currentUser} = useAuthValue();
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState(false)
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        setLoading(true)
        leavesService
            .getAllLeavesForUser()
            .then((data) => {
                console.log(data);
                const list = data.map(leave => {
                    return { data: leave.data() };
                })
                setLeaves(list);
            })
            .finally(() => setLoading(false))
    }, [])
      
    const columns = [
    {
        title: 'Leave Type',
        dataIndex: 'leaveType',
        sorter: (a, b) => a.leavetype.length - b.leavetype.length,
    },

    {
        title: 'From',
        dataIndex: 'from',
        sorter: (a, b) => a.from.length - b.from.length,
    },
    {
        title: 'To',
        dataIndex: 'to',
        sorter: (a, b) => a.to.length - b.to.length,
    },

    {
        title: 'No Of Days',
        dataIndex: 'numberOfDays', 
        sorter: (a, b) => a.noofdays.length - b.noofdays.length,
    },
    
    {
        title: 'Reason',
        dataIndex: 'leaveReason',
        sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (text, record) => (
        <div className="action-label text-center">
            <a className="btn btn-white btn-sm btn-rounded" href="">
            <i className={text==="New" ? "fa fa-dot-circle-o text-purple" : text === "Pending" ?
            "fa fa-dot-circle-o text-info" : text === "Approved" ? "fa fa-dot-circle-o text-success" 
            :"fa fa-dot-circle-o text-danger" } /> {text}
            </a>
        </div>
        ),
    }
    ]

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }

    function leaveCreateHandler (leaveData) {
        leavesService
        .addLeave(leaveData)
        .then(doc => {
            setLeaves(oldLeaves => [...oldLeaves, {id: doc.id, data: leaveData}]);
        })
        .catch(err => {
            console.log(err);
        });
    }

      return (   
        <div className={`main-wrapper ${menu ? 'slide-nav': ''}`}> 
          
            <Header onMenuClick={(value) => toggleMobileMenu()} />
            <SidebarEmployee /> 
            
            <div className="page-wrapper">
            <div className="content container-fluid">
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                        <h3 className="page-title">Leaves</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item active">Leaves</li>
                        </ul>
                        </div>
                        <div className="col-auto float-end ml-auto">
                        <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_leave"><i className="fa fa-plus" /> Add Leave</a>
                        </div>
                    </div>
                    <AddLeave 
                    onLeaveCreate={leaveCreateHandler}
                />
                </div>

            <div className="row">
            <div className="col-md-3">
                <div className="stats-info">
                <h6>Annual Leave</h6>
                <h4>12</h4>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stats-info">
                <h6>Medical Leave</h6>
                <h4>3</h4>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stats-info">
                <h6>Other Leave</h6>
                <h4>4</h4>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stats-info">
                <h6>Remaining Leave</h6>
                <h4>5</h4>
                </div>
            </div>
            </div>
            {/* /Leave Statistics */}
            <div className="row">
            <div className="col-md-12">
                <div className="table-responsive">
                
                <Table className="table-striped"
                    //   pagination= { {total : data.length,
                    //     showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    //     showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                    style = {{overflowX : 'auto'}}
                    columns={columns}                 
                    // bordered
                    dataSource={leaves.map((l, i) => l.data)}
                    rowKey={record => record.id}
                    onChange={console.log("change")}
                    />
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    );
  }
