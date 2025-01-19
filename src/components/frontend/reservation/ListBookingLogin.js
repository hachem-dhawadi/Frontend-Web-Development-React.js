import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Footer from "../../../layouts/superadmin/Footer";
import LeftSidebar from "../../../layouts/Client/LeftSidebar";
import Navbar from "../../../layouts/superadmin/Navbar";
import swal from "sweetalert";
import jsPDF from 'jspdf';
import QRious from 'qrious';



function ListBookingLogin() {

    const [loading, setLoading] = useState([true]);
    const [ViewCategory, setCategory] = useState([]);
    const [ViewUsers, setUsers] = useState([]);
    const [refresh, forceUpdate] = useState();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {

        document.title = "List of booking";

        axios.get(`/api/reservations`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.reservations);
                setLoading(false);
                //console.log(res.data.reservations);
            }
        });

    }, [refresh]);

    const filteredcategory = ViewCategory.filter((cat) =>
        cat.date.includes(searchQuery)
    );

    const handleButtonClick = (place) => {
        const formattedLocation = encodeURIComponent(place);
        const url = `https://www.google.com/maps?q=${formattedLocation}`;
        window.open(url, '_blank');
    };

    const ResetReservation = (id) => {
        axios.post(`/api/ResetReservation/${id}`)
            .then((res) => {
                if (res.data.status === 200) {
                    // Reset successful
                    console.log(res.data.reservations);
                    forceUpdate(Math.random())
                } else {
                    // Handle error response
                    console.log('ggg');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const CheckUsers = (roo, rr) => {
        axios.get(`/api/getReservationsByRoomIdWithDateNewest/${roo}/${rr}`)
            .then((res) => {
                if (res.data.status === 200) {
                    // Reset successful
                    console.log(res.data.reservations);
                    setUsers(res.data.reservations);
                    forceUpdate(Math.random())
                } else {
                    // Handle error response
                    console.log('res');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function generateInvoice(ResId, CatName, SerName, RoName, ClName, ClCin, ClPhone, ResNot, ResDate, ResCre) {
        const doc = new jsPDF({
            unit: 'mm',
            format: [150, 150] // Set the A4 paper size
        });

        // Set the font size and type for the invoice
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');

        // Add the header to the invoice
        doc.text(`E-SAFF APP`, 75, 15, 'center');
        doc.text(`Ticket N° ${ResId}`, 75, 30, 'center');
        doc.line(0, 35, 200, 35);

        // Add the client details to the invoice
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Category: ${CatName}`, 10, 45);
        doc.text(`Service: ${SerName}`, 10, 50);
        doc.text(`Room: ${RoName}`, 10, 55);

        doc.text(`Name: ${ClName}`, 110, 45);
        doc.text(`Cin: ${ClCin}`, 110, 50);
        doc.text(`Phone: ${ClPhone}`, 110, 55);



        // Generate the QR code image
        const qr = new QRious({
            value: `https://example.com/ticket/${ResId}`, // The URL you want to encode
            size: 50 // The size of the QR code image
        });
        const qrImgData = qr.toDataURL(); // Convert the QR code to a data URL

        // Add the QR code image to the invoice
        doc.addImage(qrImgData, 'JPEG', 55, 65, 40, 40);


        // Add the reservation details to the invoice
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`Notification : ${ResNot}`, 80, 125);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`Date Réservation : ${ResDate}`, 80, 130);
        doc.line(0, 135, 200, 135);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`Date céation: ${ResCre}`, 70, 142);



        // Save the document
        doc.save(`tikcet_${ClName}.pdf`);
    }
    var dispaly_Usersdata = "";
    var dispaly_Categorydata = "";
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

        var ClientStatus = '';
        var badgeClass = ''
        var dispaly_Usersdata = ViewUsers.map((item) => {
            if (item.Newrepetition == null) {
                ClientStatus = 'Done';
                badgeClass = 'badge badge-success';
            }
            else if (item.Newrepetition == -1) {
                ClientStatus = 'In progress';
                badgeClass = 'badge badge-secondary';
            } else {
                ClientStatus = 'Still waiting';
                badgeClass = 'badge badge-danger';
            }
            return (
                <tr key={item.id}>
                    <td> <i class="icon-copy dw dw-user1"></i></td>
                    <td> {item.id} </td>
                    <td> {item.date} </td>
                    <td ><h6><span className={`badge ${badgeClass}`}>{ClientStatus}</span></h6> </td>
                </tr>
            )
        });
        dispaly_Categorydata = filteredcategory.map((item) => {
            return (

                <tr key={item.id}>

                    <td>{item.room.service.category.name}</td>
                    <td>{item.room.service.name}</td>
                    <td>{item.room.name}</td>
                    <td>{item.date}</td>
                    <td>{item.notification}</td>
                    <td>
                        <div>{item.room.service.adresse}</div>
                        <div>
                            <Link onClick={() => handleButtonClick(item.room.service.adresse)}>
                                <i className="icon-copy dw dw-pin-1" />
                                Click to Open in GoogleMap
                            </Link>
                        </div>
                    </td>


                    <td>
                        <div className="dropdown">
                            <a className="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle" role="button" data-toggle="dropdown">
                                <i className="dw dw-more" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                                <Link className="dropdown-item" onClick={() => swal({
                                    title: "Are you sure?",
                                    text: `You wanna cancel réservation of ${item.room.service.name} at ${item.date}`,
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            ResetReservation(item.id)
                                        } else {
                                            // swal("Your imaginary file is safe!");
                                        }
                                    })}><i class="icon-copy dw dw-cancel"></i> Cancel booking</Link>
                                <Link className="dropdown-item" data-toggle="modal" data-target="#exampleModal" onClick={() => CheckUsers(item.room.id, item.id)}><i class="icon-copy dw dw-user-3" ></i> Check your turn</Link>
                                <Link className="dropdown-item" onClick={() => generateInvoice(item.id, item.room.service.category.name, item.room.service.name, item.room.name, item.client.name, item.client.cin, item.client.phone, item.notification, item.date, item.created_at)} ><i class="icon-copy fa fa-download" aria-hidden="true"></i> Download Ticket</Link>

                            </div>
                        </div>
                    </td>
                </tr>
            )
        });

        var dispaly_user_res = ViewCategory.map((item) => {
            if (item.Newrepetition == null) {
                ClientStatus = 'Done';
                badgeClass = 'badge badge-success';
            }
            else if (item.Newrepetition == -1) {
                ClientStatus = 'on progress';
                badgeClass = 'badge badge-secondary';
            } else {
                ClientStatus = 'Still waiting';
                badgeClass = 'badge badge-danger';
            }
            return (
                <tr key={item.id}>
                    <td><i class="icon-copy dw dw-checked"></i> </td>
                    {/* <td className="table-plus"><img src={`http://localhost:8000/${item.client.image}`} width={60} height={60} alt={item.name} /></td> */}
                    <td> {item.id} </td>
                    <td> {item.date} </td>
                    <td ><h6><span className={`badge ${badgeClass}`}>{ClientStatus}</span></h6> </td>
                </tr>
            )
        });
    }





    return (

        <body>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Your turn is coming soon (Estimated time) : </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">User</th>
                                        <th scope="col">Ticket N°</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Statu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dispaly_Usersdata}
                                    {dispaly_user_res}

                                </tbody>
                            </table>
                        </div>
                        {/* <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div> */}
                    </div>
                </div>
            </div>
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
                                <h4 className="text-blue h4">My list of booking</h4>
                            </div>
                        </div>
                        <h2 className="h4 pd-5"><input type="text" className="form-control search-input" placeholder="Search Here By date of booking   yyyy-mm-dd hh:mm:ss" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></h2>


                        <table className="data-table table nowrap">
                            <thead>
                                <tr>

                                    <th>Category</th>
                                    <th>Service</th>
                                    <th>Queue</th>
                                    <th>Date of booking</th>
                                    <th>Notification</th>
                                    <th>Location</th>
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

export default ListBookingLogin;
