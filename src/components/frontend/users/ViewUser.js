import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Footer from "../../../layouts/superadmin/Footer";
import LeftSidebar from "../../../layouts/superadmin/LeftSidebar";
import Navbar from "../../../layouts/superadmin/Navbar";
import swal from "sweetalert";


function ViewUser() {

    const [loading, setLoading] = useState([true]);
    const [ViewUser, setUser] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [refresh, forceUpdate] = useState();



    useEffect(() => {

        document.title = "List of Users";

        axios.get(`/api/allusers`).then(res => {
            if (res.data.status === 200) {
                setUser(res.data.users);
                setLoading(false);
                //console.log(res.data.users);
            }

        });

    }, [refresh]);
    const deleteUser = (id) => {
        axios.delete(`/api/user/${id}`)
            .then((res) => {
                swal("Succes", res.data.message, "success");
                forceUpdate(Math.random())
            })
            .catch((error) => {
                console.log(error);
                //forceUpdate(Math.random())
            });
    };
    const filteredUsers = ViewUser.filter((user) =>
        user.cin.toLowerCase().includes(searchQuery.toLowerCase())
    );

    var dispaly_Userdata = "";
    if (loading) {
        return <div className="pre-loader">
            <div className="pre-loader-box">
                <div className="loader-logo"><img src="vendors/images/deskapp-logo.svg" alt /></div>
                <div className="loader-progress" id="progress_div">
                    <div className="bar" id="bar1" />
                </div>
                <div className="percent" id="percent1">0%</div>
                <div className="loading-text">
                    Loading...
                </div>
            </div>
        </div>

    }
    else {
        var UserStatus = '';
        var badgeClass = ''
        dispaly_Userdata = filteredUsers.map((item) => {
            if (item.status == '0') {
                UserStatus = 'Account Disabled';
                badgeClass = 'work text-danger';
            }
            else if (item.status == '1') {
                UserStatus = 'Account Active';
                badgeClass = 'work text-success';
            }
            return (
                <li class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                    <div class="contact-directory-box">
                        <div class="contact-dire-info text-center">
                            <div class="contact-avatar">
                                <img src={`http://localhost:8000/${item.image}`} width={250} height={250} />
                            </div>
                            <br></br>
                            <div class="contact-name">
                                <h5>{item.name}</h5>
                                <p>Email : {item.email}</p>
                                <p>Cin : {item.cin}</p>
                                <p>Phone : {item.phone}</p>
                                <div class={`badge ${badgeClass}`}><i class="ion-android-person"></i>  {UserStatus}</div>
                            </div>
                            <div>
                          <i class="icon-copy dw dw-delete-3"></i>
                            <Link onClick={() => swal({
                                    title: "Are you sure?",
                                    text: "You wanna delete this User",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            deleteUser(item.id)
                                        } else {
                                            // swal("Your imaginary file is safe!");
                                        }
                                    })}>Delete</Link>
                          </div>

                            <span class="badge badge-pill">{item.role}</span>
                            {/* <span class="badge badge-pill badge-primary">+3</span> */}
                

                        </div>
                        <div class="view-contact">
                            <Link to={`/edituser/${item.id}`}>Edit Profile</Link>
                        </div>
                    </div>
                </li>
            )
        });
    }



    return (
        <body>

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
                <div className="page-header">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="title">
                                <h4>Back to Home page</h4>
                            </div>
                            <nav aria-label="breadcrumb" role="navigation">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/master">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">List of users</li>
                                </ol>
                            </nav>
                        </div>
                        <div className="col-md-6 col-sm-12 text-right">
                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                                    2023
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="#">Export List</a>
                                    <a className="dropdown-item" href="#">Policies</a>
                                    <a className="dropdown-item" href="#">View Assets</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <form>
                        <div className="form-group mb-0">
                            <input
                                type="text" className="form-control search-input" placeholder="Search Here By Cin" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                        </div>
                    </form>
                </div>
                <div class="contact-directory-list">
                    <ul class="row">

                        {dispaly_Userdata}

                    </ul>
                </div>
            </div>


















            <Footer />
        </body >
    );
}

export default ViewUser;
