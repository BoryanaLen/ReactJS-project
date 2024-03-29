import React, { useState,useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../common/Header';
import { SidebarEmployee } from './Sidebar';
import { AddLeave } from '../common/Leaves/AddLeave';
import * as leavesService  from "../../services/leavesService";
import { AuthContext } from '../../contexts/AuthContext';
import { EditLeave } from './EditLeave';
import uuid from 'react-uuid'
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../../assets/css/antdstyle.css";
import * as employeeService  from "../../services/employeeService";


export const Leaves = () => {

    const [ loading, setLoading] = useState(false);
    const [ menu, setMenu] = useState(false)
    const [ leaves, setLeaves] = useState([]);  
    const [ currentLeave, setCurrentLeave ] = useState(null); 
    const { user} = useContext(AuthContext);
    const { role } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true)
        leavesService
        .getAllLeavesForUser()
        .then((data) => {
            const list = data.map(leave => {
                return {...leave.data(), id: leave.id };
            })
            setLeaves(list);
            console.log(list)
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
            <Link className="btn btn-white btn-sm btn-rounded"to="/employee/leave/delete" >
            <i className={text==="New" ? "fa fa-dot-circle-o text-purple" : text === "Pending" ?
            "fa fa-dot-circle-o text-info" : text === "Approved" ? "fa fa-dot-circle-o text-success" 
            :"fa fa-dot-circle-o text-danger" } /> {text}
            </Link>
        </div>
        ),
    },
    {
        title: 'Action',
        render: (text, record) => (
            <div className="dropdown dropdown-action text-end" onClick={() => leaveSetHandler(record)}>
              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true" ><i className="material-icons" >more_vert</i></a>
                <div className="dropdown-menu dropdown-menu-right" >
                    <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_leave"><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_approve"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                </div>
            </div>
          ),
      },
    ]

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }

    const closeHandler = () => {
        setCurrentLeave( null );
        console.log('clear set leave')
    };

    function leaveSetHandler(leave){
       setCurrentLeave(leave);
       console.log(leave)
       console.log('set leave current')
    }

    function leaveCreateHandler (leaveData) {
        leaveData.userId = user.user.uid

        console.log(user.user);
        employeeService
            .getEmployeeByEmail(user.user.email)
            .then(e => {

                leaveData.fullName = e.firstName + " " + e.lastName

                leavesService
                    .addLeave(leaveData)
                    .then(doc => {
                        console.log(leaveData)
                        setLeaves(oldLeaves => [...oldLeaves, leaveData]);
                    })
                    .catch(err => {
                        console.log(err);
                    });
        })
    }

    function leaveUpdateHandler(updatedData){
        console.log(updatedData)
        leavesService
        .updateLeave(updatedData.id, updatedData)
        .then(data => {
            updateState(updatedData);
            closeHandler();
        })
        .catch(err => {
            console.log(err);
        });
    }

    
    const updateState = (newData) => {
        const newState = leaves.map(obj => {
          if (obj.id === currentLeave.id) {
            return {...obj, data: newData};
          }
          return obj;
        });
    
        setLeaves(newState);
      };


      return ( loading===false && role==="user" &&
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
                        <button className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_leave"><i className="fa fa-plus" /> Add Leave</button>
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
                    dataSource={leaves}
                    rowKey={doc => uuid()}
                    onChange={console.log("change")}
                    />
                </div>
            </div>
            </div>

             <AddLeave 
                onLeaveCreate={leaveCreateHandler}
            />

            <EditLeave
                leave={currentLeave}
                onCancelAction = {closeHandler}
                onLeaveEdit = {leaveUpdateHandler}
            />
            </div>
        </div>
    </div>
    );
  }
