import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import "../../assets/css/calendar.css"
import { Header } from '../common/Header'
import { SidebarEmployee } from '../employee/Sidebar'
import { AddEvent } from '../common/events/AddEvent'
import  Modalbox from "../common/Modalbox"
import * as eventsService from '../../services/eventsService'

export const Calendar = (props) => {

    const [menu, setMenu] = useState(false)

	const toggleMobileMenu = () => {
		setMenu(!menu)
	  }
      
    const [startDate, setDate] = useState(new Date()),
            [showCategory, setshowCategory] = useState(false),
            [showmodel, setshowmodel] = useState(false),
            [showEvents, setshowEvents] = useState(false),
            [show, setshow] = useState(false),
            [iseditdelete, setiseditdelete] = useState(false),
            [addneweventobj, setaddneweventobj] = useState(null),
            [isnewevent, setisnewevent] = useState(false),
            [event_title, setevent_title] = useState(""),
            [category_color, setcategory_color] = useState(""),
            [calenderevent, setcalenderevent] = useState(""),
            [weekendsVisible, setweekendsVisible] = useState(true),
            [currentEvents, setscurrentEvents] = useState([]),
            [events, setEvents] = useState([]),
            [loading, setLoading] = useState([]),
            defaultEvents = [{
                title: 'Event Name 4',
                start: Date.now() + 148000000,
                className: 'bg-purple'
              },
              {
                  title: 'Test Event 1',
                  start: Date.now(),
                  end: Date.now(),
                  className: 'bg-success'
              },
              {
                  title: 'Test Event 2',
                  start: Date.now() + 168000000,
                  className: 'bg-info'
              },
              {
                  title: 'Test Event 3',
                  start: Date.now() + 338000000,
                  className: 'bg-primary'
              }]
    ;

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
	
    const handleChange = (date) => {
        setDate(date)
    }
    const addEvent = () => {
        setshowEvents(true)
    }
    const categoryHandler = () => {
        setshowCategory(true)
    } 
      
      const handleClose=()=>{
          setisnewevent(false)
          setiseditdelete(false)
          setshow(false)
          setshowCategory(false)
          setshowEvents(false)
          setshowmodel(false)
    }
    const handleEventClick = (clickInfo) => {  
        setiseditdelete(false)
        setevent_title(clickInfo.event.title)
        setcalenderevent(clickInfo.event) 
    }
    
    const handleDateSelect = (selectInfo) => {
        setisnewevent(true)
        setaddneweventobj(selectInfo)
    }
    const addnewevent=()=>{
        let calendarApi = addneweventobj.view.calendar

        calendarApi.unselect() // clear date selection

        if (event_title) {
            calendarApi.addEvent({
            id: 10,
            title : event_title,
            className: category_color,
            start: addneweventobj.startStr,
            end: addneweventobj.endStr,
            allDay: addneweventobj.allDay
            })
        }   
        setisnewevent(false)
    }
      
    const onupdateModalClose=()=> {
        setiseditdelete(false)
        setevent_title('')
    }
    const oncreateeventModalClose=()=> {
        setevent_title("")
        setisnewevent(false)
    }
    const removeevent=()=>{
        calenderevent.remove()
        setiseditdelete(false)
    }
    const clickupdateevent=()=>{
        const newArray = defaultEvents
        for(let i=0;i<newArray.length;i++){
            if(newArray[i].id === parseInt(calenderevent.id)){
            newArray[i].title = event_title
            }
        }
        defaultEvents = newArray
        setiseditdelete(false)
    }
    
    const handleClick=()=>{
        setshow(true)
    }
   

        return (
        
            <div className={`main-wrapper ${menu ? 'slide-nav': ''}`}> 
          
            <Header onMenuClick={(value) => toggleMobileMenu()} />
            <SidebarEmployee /> 

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
              <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_event"><i className="fa fa-plus" /> Add Event</a>
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
                                    initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
                                    select={handleDateSelect}
                                    // eventContent={renderEventContent} // custom render function
                                    eventClick={clickInfo=>handleEventClick(clickInfo)}
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
			
                <Modalbox show={showmodel} handleClose={handleClose} />
				
				</div>			
			</div>
		</div>
		
        );
    
}