import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid'
import * as leavesService  from "../../services/leavesService";
import 'antd/dist/antd.css';
import "../../assets/css/antdstyle.css";
import { Table } from 'antd';
import { Header } from '../common/Header'
import { SidebarAdmin }from '../admin/SidebarAdmin'
import { AddLeave }from '../common/Leaves/AddLeave'


export const LeaveAdmin = () => {

    const [menu, setMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [currentLeave, setCurrentLeave] = useState({});

	const toggleMobileMenu = () => {
		setMenu(!menu)
	}
  
    useEffect(() => {
        setLoading(true)
        leavesService
            .getAllLeaves()
            .then((data) => {
                const list = data.map(l => {
                    return { ...l.data(), id: l.id };
                })
                setData(list)
                console.log(list);
            })
            .finally(() => setLoading(false))
    }, [])

    function leaveCreateHandler (leaveData) {
        leavesService
        .addLeave(leaveData)
        .then(doc => {
            setData(oldLeaves => [...oldLeaves, {id: doc.id, data: leaveData}]);
        })
        .catch(err => {
            console.log(err);
        });
    }

    function onSetCurrentEventClick(record){
        console.log(record);
        setCurrentLeave(record);
        console.log('set current leave');
    }

    function onUpdateEventClick(status){
        const newData = {...currentLeave};
        newData.status = status;
        console.log(newData);
        leavesService
        .updateLeave(newData.id, newData)
        .then(l => {
            updateState(newData);
            closeHandler();
        })
    }

    const updateState = (newData) => {
        const newState = data.map(obj => {
            if (obj.id === newData.id) {
                return newData;
            }
            return obj;
        });
    
        setData(newState);
      };

    const closeHandler = () => {
        setCurrentLeave( null );
        console.log('clear set leave')
    };


    const columns = [
    {
        title: 'Employee',
        dataIndex: 'name',
        render: (text, record) => (            
            <h2 className="table-avatar">
            <Link to="/app/profile/employee-profile" className="avatar"><img alt="" src={record.image} /></Link>
            <Link to="/app/profile/employee-profile">{text} <span>{record.role}</span></Link>
            </h2>
        ), 
        sorter: (a, b) => a.name.length - b.name.length,
    },
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
        <div className="dropdown action-label text-center">
        <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => onSetCurrentEventClick(record)}>
            <i className={text==="New" ? "fa fa-dot-circle-o text-purple" : text === "Pending" ?
            "fa fa-dot-circle-o text-info" : text === "Approved" ? "fa fa-dot-circle-o text-success" :"fa fa-dot-circle-o text-danger" } 
            /> {text}
        </a>
        <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="#" onClick={() => onUpdateEventClick("Pending")}><i className="fa fa-dot-circle-o text-info" /> Pending</a>
            <a className="dropdown-item" href="#" onClick={() => onUpdateEventClick("Approved")}><i className="fa fa-dot-circle-o text-success" /> Approved</a>
            <a className="dropdown-item" href="#" onClick={() => onUpdateEventClick("Declined")}><i className="fa fa-dot-circle-o text-danger" /> Declined</a>
        </div>
        </div>
        ),
        sorter: (a, b) => a.status.length - b.status.length,
    },
    ]

      return ( !loading &&       
        <div className={`main-wrapper ${menu ? 'slide-nav': ''}`}> 
                
                <Header onMenuClick={(value) => toggleMobileMenu()} />
                <SidebarAdmin />   

            <div className="page-wrapper">
            {/* Page Content */}
            <div className="content container-fluid">
                {/* Page Header */}
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
                </div>
                {/* /Page Header */}
                {/* Leave Statistics */}
                <div className="row">
                <div className="col-md-3">
                    <div className="stats-info">
                    <h6>Today Presents</h6>
                    <h4>12 / 60</h4>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stats-info">
                    <h6>Planned Leaves</h6>
                    <h4>8 <span>Today</span></h4>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stats-info">
                    <h6>Unplanned Leaves</h6>
                    <h4>0 <span>Today</span></h4>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stats-info">
                    <h6>Pending Requests</h6>
                    <h4>12</h4>
                    </div>
                </div>
                </div>
                {/* /Leave Statistics */}

                <div className="row">
                <div className="col-md-12">
                    <div className="table-responsive">
                    
                    <Table className="table-striped"
                        style = {{overflowX : 'auto'}}
                        columns={columns}                 
                        dataSource={data}
                        rowKey={doc => uuid()}
                        onChange={console.log("chnage")}
                        />
                    </div>
                </div>
                </div>
            </div>
            {/* /Page Content */}

            {/* Add Leave Modal */}
            <AddLeave onLeaveCreate={leaveCreateHandler} />
            {/* /Add Leave Modal */}
            </div>
        </div>
        );
  }
