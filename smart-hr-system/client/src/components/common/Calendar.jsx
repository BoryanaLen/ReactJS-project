import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import * as eventsService from '../../services/eventsService'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import "../../assets/css/calendar.css"
import { Header } from '../common/Header'
import { SidebarEmployee } from '../employee/Sidebar'
import { AddEvent } from '../common/events/AddEvent'
import { SidebarAdmin } from '../admin/SidebarAdmin';


export const Calendar = (props) => {

    const [menu, setMenu] = useState(false);  
    const [weekendsVisible, setweekendsVisible] = useState(true);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState([]);
    const [iscurrentUserAdmin, setIsCurrentUserAdmin] = useState([]);

    const toggleMobileMenu = () => {
		setMenu(!menu)
	}

    useEffect(() => {
        setLoading(true)
        eventsService
            .getAllEventsForUser()
            .then((data) => {
                const list = data.map(leave => leave.data())
                setEvents(list);
                console.log(list)
            })
            .finally(() => setLoading(false))
        eventsService.isUserAdmin()
        .then((result) => {
            setIsCurrentUserAdmin(result);
            console.log(result);
        })
    },[])

    function onCreateEventHandler(data){
        eventsService
        .addEvent(data)
        .then(doc => {
            console.log(data);
            setEvents(oldEvents => [...oldEvents, data]);
            console.log(events);
        })
        .catch(err => {
            console.log(err);
        });
    }

	
        return (
        
            <div className={`main-wrapper ${menu ? 'slide-nav': ''}`}> 
          
            <Header onMenuClick={(value) => toggleMobileMenu()} />
            {iscurrentUserAdmin?  <SidebarAdmin/> :  <SidebarEmployee/>}

            <div className="page-wrapper">
                <div className="content container-fluid">
				
					{/* Page Header */ }
					<div className="page-header">
						<div className="row align-items-center">
							<div className="col">
								<h3 className="page-title">Calendar</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item"><Link to="/index">Dashboard</Link></li>
									<li className="breadcrumb-item active">Calendar</li>
								</ul>
							</div>
							<div className="col-auto text-end float-end ml-auto">
                            <button href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_event"><i className="fa fa-plus" /> Add Event</button>
							</div>
						</div>
					</div>
					{/*  /Page Header */ }
					
					<div className="row">
						<div className="col-md-12">
							<div className="card bg-white calendarIndex">
								<div className="card-body">
                                <FullCalendar
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                    headerToolbar={{
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                                    }}
                                    
                                    initialView='dayGridMonth'
                                    editable={true}
                                    selectable={true}
                                    selectMirror={true}
                                    dayMaxEvents={true}
                                    weekends={weekendsVisible}
                                    events={events} // alternatively, use the `events` setting to fetch from a feed
                                    //select={handleDateSelect}
                                    // eventContent={renderEventContent} // custom render function
                                    //eventClick={clickInfo=>handleEventClick(clickInfo)}
                                    // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                                    /* you can update a remote database when these fire:
                                    eventAdd={function(){}}
                                    eventChange={function(){}}
                                    eventRemove={function(){}}
                                    */
                                    />
								</div>
							</div>
						</div>
					</div>
				
				{/*  Add Event modal */ }
                    <AddEvent onEventCreate={onCreateEventHandler}/>
				{/*  /Add Event modal */ }
				
                {/*  Create Event modal */ }
                <div className="modal custom-modal fade none-border" id="my_event">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Event</h4>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body"></div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-success save-event submit-btn">Create event</button>
                                <button type="button" className="btn btn-danger delete-event submit-btn" data-bs-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
				{/*  /Create Event modal */ }
			
                {/* <Modalbox show={showmodel} handleClose={handleClose} /> */}
				
				</div>			
			</div>
		</div>
		
        );
    
}