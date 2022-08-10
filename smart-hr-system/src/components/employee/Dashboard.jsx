import {useState, useEffect, useContext } from 'react';
import {Avatar_02} from '../../assets/imagepath';
import { Link } from 'react-router-dom';
import { Header } from '../common/Header';
import { SidebarEmployee } from './Sidebar';
import * as requester from '../../services/requester'
import * as eventsService from '../../services/eventsService'
import { AuthContext } from '../../contexts/AuthContext';

export const EmployeeDashboard = () => {

    const [menu, setMenu] = useState(false)
    const [userName, setUserName] = useState("");
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState([]);
    const { role } = useContext(AuthContext);

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    useEffect(() => {
        async function getData() {
            requester.getUser()
            .then(user => {
                setUserName(user.email)
            })
        }     
        getData();

        setLoading(true)
        eventsService
            .getAllEventsForUser()
            .then((data) => {
                const list = data.map(leave => {
                    return { id: leave.id, data: leave.data() };
                })
                setEvents(list);
                console.log(list)
            })
            .finally(() => setLoading(false))
       
    },[])

	const toggleMobileMenu = () => {
		setMenu(!menu)
	  }

      return ( role==="user" && !loading &&

        <div className={`main-wrapper ${menu ? 'slide-nav': ''}`}> 
          
          <Header onMenuClick={(value) => toggleMobileMenu()} />
          <SidebarEmployee /> 
            <div className="page-wrapper"> 
                {/* Page Content */}
                <div className="content container-fluid">
                <div className="row">
                    <div className="col-md-12">
                    <div className="welcome-box">
                        <div className="welcome-img">
                        <img alt="" src={Avatar_02} />
                        </div>
                        <div className="welcome-det">
                        <h3>Welcome, {userName}</h3>
                        <p>{date}</p>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8 col-md-8">
                    <div className="card card-table flex-fill">
                    <div className="card-header">
                    <h3 className="card-title mb-0">Events</h3>
                    </div>
                    <div className="card-body">
                    <div className="table-responsive">
                        <table className="table custom-table mb-0">
                        <thead>
                            <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            { events &&
                                events.slice(0, 5).map((event, index) => (
                                    <tr key={index}>
                                    <td>{event.data.title}</td>
                                    <td>{event.data.start}</td>
                                    <td>{event.data.className}</td>
                                    <td className="text-end">
                                    <div className="dropdown dropdown-action">
                                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item" href="#"><i className="fa fa-pencil m-r-5" /> Edit</a>
                                        <a className="dropdown-item" href="#"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                                        </div>
                                    </div>
                                    </td>
                                </tr>                 
                            ))}            

                        </tbody>
                        </table>
                    </div>
                    </div>
                    <div className="card-footer">
                    <Link to = "/app/employees/clients">View all events</Link>
                    </div>
                </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                    <div className="dash-sidebar">
                        <section>
                        <h5 className="dash-title">Your Leave</h5>
                        <div className="card">
                            <div className="card-body">
                            <div className="time-list">
                                <div className="dash-stats-list">
                                <h4>4.5</h4>
                                <p>Leave Taken</p>
                                </div>
                                <div className="dash-stats-list">
                                <h4>12</h4>
                                <p>Remaining</p>
                                </div>
                            </div>
                            <div className="request-btn">
                                <a className="btn btn-primary" href="#">Apply Leave</a>
                            </div>
                            </div>
                        </div>
                        </section>
                        <section>
                        <h5 className="dash-title">Your Events</h5>
                        <div className="card">
                            <div className="card-body">
                            <div className="time-list">
                                <div className="dash-stats-list">
                                <h4>5.0 Hours</h4>
                                <p>Approved</p>
                                </div>
                                <div className="dash-stats-list">
                                <h4>15 Hours</h4>
                                <p>Remaining</p>
                                </div>
                            </div>
                            <div className="request-btn">
                                <a className="btn btn-primary" href="#">Apply Event</a>
                            </div>
                            </div>
                        </div>
                        </section>
                    </div>
                    </div>
                </div>
                </div>
                {/* /Page Content */}
            </div>
        </div> 
      );
  }
