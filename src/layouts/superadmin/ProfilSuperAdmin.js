import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../superadmin/Footer";
import LeftSidebar from "../superadmin/LeftSidebar";
import Navbar from "../superadmin/Navbar";

function ProfilSuperAdmin(props) {

    const navigate = useNavigate();
    const [userlist, setUserlist] = useState([]);//categorylist
    const [categorylist, setCategorylist] = useState([]);//categorylist
    const [errorlist, setError] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [currentuser, setcurrentUser] = useState([]);
    const [job, setJobs] = useState([]);
    const [ViewCategory, setCategory] = useState([]);
    const [fileUrl, setFileUrl] = useState([]);
    const [filestate, setfilestate] = useState([]);
    const [role, setRole] = useState([]);
    const [email, setEmail] = useState('');
    const [IdUpdate, setIdUpdate] = useState();
    const [payementsList, setpayementsList] = useState([]);

    const [userInput, setUser] = useState({
        old_password: '',
        password: '',
        confirm_password: ''
    });

    const [userUpdate, setUserUpdate] = useState({
        name: '',
        email: '',
        cin: '',
        phone: '',
    });



    const [picture, setPicture] = useState([]);
    const [allcheckbox, setCheckboxes] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setUser({ ...userInput, [e.target.name]: e.target.value });
    }
    const handleInputUpdate = (e) => {
        e.persist();
        setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value });
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
                //console.log("current user Id");
                setIdUpdate(response.data.user.id);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get('/api/alljobsbyuserreciver')
            .then(response => {
                setJobs(response.data.jobs);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get('/sanctum/csrf-cookie').then(response => {
            //const service_id = props.match.params.id
            axios.get(`/api/edit-user/${id}`).then(res => {
                if (res.data.status === 200) {
                    setUserUpdate(res.data.user);
                }
                else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error");
                    //navigate('/servicenotfound');
                }
                setLoading(false);
            });
        });
        axios.get('/api/AllOfPayements')
        .then(response => {
            console.log("all paymement")
            console.log(response.data.payements);
            setpayementsList(response.data.payements);
        })
        .catch(error => {
            console.log(error);
        });

        setLoading(false);
    }, []);


    const submitService = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('old_password', userInput.old_password);
        formData.append('password', userInput.password);
        formData.append('confirm_password', userInput.confirm_password);

        axios.post(`/api/changepassword`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(res => {
            if (res.data.status === 200) {
                console.log("success")
                swal("Success", res.data.message, "success");
                navigate(`/ProfilSuperAdmin/${currentuser.id}`);
                setError([]);
            } else if (res.data.status === 400) {
                console.log("old password does not match")
                swal("Warning", res.data.message, "warning");
            } else if (res.data.status === 422) {
                console.log("validation fails")

                // Extract error messages and join them into a string
                const errors = Object.values(res.data.errors).join(", ");

                swal("Error", errors, "error");
            }
        });

    };

    const UpdateInformation = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', userUpdate.name);
        formData.append('email', userUpdate.email);
        formData.append('cin', userUpdate.cin);
        formData.append('phone', userUpdate.phone);
        formData.append('status', currentuser.status);
        formData.append('role', currentuser.role);
        formData.append('image', picture.image);

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/update-user/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => {
                if (res.data.status === 200) {
                    swal("Succes", res.data.message, "success");
                    setError([]);
                    //navigate('/ViewUser');
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

    var dispaly_Categorydata = "";
    var dispaly_Payementsdata = "";
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
        var mode = '';
        dispaly_Payementsdata = payementsList.map((item) => {
            if (item.payement_mode == 'Code') {
                mode='DT';
             }
             else {
                 mode='USD';
              }
             return (
                 <ul>
                 <li>
                     <div className="date">{item.payement_mode}</div>
                     <div className="task-name"><i className="ion-android-alarm-clock" />{item.tracking_no}</div>
                     <p>{item.user.email}</p>
                     <p>{item.user.cin}</p>
                     <p>{item.created_at}</p>
                     <div className="task-time">{item.money} {mode}</div>
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
                                        <a href="modal" data-toggle="modal" data-target="#modal" className="edit-avatar"><i className="dw dw-eye" /></a>
                                        <img src={`http://localhost:8000/${currentuser.image}`} className="avatar-photo" />
                                        <div className="modal fade" id="modal" tabIndex={-1} role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-body pd-5">
                                                        <div className="img-container">
                                                            <img src={`http://localhost:8000/${currentuser.image}`} />
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
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
                                                    <a className="nav-link active" data-toggle="tab" href="#timeline" role="tab">Payment Result</a>
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
                                                                <h5>2023 :</h5>
                                                            </div>
                                                            <div className="profile-timeline-list">
                                                            {dispaly_Payementsdata}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Timeline Tab End */}

                                                {/* Tasks Tab End */}
                                                {/* Setting Tab start */}
                                                <div className="tab-pane fade height-100-p" id="setting" role="tabpanel">
                                                    <div className="profile-setting">
                                                        <form >
                                                            <ul className="profile-edit-list row">
                                                                <li className="weight-500 col-md-6">
                                                                    <h4 className="text-blue h5 mb-20">Update Information</h4>
                                                                    <div className="form-group">
                                                                        <label>Name</label>
                                                                        <input name="name" onChange={handleInputUpdate} className="form-control form-control-lg" value={userUpdate.name} type="text" placeholder="New name" />
                                                                    </div>
                                                                    <p class="text-danger">{errorlist.name}</p>
                                                                    <div className="form-group">
                                                                        <label>Email</label>
                                                                        <input name="email" onChange={handleInputUpdate} className="form-control form-control-lg" value={userUpdate.email} type="text" placeholder="New email" />
                                                                    </div>
                                                                    <p class="text-danger">{errorlist.email}</p>
                                                                    <div className="form-group">
                                                                        <label>Cin</label>
                                                                        <input name="cin" onChange={handleInputUpdate} className="form-control form-control-lg" value={userUpdate.cin} type="email" placeholder="New cin" />
                                                                    </div>
                                                                    <p class="text-danger">{errorlist.cin}</p>
                                                                    <div className="form-group">
                                                                        <label>Phone Number</label>
                                                                        <input name="phone" onChange={handleInputUpdate} className="form-control form-control-lg date-picker" value={userUpdate.phone} type="text" placeholder="New number +216" />
                                                                    </div>
                                                                    <p class="text-danger">{errorlist.phone}</p>
                                                                    <label>New image</label>
                                                                    <div className="form-group">
                                                                        <img src={`http://localhost:8000/${userUpdate.image}`} width={100} height={100} />
                                                                        <div className="form-control selectpicker">
                                                                            <input type="file" name="image" onChange={handleImage} ClassName="form-control" />
                                                                        </div>
                                                                    </div>
                                                                    <p class="text-danger">{errorlist.image}</p>

                                                                    <div className="form-group mb-0">
                                                                        <input className="btn btn-primary" onClick={(e) => UpdateInformation(e)} defaultValue="Save & Update" />
                                                                    </div>
                                                                </li>
                                                                <li className="weight-500 col-md-6">
                                                                    <h4 className="text-blue h5 mb-20">Change Password</h4>
                                                                    <div className="form-group">
                                                                        <label>Old password</label>
                                                                        <input name="old_password" onChange={handleInput} value={userInput.old_password} className="form-control form-control-lg" type="password" placeholder="Old password" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>New password</label>
                                                                        <input name="password" onChange={handleInput} value={userInput.password} className="form-control form-control-lg" type="password" placeholder="New password" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Confirm new password</label>
                                                                        <input name="confirm_password" onChange={handleInput} value={userInput.confirm_password} className="form-control form-control-lg" type="password" placeholder="Confirm new password" />
                                                                    </div>



                                                                    <div className="form-group mb-0">
                                                                        <input className="btn btn-primary" defaultValue="Confirm" onClick={(e) => submitService(e)} />
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

export default ProfilSuperAdmin;