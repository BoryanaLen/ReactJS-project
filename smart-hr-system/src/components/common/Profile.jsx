 import { useEffect, useState } from 'react';
 import { Helmet } from "react-helmet";
 import { Link } from 'react-router-dom';
 import {Avatar_02,Avatar_05,Avatar_09,Avatar_10,Avatar_16 } from '../../assets/imagepath'
 import $ from 'jquery'; 

 import { Header } from '../common/Header'
import { SidebarEmployee } from '../employee/Sidebar'
 
 export const Profile = () => {
   useEffect( ()=>{
    //  if($('.select').length > 0) {
    //    $('.select').select2({
    //      minimumResultsForSearch: -1,
    //      width: '100%'
    //    });
    //  }
   });  

   const [menu, setMenu] = useState(false)

	const toggleMobileMenu = () => {
		setMenu(!menu)
	}

     return (
        <div>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <SidebarEmployee /> 
         <div className="page-wrapper">
             <Helmet>
               <title>Employee Profile - HRMS admin Template</title>
               <meta name="description" content="Reactify Blank Page" />
             </Helmet>
             {/* Page Content */}
             <div className="content container-fluid">
               {/* Page Header */}
               <div className="page-header">
                 <div className="row">
                   <div className="col-sm-12">
                     <h3 className="page-title">Profile</h3>
                     <ul className="breadcrumb">
                       <li className="breadcrumb-item"><Link to = "/app/main/dashboard">Dashboard</Link></li>
                       <li className="breadcrumb-item active">Profile</li>
                     </ul>
                   </div>
                 </div>
               </div>
               {/* /Page Header */}
               <div className="card mb-0">
                 <div className="card-body">
                   <div className="row">
                     <div className="col-md-12">
                       <div className="profile-view">
                         <div className="profile-img-wrap">
                           <div className="profile-img">
                             <a href="#"><img alt="" src={Avatar_02} /></a>
                           </div>
                         </div>
                         <div className="profile-basic">
                           <div className="row">
                             <div className="col-md-5">
                               <div className="profile-info-left">
                                 <h3 className="user-name m-t-0 mb-0">John Doe</h3>
                                 <h6 className="text-muted">UI/UX Design Team</h6>
                                 <small className="text-muted">Web Designer</small>
                                 <div className="staff-id">Employee ID : FT-0001</div>
                                 <div className="small doj text-muted">Date of Join : 1st Jan 2013</div>
                                 <div className="staff-msg"><Link onClick={()=>localStorage.setItem("minheight","true")} className="btn btn-custom" to="/conversation/chat">Send Message</Link></div>
                               </div>
                             </div>
                             <div className="col-md-7">
                               <ul className="personal-info">
                                 <li>
                                   <div className="title">Phone:</div>
                                   <div className="text"><a href="">9876543210</a></div>
                                 </li>
                                 <li>
                                   <div className="title">Email:</div>
                                   <div className="text"><a href="">johndoe@example.com</a></div>
                                 </li>
                                 <li>
                                   <div className="title">Birthday:</div>
                                   <div className="text">24th July</div>
                                 </li>
                                 <li>
                                   <div className="title">Address:</div>
                                   <div className="text">1861 Bayonne Ave, Manchester Township, NJ, 08759</div>
                                 </li>
                                 <li>
                                   <div className="title">Gender:</div>
                                   <div className="text">Male</div>
                                 </li>
                                 <li>
                                   <div className="title">Reports to:</div>
                                   <div className="text">
                                     <div className="avatar-box">
                                       <div className="avatar avatar-xs">
                                         <img src={Avatar_16} alt="" />
                                       </div>
                                     </div>
                                     <Link to = "/app/profile/employee-profile">
                                       Jeffery Lalor
                                     </Link>
                                   </div>
                                 </li>
                               </ul>
                             </div>
                           </div>
                         </div>
                         <div className="pro-edit"><a data-bs-target="#profile_info" data-bs-toggle="modal" className="edit-icon" href="#"><i className="fa fa-pencil" /></a></div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>

               <div className="tab-content">
                 {/* Profile Info Tab */}
                 <div id="emp_profile" className="pro-overview tab-pane fade show active">
                   <div className="row">
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Personal Informations <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#personal_info_modal"><i className="fa fa-pencil" /></a></h3>
                           <ul className="personal-info">
                             <li>
                               <div className="title">Passport No.</div>
                               <div className="text">9876543210</div>
                             </li>
                             <li>
                               <div className="title">Passport Exp Date.</div>
                               <div className="text">9876543210</div>
                             </li>
                             <li>
                               <div className="title">Tel</div>
                               <div className="text"><a href="">9876543210</a></div>
                             </li>
                             <li>
                               <div className="title">Nationality</div>
                               <div className="text">Indian</div>
                             </li>
                             <li>
                               <div className="title">Religion</div>
                               <div className="text">Christian</div>
                             </li>
                             <li>
                               <div className="title">Marital status</div>
                               <div className="text">Married</div>
                             </li>
                             <li>
                               <div className="title">Employment of spouse</div>
                               <div className="text">No</div>
                             </li>
                             <li>
                               <div className="title">No. of children</div>
                               <div className="text">2</div>
                             </li>
                           </ul>
                         </div>
                       </div>
                     </div>
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Emergency Contact <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#emergency_contact_modal"><i className="fa fa-pencil" /></a></h3>
                           <h5 className="section-title">Primary</h5>
                           <ul className="personal-info">
                             <li>
                               <div className="title">Name</div>
                               <div className="text">John Doe</div>
                             </li>
                             <li>
                               <div className="title">Relationship</div>
                               <div className="text">Father</div>
                             </li>
                             <li>
                               <div className="title">Phone </div>
                               <div className="text">9876543210, 9876543210</div>
                             </li>
                           </ul>
                           <hr />
                           <h5 className="section-title">Secondary</h5>
                           <ul className="personal-info">
                             <li>
                               <div className="title">Name</div>
                               <div className="text">Karen Wills</div>
                             </li>
                             <li>
                               <div className="title">Relationship</div>
                               <div className="text">Brother</div>
                             </li>
                             <li>
                               <div className="title">Phone </div>
                               <div className="text">9876543210, 9876543210</div>
                             </li>
                           </ul>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="row">
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Bank information</h3>
                           <ul className="personal-info">
                             <li>
                               <div className="title">Bank name</div>
                               <div className="text">ICICI Bank</div>
                             </li>
                             <li>
                               <div className="title">Bank account No.</div>
                               <div className="text">159843014641</div>
                             </li>
                             <li>
                               <div className="title">IFSC Code</div>
                               <div className="text">ICI24504</div>
                             </li>
                             <li>
                               <div className="title">PAN No</div>
                               <div className="text">TC000Y56</div>
                             </li>
                           </ul>
                         </div>
                       </div>
                     </div>
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Family Informations <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#family_info_modal"><i className="fa fa-pencil" /></a></h3>
                           <div className="table-responsive">
                             <table className="table table-nowrap">
                               <thead>
                                 <tr>
                                   <th>Name</th>
                                   <th>Relationship</th>
                                   <th>Date of Birth</th>
                                   <th>Phone</th>
                                   <th />
                                 </tr>
                               </thead>
                               <tbody>
                                 <tr>
                                   <td>Leo</td>
                                   <td>Brother</td>
                                   <td>Feb 16th, 2019</td>
                                   <td>9876543210</td>
                                   <td className="text-end">
                                     <div className="dropdown dropdown-action">
                                       <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                                       <div className="dropdown-menu dropdown-menu-right">
                                         <a href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                                         <a href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                                       </div>
                                     </div>
                                   </td>
                                 </tr>
                               </tbody>
                             </table>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="row">
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Education Informations <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#education_info"><i className="fa fa-pencil" /></a></h3>
                           <div className="experience-box">
                             <ul className="experience-list">
                               <li>
                                 <div className="experience-user">
                                   <div className="before-circle" />
                                 </div>
                                 <div className="experience-content">
                                   <div className="timeline-content">
                                     <a href="/" className="name">International College of Arts and Science (UG)</a>
                                     <div>Bsc Computer Science</div>
                                     <span className="time">2000 - 2003</span>
                                   </div>
                                 </div>
                               </li>
                               <li>
                                 <div className="experience-user">
                                   <div className="before-circle" />
                                 </div>
                                 <div className="experience-content">
                                   <div className="timeline-content">
                                     <a href="/" className="name">International College of Arts and Science (PG)</a>
                                     <div>Msc Computer Science</div>
                                     <span className="time">2000 - 2003</span>
                                   </div>
                                 </div>
                               </li>
                             </ul>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Experience <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#experience_info"><i className="fa fa-pencil" /></a></h3>
                           <div className="experience-box">
                             <ul className="experience-list">
                               <li>
                                 <div className="experience-user">
                                   <div className="before-circle" />
                                 </div>
                                 <div className="experience-content">
                                   <div className="timeline-content">
                                     <a href="/" className="name">Web Designer at Zen Corporation</a>
                                     <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                                   </div>
                                 </div>
                               </li>
                               <li>
                                 <div className="experience-user">
                                   <div className="before-circle" />
                                 </div>
                                 <div className="experience-content">
                                   <div className="timeline-content">
                                     <a href="/" className="name">Web Designer at Ron-tech</a>
                                     <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                                   </div>
                                 </div>
                               </li>
                               <li>
                                 <div className="experience-user">
                                   <div className="before-circle" />
                                 </div>
                                 <div className="experience-content">
                                   <div className="timeline-content">
                                     <a href="/" className="name">Web Designer at Dalt Technology</a>
                                     <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                                   </div>
                                 </div>
                               </li>
                             </ul>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 {/* /Profile Info Tab */}
                 {/* Projects Tab */}
                 <div className="tab-pane fade" id="emp_projects">
                   <div className="row">
                     <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                       <div className="card">
                         <div className="card-body">
                           <div className="dropdown profile-action">
                             <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                             <div className="dropdown-menu dropdown-menu-right">
                               <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                               <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                             </div>
                           </div>
                           <h4 className="project-title"><Link to = "/app/projects/projects-view">Office Management</Link></h4>
                           <small className="block text-ellipsis m-b-15">
                             <span className="text-xs">1</span> <span className="text-muted">open tasks, </span>
                             <span className="text-xs">9</span> <span className="text-muted">tasks completed</span>
                           </small>
                           <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                             typesetting industry. When an unknown printer took a galley of type and
                             scrambled it...
                           </p>
                           <div className="pro-deadline m-b-15">
                             <div className="sub-title">
                               Deadline:
                             </div>
                             <div className="text-muted">
                               17 Apr 2019
                             </div>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Project Leader :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                               </li>
                             </ul>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Team :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                               </li>
                               <li>
                                 <a href="#" className="all-users">+15</a>
                               </li>
                             </ul>
                           </div>
                           <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                           <div className="progress progress-xs mb-0">
                             <div style={{width: '40%'}} data-bs-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                       <div className="card">
                         <div className="card-body">
                           <div className="dropdown profile-action">
                             <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                             <div className="dropdown-menu dropdown-menu-right">
                               <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                               <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                             </div>
                           </div>
                           <h4 className="project-title"><Link to = "/app/projects/projects-view">Project Management</Link></h4>
                           <small className="block text-ellipsis m-b-15">
                             <span className="text-xs">2</span> <span className="text-muted">open tasks, </span>
                             <span className="text-xs">5</span> <span className="text-muted">tasks completed</span>
                           </small>
                           <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                             typesetting industry. When an unknown printer took a galley of type and
                             scrambled it...
                           </p>
                           <div className="pro-deadline m-b-15">
                             <div className="sub-title">
                               Deadline:
                             </div>
                             <div className="text-muted">
                               17 Apr 2019
                             </div>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Project Leader :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                               </li>
                             </ul>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Team :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                               </li>
                               <li>
                                 <a href="#" className="all-users">+15</a>
                               </li>
                             </ul>
                           </div>
                           <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                           <div className="progress progress-xs mb-0">
                             <div style={{width: '40%'}} data-bs-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                       <div className="card">
                         <div className="card-body">
                           <div className="dropdown profile-action">
                             <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                             <div className="dropdown-menu dropdown-menu-right">
                               <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                               <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                             </div>
                           </div>
                           <h4 className="project-title"><Link to = "/app/projects/projects-view">Video Calling App</Link></h4>
                           <small className="block text-ellipsis m-b-15">
                             <span className="text-xs">3</span> <span className="text-muted">open tasks, </span>
                             <span className="text-xs">3</span> <span className="text-muted">tasks completed</span>
                           </small>
                           <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                             typesetting industry. When an unknown printer took a galley of type and
                             scrambled it...
                           </p>
                           <div className="pro-deadline m-b-15">
                             <div className="sub-title">
                               Deadline:
                             </div>
                             <div className="text-muted">
                               17 Apr 2019
                             </div>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Project Leader :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                               </li>
                             </ul>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Team :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                               </li>
                               <li>
                                 <a href="#" className="all-users">+15</a>
                               </li>
                             </ul>
                           </div>
                           <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                           <div className="progress progress-xs mb-0">
                             <div style={{width: '40%'}} data-bs-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                       <div className="card">
                         <div className="card-body">
                           <div className="dropdown profile-action">
                             <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                             <div className="dropdown-menu dropdown-menu-right">
                               <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                               <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                             </div>
                           </div>
                           <h4 className="project-title"><Link to = "/app/projects/projects-view">Hospital Administration</Link></h4>
                           <small className="block text-ellipsis m-b-15">
                             <span className="text-xs">12</span> <span className="text-muted">open tasks, </span>
                             <span className="text-xs">4</span> <span className="text-muted">tasks completed</span>
                           </small>
                           <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                             typesetting industry. When an unknown printer took a galley of type and
                             scrambled it...
                           </p>
                           <div className="pro-deadline m-b-15">
                             <div className="sub-title">
                               Deadline:
                             </div>
                             <div className="text-muted">
                               17 Apr 2019
                             </div>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Project Leader :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                               </li>
                             </ul>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Team :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                               </li>
                               <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                               </li>
                               <li>
                                 <a href="#" className="all-users">+15</a>
                               </li>
                             </ul>
                           </div>
                           <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                           <div className="progress progress-xs mb-0">
                             <div style={{width: '40%'}} data-bs-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 {/* /Projects Tab */}
               </div>
             </div>
           </div>
           </div>
     );
   }
 