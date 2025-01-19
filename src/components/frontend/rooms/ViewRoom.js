import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Footer from "../../../layouts/superadmin/Footer";
import LeftSidebar from "../../../layouts/admin/LeftSidebar";
import Navbar from "../../../layouts/superadmin/Navbar";
import swal from "sweetalert";



function ViewRoom() {

    const [loading, setLoading] = useState([true]);
    const [ViewRoom, setRoom] = useState([]);
    const [refresh, forceUpdate] = useState();
    const [PayementId, SetPayementId] = useState();
    const [Payementidd, SetPayementidd] = useState();
    const [nbFile, Setnbfile] = useState();
    const [currentuser, setcurrentUser] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('/api/getCurrentUser')
            .then(response => {
                setcurrentUser(response.data.user);
                //console.log("current user");
                //console.log(response.data.user);
            })
            .catch(error => {
                console.log(error);
            });
        document.title = "List of Queue";
        axios.get(`/api/allrooms`).then(res => {
            if (res.data.status === 200) {
                //setRoom(res.data.rooms);
                //setLoading(false);
                console.log(res.data.rooms);
            }

        });
        axios.get(`/api/allroomsbyuser`).then(res => {
            if (res.data.status === 200) {
                setRoom(res.data.rooms);
                setLoading(false);
                //console.log(res.data.rooms);
            }
        });
        axios.get('/api/allPayements')
            .then(response => {
                SetPayementId(response.data.payements[0].user_id);
                Setnbfile(response.data.payements[0].nb_services);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);

    const IncrementPayement = () => {
        axios.post(`/api/plusPayement/${PayementId}`)
            .then((res) => {
                if (res.data.status === 200) {
                    // Reset successful
                    console.log('+');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteRoom = (id) => {

        axios.delete(`/api/room/${id}`)
            .then((res) => {
                swal("Succes", res.data.message, "success");
                forceUpdate(Math.random());
            })
            .catch((error) => {
                console.log(error);
                //forceUpdate(Math.random())
            });
    };

    var dispaly_Roomdata = "";
    if (loading) {
        return <div className="pre-loader">
            <div className="pre-loader-box">
                <div className="loader-logo"><img src="vendors/images/deskapp-logo.svg" alt /></div>
                <div className="loader-progress" id="progress_div">
                    <div className="bar" id="bar1" />
                </div>
                <div className="percent" id="percent1">100%</div>
                <div className="loading-text">
                    Loading...
                </div>
            </div>
        </div>

    }
    else {
        var RoomStatus = '';
        var badgeClass = ''
        dispaly_Roomdata = ViewRoom.map((item) => {
            if (item.active == '0') {
                RoomStatus = 'not available';
                badgeClass = 'badge badge-danger';
            }
            else if (item.active == '1') {
                RoomStatus = 'available';
                badgeClass = 'badge badge-success';
            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td className="table-plus"><img src={`http://localhost:8000/${item.image}`} width={120} height={0} alt={item.name} /></td>
                    <td>{item.service.name}</td>
                    <td>{item.name}</td>
                    <td>{item.start}</td>
                    <td>{item.end}</td>
                    <td><span className={`badge ${badgeClass}`}>{RoomStatus}</span></td>
                    <td>
                        <div className="dropdown">
                            <a className="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle" role="button" data-toggle="dropdown">
                                <i className="dw dw-more" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">


                                {nbFile !== 0 && currentuser.id === PayementId ? (
                                    <Link to={`/AddReservationAdmin/${item.service.category.id}/${item.service.id}/${item.id}`} className="dropdown-item" ><i className="dw dw-edit1" /> Booking planning</Link>
                                ) : nbFile === 0 ? (
                                    <Link onClick={() => swal({ title: "You must pay for your rooms", text: "Click below to navigate to the payment page", icon: "warning", buttons: ["Cancel", "Pay"], }).then((willPay) => { if (willPay) { navigate(`/ProfilAdmin/${currentuser.id}`); } })} className="dropdown-item" ><i className="dw dw-edit1" /> Booking planning</Link>
                                ) : (
                                    <Link onClick={() => swal({ title: "You must pay for your rooms", text: "Click below to navigate to the payment page", icon: "warning", buttons: ["Cancel", "Pay"], }).then((willPay) => { if (willPay) { navigate(`/ProfilAdmin/${currentuser.id}`); } })} className="dropdown-item" ><i className="dw dw-edit1" /> Booking planning</Link>
                                )}

                                {/* <Link to={`/AddReservationAdmin/${item.service.category.id}/${item.service.id}/${item.id}`} className="dropdown-item" ><i className="dw dw-edit1" /> Booking planning</Link> */}
                                <Link to={`/editroom/${item.id}`} className="dropdown-item"><i className="dw dw-edit2" /> Edit</Link>
                                <Link className="dropdown-item" onClick={() => swal({
                                    title: "Are you sure?",
                                    text: "You wanna delete this Room",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            deleteRoom(item.id)
                                            IncrementPayement()
                                        } else {
                                            // swal("Your imaginary file is safe!");
                                        }
                                    })}><i className="dw dw-delete-3" /> Delete</Link>
                            </div>
                        </div>

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


                    <div className="pd-20 card-box mb-30">
                        <div className="clearfix">
                            <div className="pull-left">
                                <h4 className="text-blue h4">List of Queue</h4>
                            </div>
                        </div>
                        <table className="data-table table nowrap">
                            <thead>
                                <tr>
                                    <th className="table-plus datatable-nosort">Id</th>
                                    <th>Photo</th>
                                    <th>Service Name</th>
                                    <th>Queue Name</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Status</th>
                                    <th className="datatable-nosort">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {dispaly_Roomdata}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </body>
    );
}

export default ViewRoom;
