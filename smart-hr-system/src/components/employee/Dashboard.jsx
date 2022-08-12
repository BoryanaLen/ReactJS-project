import {useState, useEffect, useContext } from 'react';
import {Avatar_02} from '../../assets/imagepath';
import { Link } from 'react-router-dom';
import { Header } from '../common/Header';
import { SidebarEmployee } from './Sidebar';
import * as requester from '../../services/requester'
import * as eventsService from '../../services/eventsService'
import * as leavesService from '../../services/leavesService'
import * as employeeService from '../../services/employeeService'
import { AuthContext } from '../../contexts/AuthContext';
import { DeleteLeave } from '../common/Leaves/DeleteLeave';

export const EmployeeDashboard = () => {

    const [menu, setMenu] = useState(false)
    const [user, setUser] = useState("");
    const [employee, setEmployee] = useState("");
    const [events, setEvents] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState([]);
    const { role } = useContext(AuthContext);

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    useEffect(() => {
        async function getData() {
            requester.getUser()
            .then(user => {
                setUser(user)
                console.log(user)
            })
        }     
        getData();

        employeeService
        .getCurrentEmployee()
        .then((data) => {
            setEmployee(data);
            console.log(data)
        })

        setLoading(true)
        eventsService
        .getAllEventsForUser()
        .then((data) => {
            const list = data.map(event => {
                return { id: event.id, data: event.data() };
            })
            setEvents(list);
            console.log(list)
        })

        leavesService
        .getAllLeavesForUser()
        .then((data) => {
            const list = data.map(leave => {
                return { id: leave.id, data: leave.data() };
            })
            setLeaves(list);
            console.log(list)
        })
        .finally(() => setLoading(false))
       
    },[])

    function onLeaveEditHandler(){

    }

	const toggleMobileMenu = () => {
		setMenu(!menu)
	}

    return ( role==="user" && !loading &&
    <div className={`main-wrapper ${menu ? 'slide-nav': ''}`}> 
      
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <SidebarEmployee /> 

        <div className="page-wrapper"> 
            <div className="content container-fluid">
            
            <div className="row">
                <div className="col-md-12">
                  <div className="welcome-box">
                    <div className="welcome-img">
                      <img alt="" src={employee.photoUrl} />
                    </div>
                    <div className="welcome-det">
                      <h3>Welcome, {user.email}</h3>
                      <p>{date}</p>
                    </div>
                  </div>
                </div>
              </div>
                <div className="row">
                    <div className="col-md-6 d-flex">
                        <div className="card card-table flex-fill">
                        <div className="card-header">
                            <h3 className="card-title mb-0">Events</h3>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                            <table className="table table-nowrap custom-table mb-0">
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>

                                    { events && events.map((event, index) => (
                                            <tr key={index}>
                                                <td>{event.data.title}</td>
                                                <td>{event.data.start}</td>
                                                <td>{event.data.className}</td>
                                            </tr>
                                    ))}

                                </tbody>
                            </table>
                            </div>
                        </div>
                        <div className="card-footer">
                            <Link to = "/employee/calendar">View all events</Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex">
                        <div className="card card-table flex-fill">
                        <div className="card-header">
                            <h3 className="card-title mb-0">Leaves</h3>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">	
                            <table className="table custom-table table-nowrap mb-0">
                                <thead>
                                    <tr>
                                        <th>Leave Type</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>No Of Days</th>
                                        <th>Reason</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { leaves && leaves.map((leave, index) => (
                                    <tr key={index}>
                                        <td>{leave.data.leaveType}</td>
                                        <td>{leave.data.from}</td>
                                        <td>{leave.data.to}</td>
                                        <td>{leave.data.leaveType}</td>
                                        <td>{leave.data.leaveType}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                        <div className="card-footer">
                            <Link to = "/employee/leaves">View all leaves</Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
      {/* Delete Leave Modal */}
      <DeleteLeave/>
      {/* /Delete Leave Modal */}
        </div>
    </div> 
  );
  }
