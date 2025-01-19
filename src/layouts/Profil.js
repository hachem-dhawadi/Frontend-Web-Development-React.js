import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Footer from "./superadmin/Footer";
import LeftSidebar from "./superadmin/LeftSidebar";
import Navbar from "./superadmin/Navbar";

function Profil(props) {

    const navigate = useNavigate();
    const [userlist, setUserlist] = useState([]);//categorylist
    const [categorylist, setCategorylist] = useState([]);//categorylist
    const [errorlist, setError] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [currentuser, setcurrentUser] = useState([]);
    const [job, setJobs] = useState([]);
    const [ViewCategory, setCategory] = useState([]);

    const [userInput, setUser] = useState({
        name: '',
        email: '',
        password: '',
        cin: '',
        phone: '',
        status: '',
        role: '',
    });

    const [picture, setPicture] = useState([]);
    const [allcheckbox, setCheckboxes] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setUser({ ...userInput, [e.target.name]: e.target.value });
    }
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }
    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
    }
    const handleLocationChange = (event) => {
        setUser(prevState => ({ ...prevState, role: event.target.value, }));
    };


    useEffect(() => {
        document.title = "Profil";
        axios.get('/api/getCurrentUser')
            .then(response => {
                setcurrentUser(response.data.user);
                //console.log("current user");
                //console.log(response.data.user);
            })
            .catch(error => {
                console.log(error);
            });
            axios.get('/api/alljobsbyuserreciver')
            .then(response => {
                setJobs(response.data.jobs);
                console.log("reciver");
                console.log(response.data.jobs);
            })
            .catch(error => {
                console.log(error);
            });
        setLoading(false);
    }, []);


    var dispaly_Categorydata = "";
    if (loading) {
        return <div className="pre-loader">
            <div className="pre-loader-box">
                <div className="loader-progress" id="progress_div">
                    <div className="bar" id="bar1" />
                </div>
                <div className="percent" id="percent1">0%</div>
                <div className="loading-text">
                    Loading Data to ...
                </div>
            </div>
        </div>
    }
    else {
        dispaly_Categorydata = job.map((item) => {
            return (
                <ul>
                <li>
                        <div className="custom-control custom-checkbox mb-5">
                            <input type="checkbox" className="custom-control-input" id="task-1" />
                            <label className="custom-control-label" htmlFor="task-1" />
                        </div>
                    <div className="task-type">Sender : {item.user.email}</div>
                    <div className="task-type">Description : {item.description}</div>
                    <div className="task-type">Date : {item.created_at}</div>
                </li>
            </ul>
            )
        });
    }


    return (
        <div>
            <Navbar />
            <div className="right-sidebar">
                <div className="sidebar-title">
                    <h3 className="weight-600 font-16 text-blue">
                        Layout Settings
                        <span className="btn-block font-weight-400 font-12">User Interface Settings</span>
                    </h3>
                    <div className="close-sidebar" data-toggle="right-sidebar-close">
                        <i className="icon-copy ion-close-round" />
                    </div>
                </div>
                <div className="right-sidebar-body customscroll">
                    <div className="right-sidebar-body-content">
                        <h4 className="weight-600 font-18 pb-10">Header Background</h4>
                        <div className="sidebar-btn-group pb-30 mb-10">
                            <a href="javascript:void(0);" className="btn btn-outline-primary header-white active">White</a>
                            <a href="javascript:void(0);" className="btn btn-outline-primary header-dark">Dark</a>
                        </div>
                        <h4 className="weight-600 font-18 pb-10">Sidebar Background</h4>
                        <div className="sidebar-btn-group pb-30 mb-10">
                            <a href="javascript:void(0);" className="btn btn-outline-primary sidebar-light ">White</a>
                            <a href="javascript:void(0);" className="btn btn-outline-primary sidebar-dark active">Dark</a>
                        </div>
                        <h4 className="weight-600 font-18 pb-10">Menu Dropdown Icon</h4>
                        <div className="sidebar-radio-group pb-10 mb-10">
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebaricon-1" name="menu-dropdown-icon" className="custom-control-input" defaultValue="icon-style-1" defaultChecked />
                                <label className="custom-control-label" htmlFor="sidebaricon-1"><i className="fa fa-angle-down" /></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebaricon-2" name="menu-dropdown-icon" className="custom-control-input" defaultValue="icon-style-2" />
                                <label className="custom-control-label" htmlFor="sidebaricon-2"><i className="ion-plus-round" /></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebaricon-3" name="menu-dropdown-icon" className="custom-control-input" defaultValue="icon-style-3" />
                                <label className="custom-control-label" htmlFor="sidebaricon-3"><i className="fa fa-angle-double-right" /></label>
                            </div>
                        </div>
                        <h4 className="weight-600 font-18 pb-10">Menu List Icon</h4>
                        <div className="sidebar-radio-group pb-30 mb-10">
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebariconlist-1" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-1" defaultChecked />
                                <label className="custom-control-label" htmlFor="sidebariconlist-1"><i className="ion-minus-round" /></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebariconlist-2" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-2" />
                                <label className="custom-control-label" htmlFor="sidebariconlist-2"><i className="fa fa-circle-o" aria-hidden="true" /></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebariconlist-3" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-3" />
                                <label className="custom-control-label" htmlFor="sidebariconlist-3"><i className="dw dw-check" /></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebariconlist-4" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-4" defaultChecked />
                                <label className="custom-control-label" htmlFor="sidebariconlist-4"><i className="icon-copy dw dw-next-2" /></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebariconlist-5" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-5" />
                                <label className="custom-control-label" htmlFor="sidebariconlist-5"><i className="dw dw-fast-forward-1" /></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebariconlist-6" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-6" />
                                <label className="custom-control-label" htmlFor="sidebariconlist-6"><i className="dw dw-next" /></label>
                            </div>
                        </div>
                        <div className="reset-options pt-30 text-center">
                            <button className="btn btn-danger" id="reset-settings">Reset Settings</button>
                        </div>
                    </div>
                </div>
            </div>
            <LeftSidebar />
            <div className="mobile-menu-overlay" />
            <div className="main-container">
                <div className="pd-ltr-20 xs-pd-20-10">








                    <div className="min-height-200px">
                        <div className="page-header">
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="title">
                                        <h4>Profile</h4>
                                    </div>
                                    <nav aria-label="breadcrumb" role="navigation">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Profile</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-30">
                                <div className="pd-20 card-box height-100-p">
                                    <div className="profile-photo">
                                        <a href="modal" data-toggle="modal" data-target="#modal" className="edit-avatar"><i className="fa fa-pencil" /></a>
                                        <img src={`http://localhost:8000/${currentuser.image}`}  className="avatar-photo"/>
                                        <div className="modal fade" id="modal" tabIndex={-1} role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-body pd-5">
                                                        <div className="img-container">
                                                        <img src={`http://localhost:8000/${currentuser.image}`}  />
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <input type="submit" defaultValue="Update" className="btn btn-primary" />
                                                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="text-center h5 mb-0">{currentuser.name}</h5>
                                    <p className="text-center text-muted font-14"></p>
                                    <div className="profile-info">
                                        <h5 className="mb-20 h5 text-blue">Contact Information</h5>
                                        <ul>
                                            <li>
                                                <span>Email Address:</span>
                                                {currentuser.email}
                                            </li>
                                            <li>
                                                <span>Cin Number:</span>
                                                {currentuser.cin}
                                            </li>
                                            <li>
                                                <span>Phone Number:</span>
                                                {currentuser.phone}
                                            </li>
                                            <li>
                                                <span>Role:</span>
                                                {currentuser.role}
                                            </li>
                                            <li>
                                                <span>Created at:</span>
                                                {currentuser.created_at}
                                            </li>
                                            <li>
                                                <span>last update:</span>
                                                {currentuser.updated_at}<br />
                                                
                                            </li>
                                        </ul>
                                    </div>
   
                 
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 mb-30">
                                <div className="card-box height-100-p overflow-hidden">
                                    <div className="profile-tab height-100-p">
                                        <div className="tab height-100-p">
                                            <ul className="nav nav-tabs customtab" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" data-toggle="tab" href="#timeline" role="tab">Notification</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="tab" href="#tasks" role="tab">Tasks</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="tab" href="#setting" role="tab">Settings</a>
                                                </li>
                                            </ul>
                                            <div className="tab-content">
                                                {/* Timeline Tab start */}
                                                <div className="tab-pane fade show active" id="timeline" role="tabpanel">
                                                    <div className="pd-20">
                                                        <div className="profile-timeline">
                                                            <div className="timeline-month">
                                                                <h5>August, 2020</h5>
                                                            </div>
                                                            <div className="profile-timeline-list">
                                                                <ul>
                                                                    <li>
                                                                        <div className="date">12 Aug</div>
                                                                        <div className="task-name"><i className="ion-android-alarm-clock" /> Task Added</div>
                                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                                        <div className="task-time">09:30 am</div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="date">10 Aug</div>
                                                                        <div className="task-name"><i className="ion-ios-chatboxes" /> Task Added</div>
                                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                                        <div className="task-time">09:30 am</div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="date">10 Aug</div>
                                                                        <div className="task-name"><i className="ion-ios-clock" /> Event Added</div>
                                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                                        <div className="task-time">09:30 am</div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="date">10 Aug</div>
                                                                        <div className="task-name"><i className="ion-ios-clock" /> Event Added</div>
                                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                                        <div className="task-time">09:30 am</div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="timeline-month">
                                                                <h5>July, 2020</h5>
                                                            </div>
                                                            <div className="profile-timeline-list">
                                                                <ul>
                                                                    <li>
                                                                        <div className="date">12 July</div>
                                                                        <div className="task-name"><i className="ion-android-alarm-clock" /> Task Added</div>
                                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                                        <div className="task-time">09:30 am</div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="date">10 July</div>
                                                                        <div className="task-name"><i className="ion-ios-chatboxes" /> Task Added</div>
                                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                                        <div className="task-time">09:30 am</div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="timeline-month">
                                                                <h5>June, 2020</h5>
                                                            </div>
                                                            <div className="profile-timeline-list">
                                                                <ul>
                                                                    <li>
                                                                        <div className="date">12 June</div>
                                                                        <div className="task-name"><i className="ion-android-alarm-clock" /> Task Added</div>
                                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                                        <div className="task-time">09:30 am</div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="date">10 June</div>
                                                                        <div className="task-name"><i className="ion-ios-chatboxes" /> Task Added</div>
                                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                                        <div className="task-time">09:30 am</div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="date">10 June</div>
                                                                        <div className="task-name"><i className="ion-ios-clock" /> Event Added</div>
                                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                                        <div className="task-time">09:30 am</div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Timeline Tab End */}
                                                {/* Tasks Tab start */}
                                                <div className="tab-pane fade" id="tasks" role="tabpanel">
                                                    <div className="pd-20 profile-task-wrap">
                                                        <div className="container pd-0">
                                                            {/* Open Task start */}
                                                            <div className="task-title row align-items-center">
                                                                <div className="col-md-8 col-sm-12">
                                                                    <h5>Workers request (4 Left)</h5>
                                                                </div>
                                                                <div className="col-md-4 col-sm-12 text-right">
                                                                    <a href="task-add" data-toggle="modal" data-target="#task-add" className="bg-light-blue btn text-blue weight-500"><i className="ion-plus-round" /> Add</a>
                                                                </div>
                                                            </div>
                                                            <div className="profile-task-list pb-30">
                                


                                                            {dispaly_Categorydata}








                                                            </div>
                                                            {/* Open Task End */}
                                                            {/* Close Task start */}
                                                            <div className="task-title row align-items-center">
                                                                <div className="col-md-12 col-sm-12">
                                                                    <h5>Closed Tasks</h5>
                                                                </div>
                                                            </div>
                                                            <div className="profile-task-list close-tasks">
                                                                <ul>
                                                                    <li>
                                                                        <div className="custom-control custom-checkbox mb-5">
                                                                            <input type="checkbox" className="custom-control-input" id="task-close-1" defaultChecked disabled />
                                                                            <label className="custom-control-label" htmlFor="task-close-1" />
                                                                        </div>
                                                                        <div className="task-type">Email</div>
                                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id ea earum.
                                                                        <div className="task-assign">Assigned to Ferdinand M. <div className="due-date">due date <span>22 February 2018</span></div></div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="custom-control custom-checkbox mb-5">
                                                                            <input type="checkbox" className="custom-control-input" id="task-close-2" defaultChecked disabled />
                                                                            <label className="custom-control-label" htmlFor="task-close-2" />
                                                                        </div>
                                                                        <div className="task-type">Email</div>
                                                                        Lorem ipsum dolor sit amet.
                                                                        <div className="task-assign">Assigned to Ferdinand M. <div className="due-date">due date <span>22 February 2018</span></div></div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="custom-control custom-checkbox mb-5">
                                                                            <input type="checkbox" className="custom-control-input" id="task-close-3" defaultChecked disabled />
                                                                            <label className="custom-control-label" htmlFor="task-close-3" />
                                                                        </div>
                                                                        <div className="task-type">Email</div>
                                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                                        <div className="task-assign">Assigned to Ferdinand M. <div className="due-date">due date <span>22 February 2018</span></div></div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="custom-control custom-checkbox mb-5">
                                                                            <input type="checkbox" className="custom-control-input" id="task-close-4" defaultChecked disabled />
                                                                            <label className="custom-control-label" htmlFor="task-close-4" />
                                                                        </div>
                                                                        <div className="task-type">Email</div>
                                                                        Lorem ipsum dolor sit amet. Id ea earum.
                                                                        <div className="task-assign">Assigned to Ferdinand M. <div className="due-date">due date <span>22 February 2018</span></div></div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            {/* Close Task start */}
                                                            {/* add task popup start */}
                                                            <div className="modal fade customscroll" id="task-add" tabIndex={-1} role="dialog">
                                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title" id="exampleModalLongTitle">Tasks Add</h5>
                                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" data-toggle="tooltip" data-placement="bottom" title data-original-title="Close Modal">
                                                                                <span aria-hidden="true">×</span>
                                                                            </button>
                                                                        </div>
                                                                        <div className="modal-body pd-0">
                                                                            <div className="task-list-form">
                                                                                <ul>
                                                                                    <li>
                                                                                        <form>
                                                                                            <div className="form-group row">
                                                                                                <label className="col-md-4">Task Type</label>
                                                                                                <div className="col-md-8">
                                                                                                    <input type="text" className="form-control" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="form-group row">
                                                                                                <label className="col-md-4">Task Message</label>
                                                                                                <div className="col-md-8">
                                                                                                    <textarea className="form-control" defaultValue={""} />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="form-group row">
                                                                                                <label className="col-md-4">Assigned to</label>
                                                                                                <div className="col-md-8">
                                                                                                    <select className="selectpicker form-control" data-style="btn-outline-primary" title="Not Chosen" multiple data-selected-text-format="count" data-count-selected-text="{0} people selected">
                                                                                                        <option>Ferdinand M.</option>
                                                                                                        <option>Don H. Rabon</option>
                                                                                                        <option>Ann P. Harris</option>
                                                                                                        <option>Katie D. Verdin</option>
                                                                                                        <option>Christopher S. Fulghum</option>
                                                                                                        <option>Matthew C. Porter</option>
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="form-group row mb-0">
                                                                                                <label className="col-md-4">Due Date</label>
                                                                                                <div className="col-md-8">
                                                                                                    <input type="text" className="form-control date-picker" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </form>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="javascript:;" className="remove-task" data-toggle="tooltip" data-placement="bottom" title data-original-title="Remove Task"><i className="ion-minus-circled" /></a>
                                                                                        <form>
                                                                                            <div className="form-group row">
                                                                                                <label className="col-md-4">Task Type</label>
                                                                                                <div className="col-md-8">
                                                                                                    <input type="text" className="form-control" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="form-group row">
                                                                                                <label className="col-md-4">Task Message</label>
                                                                                                <div className="col-md-8">
                                                                                                    <textarea className="form-control" defaultValue={""} />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="form-group row">
                                                                                                <label className="col-md-4">Assigned to</label>
                                                                                                <div className="col-md-8">
                                                                                                    <select className="selectpicker form-control" data-style="btn-outline-primary" title="Not Chosen" multiple data-selected-text-format="count" data-count-selected-text="{0} people selected">
                                                                                                        <option>Ferdinand M.</option>
                                                                                                        <option>Don H. Rabon</option>
                                                                                                        <option>Ann P. Harris</option>
                                                                                                        <option>Katie D. Verdin</option>
                                                                                                        <option>Christopher S. Fulghum</option>
                                                                                                        <option>Matthew C. Porter</option>
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="form-group row mb-0">
                                                                                                <label className="col-md-4">Due Date</label>
                                                                                                <div className="col-md-8">
                                                                                                    <input type="text" className="form-control date-picker" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </form>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div className="add-more-task">
                                                                                <a href="#" data-toggle="tooltip" data-placement="bottom" title data-original-title="Add Task"><i className="ion-plus-circled" /> Add More Task</a>
                                                                            </div>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-primary">Add</button>
                                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* add task popup End */}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Tasks Tab End */}
                                                {/* Setting Tab start */}
                                                <div className="tab-pane fade height-100-p" id="setting" role="tabpanel">
                                                    <div className="profile-setting">
                                                        <form>
                                                            <ul className="profile-edit-list row">
                                                                <li className="weight-500 col-md-6">
                                                                    <h4 className="text-blue h5 mb-20">Edit Your Personal Setting</h4>
                                                                    <div className="form-group">
                                                                        <label>Full Name</label>
                                                                        <input className="form-control form-control-lg" type="text" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Title</label>
                                                                        <input className="form-control form-control-lg" type="text" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Email</label>
                                                                        <input className="form-control form-control-lg" type="email" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Date of birth</label>
                                                                        <input className="form-control form-control-lg date-picker" type="text" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Gender</label>
                                                                        <div className="d-flex">
                                                                            <div className="custom-control custom-radio mb-5 mr-20">
                                                                                <input type="radio" id="customRadio4" name="customRadio" className="custom-control-input" />
                                                                                <label className="custom-control-label weight-400" htmlFor="customRadio4">Male</label>
                                                                            </div>
                                                                            <div className="custom-control custom-radio mb-5">
                                                                                <input type="radio" id="customRadio5" name="customRadio" className="custom-control-input" />
                                                                                <label className="custom-control-label weight-400" htmlFor="customRadio5">Female</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Country</label>
                                                                        <select className="selectpicker form-control form-control-lg" data-style="btn-outline-secondary btn-lg" title="Not Chosen">
                                                                            <option>United States</option>
                                                                            <option>India</option>
                                                                            <option>United Kingdom</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>State/Province/Region</label>
                                                                        <input className="form-control form-control-lg" type="text" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Postal Code</label>
                                                                        <input className="form-control form-control-lg" type="text" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Phone Number</label>
                                                                        <input className="form-control form-control-lg" type="text" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Address</label>
                                                                        <textarea className="form-control" defaultValue={""} />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Visa Card Number</label>
                                                                        <input className="form-control form-control-lg" type="text" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Paypal ID</label>
                                                                        <input className="form-control form-control-lg" type="text" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <div className="custom-control custom-checkbox mb-5">
                                                                            <input type="checkbox" className="custom-control-input" id="customCheck1-1" />
                                                                            <label className="custom-control-label weight-400" htmlFor="customCheck1-1">I agree to receive notification emails</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mb-0">
                                                                        <input type="submit" className="btn btn-primary" defaultValue="Update Information" />
                                                                    </div>
                                                                </li>
                                                                <li className="weight-500 col-md-6">
                                                                    <h4 className="text-blue h5 mb-20">Edit Social Media links</h4>
                                                                    <div className="form-group">
                                                                        <label>Facebook URL:</label>
                                                                        <input className="form-control form-control-lg" type="text" placeholder="Paste your link here" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Twitter URL:</label>
                                                                        <input className="form-control form-control-lg" type="text" placeholder="Paste your link here" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Linkedin URL:</label>
                                                                        <input className="form-control form-control-lg" type="text" placeholder="Paste your link here" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Instagram URL:</label>
                                                                        <input className="form-control form-control-lg" type="text" placeholder="Paste your link here" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Dribbble URL:</label>
                                                                        <input className="form-control form-control-lg" type="text" placeholder="Paste your link here" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Dropbox URL:</label>
                                                                        <input className="form-control form-control-lg" type="text" placeholder="Paste your link here" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Google-plus URL:</label>
                                                                        <input className="form-control form-control-lg" type="text" placeholder="Paste your link here" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Pinterest URL:</label>
                                                                        <input className="form-control form-control-lg" type="text" placeholder="Paste your link here" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Skype URL:</label>
                                                                        <input className="form-control form-control-lg" type="text" placeholder="Paste your link here" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Vine URL:</label>
                                                                        <input className="form-control form-control-lg" type="text" placeholder="Paste your link here" />
                                                                    </div>
                                                                    <div className="form-group mb-0">
                                                                        <input type="submit" className="btn btn-primary" defaultValue="Save & Update" />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </form>
                                                    </div>
                                                </div>
                                                {/* Setting Tab End */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
















                    <Footer />
                </div>
            </div>
        </div>



    );
}

export default Profil;