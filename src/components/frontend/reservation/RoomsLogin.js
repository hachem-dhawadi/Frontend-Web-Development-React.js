import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Footer from "../../../layouts/superadmin/Footer";
import LeftSidebar from "../../../layouts/Client/LeftSidebar";
import Navbar from "../../../layouts/superadmin/Navbar";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js';



function RoomsLogin() {

    const [loading, setLoading] = useState([true]);
    const [ViewCategory, setCategory] = useState([]);
    const [refresh, forceUpdate] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const { categorieId, serviceId } = useParams();
    const [RoomList, setRoomList] = useState([]);

  
    useEffect(() => {
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.get(`/api/roomserv/${serviceId}`).then((res) => {
                console.log("id de la service est ", serviceId);
                //route.params.category_id
                if (res.data.status === 200) {
                    console.log(res.data.rooms);
                    setRoomList(res.data.rooms);
                    setLoading(false);
                }
            });
        });
    }, []);

    const filteredcategory = RoomList.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    var dispaly_Categorydata = "";
    if (loading) {
        return <div className="pre-loader">
            <div className="pre-loader-box">
                {/* <div className="loader-logo"><img src="vendors/images/deskapp-logo.svg" alt /></div> */}
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
        var ServiceStatus = '';
        var badgeClass = ''
        dispaly_Categorydata = filteredcategory.map((item) => {
            if (item.active == '0') {
                ServiceStatus = 'Disabled';
                badgeClass = 'badge badge-danger';
            }
            else if (item.active == '1') {
                ServiceStatus = 'Active';
                badgeClass = 'badge badge-success';
            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td className="table-plus"><img src={`http://localhost:8000/${item.image}`} width={100} height={100} alt={item.name} /></td>
                    <td>{item.name}</td>
                    <td>{item.start}</td>
                     <td>{item.end}</td>
                    <td><span className={`badge ${badgeClass}`}>{ServiceStatus}</span></td>
                    <td>
                    {/* <Link className="dropdown-item" to={`/ReservationLogin/${categorieId}/${serviceId}/${item.id}`} ><i className="dw dw-edit1" /> Booking</Link>   */}

                    {item.active === 1 ? (
                          <Link className="dropdown-item" to={`/ReservationLogin/${categorieId}/${serviceId}/${item.id}`} ><i className="dw dw-edit1" /> Booking</Link> 
                        ) : (
                            <Link
                                className="dropdown-item"
                                onClick={() =>
                                    Swal.fire({
                                        title: 'This queue is currently disabled. Please check back later.',
                                    })
                                }
                            >
                                <i className="dw dw-edit1" /> Booking
                            </Link>
                        )}

                    </td>
                </tr>
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

            <div className="main-container">
                <div className="pd-ltr-20">


                    <div className="card-box mb-30">
                    <div className="clearfix">
                            <div className="h4 pd-20">
                                <h4 className="text-blue h4">List of Queues</h4>
                            </div>
                        </div>
                        <h2 className="h4 pd-5"><input type="text" className="form-control search-input" placeholder="Search Here By Name"  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/></h2>
                        
        
                        <table className="data-table table nowrap">
                            <thead>
                                <tr>
                                    <th className="table-plus datatable-nosort">Id</th>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>start at  </th>
                                    <th>end at  </th>
                                    <th>Status</th>
                                    <th className="datatable-nosort">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {dispaly_Categorydata}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </body>
    );
}

export default RoomsLogin;
