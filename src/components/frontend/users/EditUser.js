import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../../../layouts/superadmin/Footer";
import LeftSidebar from "../../../layouts/superadmin/LeftSidebar";
import Navbar from "../../../layouts/superadmin/Navbar";

function EditUser(props) {

    const navigate = useNavigate();
    const [userlist, setUserlist] = useState([]);//categorylist
    const [categorylist, setCategorylist] = useState([]);//categorylist
    const [errorlist, setError] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [fileUrl, setFileUrl] = useState([]);
    const [filestate, setfilestate] = useState([]);
    const [role, setRole] = useState([]);
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const [userInput, setUser] = useState({
        name: '',
        email: '',
        //password: '',
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
        document.title = "Edit User";
        axios.get('/sanctum/csrf-cookie').then(response => {
            //const service_id = props.match.params.id
            axios.get(`/api/edit-user/${id}`).then(res => {
                if (res.data.status === 200) {
                    //console.log(res.data.user);
                    setUser(res.data.user);
                    setCheckboxes(res.data.user);
                    setFileUrl(`http://localhost:8000/${res.data.user.service}`);
                    setfilestate(res.data.user.service);
                    setRole(res.data.user.role);
                    setEmail(res.data.user.email);
                    setSubject("fk you subject ");
                    setMessage("Fukc you message");
                }
                else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error");
                    //navigate('/servicenotfound');
                }
                setLoading(false);
            });
        });
    }, []);
  

    const sendEmail = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        console.log(email);
        console.log(subject);
        console.log(message);
    
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/sendemail`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => {
                if (res.data.status === 200) {
                    //swal("Succes", res.data.message, "success");
                }
                else if (res.data.status === 422) {
                    //swal("All Fields are mendentory", "", "error");
                    //setError(res.data.errors);
                }
            });
        });
      };

    const updateService = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', userInput.name);
        formData.append('email', userInput.email);
        formData.append('cin', userInput.cin);
        formData.append('phone', userInput.phone);
        formData.append('status', allcheckbox.status ? '1' : '0');
        formData.append('role', userInput.role);
        formData.append('image', picture.image);

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/update-user/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => {
                if (res.data.status === 200) {
                    console.log("allcheckbox.status");
                    console.log(allcheckbox.status);
                    if(role === 'admin' && allcheckbox.status === true)
                    {
                        sendEmail(e);
                    }
                    
                    swal("Succes", res.data.message, "success");
                    setError([]);
                    navigate('/ViewUser');
                }
                else if (res.data.status === 422) {
                    swal("All Fields are mendentory", "", "error");
                    setError(res.data.errors);
                }
                else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error");
                }
            });
        });
    }

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
                                <div className="col-md-6 col-sm-12">
                                    <div className="title">
                                        <h4>Back to Home page</h4>
                                    </div>
                                    <nav aria-label="breadcrumb" role="navigation">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/master">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Edit user</li>
                                        </ol>
                                    </nav>
                                </div>
                                <div className="col-md-6 col-sm-12 text-right">
                                    <div className="dropdown">
                                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                                            January 2018
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a className="dropdown-item" href="#">Export List</a>
                                            <a className="dropdown-item" href="#">Policies</a>
                                            <a className="dropdown-item" href="#">View Assets</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* horizontal Basic Forms Start */}
                        <div className="pd-20 card-box mb-30">
                            <div className="clearfix">
                                <div className="pull-left">
                                    <h4 className="text-blue h4">Edit User</h4>
                                </div>
                            </div>
                            <form onSubmit={updateService}>
                                <br />

                                <div className="form-group">
                                    <label>User Name</label>
                                    <input name="name" onChange={handleInput} value={userInput.name} className="form-control" type="text" placeholder="Avenue de Paris Tunis Tunisia....." />
                                </div>
                                <p class="text-danger">{errorlist.name}</p>
                                <div className="form-group">
                                    <label>User Email</label>
                                    <input name="email" onChange={handleInput} value={userInput.email} className="form-control" type="text" placeholder="Avenue de Paris Tunis Tunisia....." />
                                </div>
                                <p class="text-danger">{errorlist.email}</p>
                                <div className="form-group">
                                    <label>User Cin</label>
                                    <input name="cin" onChange={handleInput} value={userInput.cin} className="form-control" type="text" placeholder="Avenue de Paris Tunis Tunisia....." />
                                </div>
                                <p class="text-danger">{errorlist.cin}</p>
                                <div className="form-group">
                                    <label>User Number</label>
                                    <input name="phone" onChange={handleInput} value={userInput.phone} className="form-control" type="text" placeholder="Avenue de Paris Tunis Tunisia....." />
                                </div>
                                <p class="text-danger">{errorlist.phone}</p>

                                <div className="form-group">
                                    <label >User image</label>
                                    <div className="custom-file">
                                        <img src={`http://localhost:8000/${userInput.image}`} width={100} height={100} />
                                        <div className="form-control selectpicker">
                                            <input type="file" name="image" onChange={handleImage} ClassName="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <p class="text-danger">{errorlist.image}</p>
                                <br /><br /><br /><br />



                                <div class="form-group row">
                                    <label class="col-sm-12 col-md-2 col-form-label">Select Location to  service</label>
                                    <div class="col-sm-12 col-md-10">
                                        <select name="role" className="custom-select col-12" title="Select role" value={userInput.role} onChange={handleLocationChange}>
                                            <option selected="">Located in.......</option>
                                            <option value="client">Client</option>
                                            <option value="admin">Admin</option>
                                            <option value="counter-clerk">Counter-Clerk</option>
                                        </select>
                                    </div>
                                </div>
                                <p class="text-danger">{errorlist.role}</p>
                                <div className="form-group">
                                    <label>User File</label>
                                    <div className="col-md-8">
                                        {filestate !== null ? (
                                            <a href={fileUrl} target="_blank" rel="noopener noreferrer">Open File</a>
                                        ) : (
                                            <p>No file available</p>
                                        )}
                                </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <label className="weight-600">Account status</label>
                                            <div className="custom-control custom-checkbox mb-5">
                                                <input name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true : false} type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">Activate account</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-danger">{errorlist.status}</p>



      



                                <button type="submit" class="btn btn-primary btn-block btn-lg">Submit</button>
                            </form>
                            {/* <button onClick={(e)=>sendEmail(e)} class="btn btn-primary btn-block btn-lg">Send Email</button> */}

                        </div>
                        {/* horizontal Basic Forms End */}
                    </div>

                    <Footer />
                </div>
            </div>
        </div>



    );
}

export default EditUser;