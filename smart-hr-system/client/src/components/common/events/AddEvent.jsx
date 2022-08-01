import { useState } from 'react';
import {useAuthValue} from '../../../contexts/AuthContext';

export const AddEvent =({
    onEventCreate
}) => {
    const {currentUser} = useAuthValue();
    const [errors, setErrors] = useState({});
    const [eventData, setEventData] = useState({
        name: '',
        date: '',
        category: '',
        uid: currentUser.uid
    });

    const changeHandler = (e) => {
        setEventData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(eventData);
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
                            <label htmlFor="name">Event Name <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" id='name' name='name' value={eventData.name} onChange={changeHandler} onBlur={(e) => minLength(e, 3)}/>
                            {errors.name &&
                                <p className="form-error">
                                    FEvent name should be at least 3 symbols!
                                </p>
                            }
                        </div>
                        <div className="form-group">
                            <label>Event Date <span className="text-danger">*</span></label>
                            <div >
                                <input className="form-control" type="date" id='date' name='date' value={eventData.date} onChange={changeHandler} />
                            </div>
                        </div>
                            <div className="form-group mb-0">
                                <label>Choose Category Color</label>
                                <select className="form-control form-white" data-placeholder="Choose a color..." name="category-color" value={eventData.category} onChange={changeHandler}>
                                    <option value="success">Success</option>
                                    <option value="danger">Danger</option>
                                    <option value="info">Info</option>
                                    <option value="primary">Primary</option>
                                    <option value="warning">Warning</option>
                                    <option value="inverse">Inverse</option>
                                </select>
                            </div>
                        <div className="submit-section">
                            <button className="btn btn-primary submit-btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
   )
}