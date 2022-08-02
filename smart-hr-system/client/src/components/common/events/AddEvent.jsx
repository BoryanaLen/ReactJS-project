import { useState } from 'react';

export const AddEvent =({
    onEventCreate
}) => {
    const [errors, setErrors] = useState({});
    const [eventData, setEventData] = useState({
        title: '',
        className: '',
        start: '',
        end: ''
    });

    const changeHandler = (e) => {
        setEventData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        eventData.end =eventData.start;
        onEventCreate(eventData); 
    };

    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: eventData[e.target.name].length < bound,
        }));
    }

   return (
    <div id="add_event" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add Event</h5>
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="title">Event Name <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" id='title' name='title' value={eventData.title} onChange={changeHandler} onBlur={(e) => minLength(e, 3)}/>
                            {errors.name &&
                                <p className="form-error">
                                    FEvent name should be at least 3 symbols!
                                </p>
                            }
                        </div>
                        <div className="form-group">
                            <label>Event Date <span className="text-danger">*</span></label>
                            <div >
                                <input className="form-control" type="date" id='start' name='start' value={eventData.start} onChange={changeHandler} />
                            </div>
                        </div>
                            <div className="form-group mb-0">
                                <label>Choose Category Color</label>
                                <select className="form-control form-white" data-placeholder="Choose a color..." id='className' name="className" value={eventData.className} onChange={changeHandler}>
                                    <option value="bg-success">Success</option>
                                    <option value="bg-danger">Danger</option>
                                    <option value="bg-info">Info</option>
                                    <option value="bg-primary">Primary</option>
                                    <option value="bg-warning">Warning</option>
                                    <option value="bg-inverse">Inverse</option>
                                </select>
                            </div>
                        <div className="submit-section">
                            <button className="btn btn-primary submit-btn" data-bs-dismiss="modal">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
   )
}