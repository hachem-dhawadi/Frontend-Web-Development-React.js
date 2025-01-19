import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../../../layouts/superadmin/Footer";
import LeftSidebar from "../../../layouts/counter-clerk/LeftSidebar";
import Navbar from "../../../layouts/superadmin/Navbar";
import { useParams } from "react-router-dom";
import jsPDF from 'jspdf';
import QRious from 'qrious';
import Swal from 'sweetalert2';

function AddReservation() {

    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [userlist, setUserlist] = useState([]);
    const [categorylist, setCategorylist] = useState([]);//categorylist
    const [errorlist, setError] = useState([]);
    const { categoryId, serviceId, roomId } = useParams();
    const [currentuser, setcurrentUser] = useState([]);
    const [ViewRoom, setRoom] = useState([]);
    const [ServiceList, setServiceList] = useState([]);
    const [refresh, forceUpdate] = useState();
    const [Succes, SetSucces] = useState();
    const [nbRepetition, SetnbnbRepetition] = useState();
    let timerInterval;


    const [RoomUpdateInput, setRoomUpdate] = useState({
        date: '',
        notification: '',
    });

    const [TimeInput, setTimeU] = useState({
        time: '',
    });
    const handleSetTimeInput = (e) => {
        e.persist();
        setTimeU({ ...TimeInput, [e.target.name]: e.target.value });
    }

    const [serviceInput, setService] = useState({
        category_id: '',
        service_id: '',
        room_id: '',
        date: '',
        Newrepetition: '',
        timeDiff: '',
    });

    const [picture, setPicture] = useState([]);
    const [allcheckbox, setCheckboxes] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setService({ ...serviceInput, [e.target.name]: e.target.value });
    }
    const handleUpdateInput = (e) => {
        e.persist();
        setRoomUpdate({ ...RoomUpdateInput, [e.target.name]: e.target.value });
    }
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }
    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
    }
    const handleLocationChange = (event) => {
        setService(prevState => ({ ...prevState, location: event.target.value, }));
    };



    useEffect(() => {

        document.title = "Booking planning";
        axios.get('/api/getCurrentUser')
            .then(response => {
                setcurrentUser(response.data.user);
                //console.log(response.data.user);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`/api/getReservationsByRoomIdForP/${roomId}`).then(res => {
            if (res.data.status === 200) {
                setRoom(res.data.reservations);
                setService(res.data.reservations);
                setLoading(false);
                console.log("reservations");
                console.log(res.data.reservations);
            }

        });

    }, [refresh]);

    const deleteReservation = (id) => {
        axios.delete(`/api/reservations/${id}`)
            .then((res) => {
                swal("Succes", res.data.message, "success");
                forceUpdate(Math.random())
            })
            .catch((error) => {
                console.log(error);
                forceUpdate(Math.random())
            });
    };

    const EndToNextClientReservation = (id) => {
        axios.post(`/api/EndToNextClientReservation/${id}`)
            .then((res) => {
                swal("Succes", res.data.message, "success");
                forceUpdate(Math.random())
            })
            .catch((error) => {
                console.log(error);
                forceUpdate(Math.random())
            });
    };

    const ReservationInProgress = (id) => {
        axios.post(`/api/ReservationInProgress/${id}`)
            .then((res) => {
                swal("Succes", res.data.message, "success");
                forceUpdate(Math.random())
            })
            .catch((error) => {
                console.log(error);
                forceUpdate(Math.random())
            });
    };

    const SetTiming = (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(TimeInput.time);
        formData.append('time', TimeInput.time);
        axios.get('/sanctum/csrf-cookie').then((response) => {
            axios.post(`/api/SetTiming`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                if (res.data.status === 200) {
                    //swal('Success', res.data.message, 'success');
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
        
                    Toast.fire({
                        icon: 'success',
                        title: `Reservation date updated successfully + ${TimeInput.time}`
                    })
                    forceUpdate(Math.random());
                    setError([]);
                    
                }  else if (res.data.status === 422) {
                    swal('Time Field is mandatory', '', 'error');
                    setError(res.data.errors);
                }
                TimeInput.time = '';
            });
        });

    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const calculateDateValue = (dateString, repetitionIndex) => {
        //const timediff = '00:15:00'; // Time difference to add
        const timediff = serviceInput.timeDiff; // Time difference to add
        const date = new Date(dateString);
        const timeParts = timediff.split(':');
        const hoursDiff = parseInt(timeParts[0]);
        const minutesDiff = parseInt(timeParts[1]);
        const secondsDiff = parseInt(timeParts[2]);

        const newDate = new Date(
            date.getTime() +
            repetitionIndex * (hoursDiff * 3600000 + minutesDiff * 60000 + secondsDiff * 1000)
        );

        const formattedDate = formatDate(newDate);
        return formattedDate;
    };


    const submitService = (e) => {
        const repetition = serviceInput.Newrepetition; 

        for (let i = 0; i < repetition; i++) {
            e.preventDefault();

            const formData = new FormData();
            formData.append('category_id', categoryId);
            formData.append('service_id', serviceId);
            formData.append('room_id', roomId);
            formData.append('worker_id', currentuser.id);
            formData.append('Newrepetition', serviceInput.Newrepetition);
            formData.append('timeDiff', serviceInput.timeDiff);
            formData.append('notification', '00:00:00');


            const dateValue = calculateDateValue(serviceInput.date, i);
            formData.append('date', dateValue);

            axios.get('/sanctum/csrf-cookie').then((response) => {
                axios.post(`/api/store-reservation`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then((res) => {
                    if (res.data.status === 200) {
                        //swal('Success', res.data.message, 'success');
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'success',
                            title: 'Reservation added successfully'
                        })
                        SetSucces(res.data.message);
                        forceUpdate(Math.random());
                        setError([]);
                        navigate(`/AddReservationAdmin/${categoryId}/${serviceId}/${roomId}`)
                    } else if (res.data.status === 400) {
                        swal('Warning', res.data.errors, 'warning');
                        setError(res.data.errors);
                    } else if (res.data.status === 422) {
                        swal('Date Field is mandatory', '', 'error');
                        setError(res.data.errors);
                    }
                    serviceInput.Newrepetition = '';
                    serviceInput.timeDiff = '';
                    serviceInput.date = '';
                });
            });
        }

    };



    const ResetReservation = (id) => {
        axios.post(`/api/ResetReservation/${id}`)
            .then((res) => {
                if (res.data.status === 200) {
                    console.log(res.data.message);
                    forceUpdate(Math.random())
                } else {
                    console.log(res.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };



    const UpdateReservation = (e, id) => {
        e.preventDefault();
        console.log(RoomUpdateInput.date);

        const formData = new FormData();
        formData.append('date', RoomUpdateInput.date);

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/UpdateReservation/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => {
                if (res.data.status === 200) {
                    //console.log(allcheckbox);
                    swal("Succes", res.data.message, "success");
                    forceUpdate(Math.random());
                    setError([]);
                    //navigate('/viewservices');
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





    function generateInvoice(ResId, CatName, SerName, RoName, ClName, ClCin, ClPhone, ResNot, ResDate, ResCre) {
        const doc = new jsPDF({
            unit: 'mm',
            format: [150, 150] 
        });

    
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');

       
        doc.text(`E-SAFF APP`, 75, 15, 'center');
        doc.text(`Ticket N° ${ResId}`, 75, 30, 'center');
        doc.line(0, 35, 200, 35);

       
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Category: ${CatName}`, 10, 45);
        doc.text(`Service: ${SerName}`, 10, 50);
        doc.text(`Room: ${RoName}`, 10, 55);

        doc.text(`Name: ${ClName}`, 110, 45);
        doc.text(`Cin: ${ClCin}`, 110, 50);
        doc.text(`Phone: ${ClPhone}`, 110, 55);



       
        const qr = new QRious({
            value: `https://example.com/ticket/${ResId}`, 
            size: 50 
        });
        const qrImgData = qr.toDataURL(); 

     
        doc.addImage(qrImgData, 'JPEG', 55, 65, 40, 40);


        
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



      
        doc.save(`tikcet_${ClName}.pdf`);
    }




    var dispaly_Roomdata = "";
    if (loading) {
        return <div className="pre-loader">
            <div className="pre-loader-box">
                {/* <div className="loader-logo"><img src="vendors/images/deskapp-logo.svg" alt /></div> */}
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
        var inprogress = '';
        var cancelbooking = '';
        var gg = '';
        var ticket = '';
        var NameStatus = '';
        var CinStatus = '';
        var PhoneStatus = '';
        var badgeClass = '';
        var msg = '';
        var ClientStatus = '';
        var ClientColor = '';
        dispaly_Roomdata = ViewRoom.map((item) => {
            if (item.user_id == null) {
                NameStatus = '*******';
                CinStatus = '*******';
                PhoneStatus = '*******';
                msg = 'Still Unpicked';
                badgeClass = 'badge badge-danger';
                ticket = '';
                cancelbooking = '';
                gg = '';
                inprogress = '';
                ClientStatus = '**********';
                ClientColor = 'badge badge-danger';
            } else {
                if (item.Newrepetition == null) {
                    ClientStatus = 'Done';
                    ClientColor = 'badge badge-success';
                }
                else if (item.Newrepetition == -1) {
                    ClientStatus = 'In progress';
                    ClientColor = 'badge badge-secondary';
                } else {
                    ClientStatus = 'Still waiting';
                    ClientColor = 'badge badge-danger';
                }
                NameStatus = item.client.name;
                CinStatus = item.client.cin;
                PhoneStatus = item.client.phone;
                msg = 'Already picked';
                badgeClass = 'badge badge-success';
                ticket = <a className="dropdown-item" onClick={() => generateInvoice(item.id, item.room.service.category.name, item.room.service.name, item.room.name, item.client.name, item.client.cin, item.client.phone, item.notification, item.date, item.created_at)}><i class="icon-copy fa fa-ticket" aria-hidden="true"></i> Ticket</a>
                cancelbooking = <Link className="dropdown-item" onClick={() => swal({
                    title: "Are you sure?",
                    text: `You wanna cancel this réservation for the client ${item.client.name} `,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            ResetReservation(item.id)
                            // cancel reesrvation
                        } else {
                            // swal("Your imaginary file is safe!");
                        }
                    })}><i class="icon-copy dw dw-cancel"></i> Cancel booking</Link>
                gg = <Link className="dropdown-item" onClick={() => swal({
                    title: "Are you sure?",
                    text: `You wanna cancel this réservation for the client ${item.client.name} `,
                    icon: "info",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            EndToNextClientReservation(item.id)
                        } else {
                            // swal("Your imaginary file is safe!");
                        }
                    })}><i class="icon-copy dw dw-like"></i>Complete</Link>
                inprogress = <Link className="dropdown-item" onClick={() => swal({
                    title: "Are you sure?",
                    text: `you want to start the reservation with the client ${item.client.name} at ${item.date}`,
                    icon: "info",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            ReservationInProgress(item.id)
                        } else {
                            // swal("Your imaginary file is safe!");
                        }
                    })}> <i class="icon-copy dw dw-chat-3"></i>In progress</Link>

            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{NameStatus}</td>
                    <td>{CinStatus}</td>
                    <td>{PhoneStatus}</td>
                    <td>{item.notification}</td>
                    <td>{item.date}</td>
                    <td>{item.created_at}</td>
                    <td><span className={`badge ${badgeClass}`}>{msg}</span></td>
                    {/* <td ><h6><span className={`badge ${ClientColor}`}>{ClientStatus}</span></h6> </td> */}
                    <td ><span className={`badge ${ClientColor}`}>{ClientStatus}</span> </td>


                    <td>
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Update Reservation</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div className="form-group">
                                            <label>Old date</label>
                                            <p>{item.date}</p>
                                        </div>
                                        <div className="form-group">
                                            <label>New date</label>
                                            <input name="date" onChange={handleUpdateInput} value={RoomUpdateInput.date} className="form-control" placeholder="Choose Date and time" type="datetime-local" />
                                        </div>
                                        <p class="text-danger">{errorlist.date}</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" onClick={(e) => UpdateReservation(e, item.id)}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="dropdown">
                            <a className="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle" role="button" data-toggle="dropdown">
                                <i className="dw dw-more" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                                <button type="button" className="dropdown-item" data-toggle="modal" data-target="#exampleModal">
                                    <i class="icon-copy dw dw-refresh1"></i> Update reservation
                                </button>
                                {cancelbooking}
                                {ticket}
                                {gg}
                                {inprogress}
                                <Link className="dropdown-item" onClick={() => swal({
                                    title: "Are you sure?",
                                    text: `You wanna delete this réservation , date :  ${item.date} `,
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            deleteReservation(item.id)
                                        } else {
                                            // swal("Your imaginary file is safe!");
                                        }
                                    })}><i class="icon-copy dw dw-delete-3"></i>Delete</Link>
                            </div>
                        </div>


                        <div class="modal fade" id="timeset" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Reset reservation timing </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div className="form-group">
                                            <label>Update all reservation date</label>
                                            <input name="time" onChange={handleSetTimeInput} value={TimeInput.time} className="form-control" placeholder="hh:mm:ss" type="text" />
                                        </div>
                                        <p class="text-danger">{errorlist.time}</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" onClick={(e) => SetTiming(e)} class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </td>
                </tr>
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
                                <input type="radio" id="sidebariconlist-3" name="menu-list-icon" clasx sName="custom-control-input" defaultValue="icon-list-style-3" />
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
                                            <li className="breadcrumb-item"><Link to="/WorkList">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Add reservation</li>
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
                        </div>
                        {/* horizontal Basic Forms Start */}
                        <div className="pd-20 card-box mb-30">
                            <div className="clearfix">
                                <div className="pull-left">
                                    <h4 className="text-blue h4">Planning time
                                    </h4>

                                </div>
                            </div>
                            <form onSubmit={submitService}>
                                <br />

                                <div className="form-group row">
                                    <label className="col-sm-12 col-md-2 col-form-label">Date</label>
                                    <div className="col-sm-12 col-md-10">
                                        <input name="date" onChange={handleInput} value={serviceInput.date} className="form-control" placeholder="Choose Date and time" type="datetime-local" />
                                    </div>
                                </div>
                                <p class="text-danger">{errorlist.date}</p>
                                <div className="form-group row">
                                    <label className="col-sm-12 col-md-2 col-form-label">Time Difference</label>
                                    <div className="col-sm-12 col-md-10">
                                        <input
                                            name="timeDiff"
                                            onChange={handleInput}
                                            value={serviceInput.timeDiff}
                                            className="form-control"
                                            placeholder="hh:mm:ss"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <p class="text-danger">{errorlist.timeDiff}</p>


                                {/* <div className="form-group row">
                                        <label className="col-sm-12 col-md-2 col-form-label">Time Difference</label>
                                        <div className="col-sm-12 col-md-10">
                                            <input
                                                name="timeDiff"
                                                onChange={handleInput}
                                                value={serviceInput.timeDiff}
                                                className="form-control"
                                                placeholder="hh:mm:ss"
                                                type="text"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-12 col-md-2 col-form-label">nb reservation</label>
                                        <div className="col-sm-12 col-md-10">
                                            <input name="Newrepetition" onChange={handleInput} value={serviceInput.Newrepetition} className="form-control" placeholder="Choose Date and time" type="number" min={1} />
                                        </div>
                                    </div> */}
                                <div className="form-group row">
                                    <label className="col-sm-12 col-md-2 col-form-label">Reservation number</label>
                                    <div className="col-sm-12 col-md-10">
                                        <input name="Newrepetition" onChange={handleInput} value={serviceInput.Newrepetition} className="form-control" placeholder="Write how many reservationou want to make" type="number" min={1} />
                                    </div>
                                </div>
                                <p class="text-danger">{errorlist.Newrepetition}</p>

                                {/* || typeof serviceInput.Newrepetition === 'undefined' || typeof serviceInput.date === 'undefined' */}

                                <div className="form-group mb-0">
                                    {navigator.onLine ? (
                                        (serviceInput.Newrepetition < 1 || typeof serviceInput.Newrepetition === 'undefined' || typeof serviceInput.timeDiff === 'undefined') ? (
                                            <button type="button" class="btn btn-primary btn-block btn-lg" onClick={() => swal("You must pick a number more than 0 , time difference and a date to store you reservation", "", "warning")} > Add </button>
                                        ) : (
                                            <button onClick={(e) => submitService(e)} class="btn btn-primary btn-block btn-lg">Add</button>
                                        )
                                    ) : (
                                        <button disabled class="btn btn-primary btn-block btn-lg">Add 3</button>
                                    )}
                                </div>


                                {/* <button type="button" class="btn btn-primary btn-block btn-lg" onClick={(e) => submitService(e)} > Add </button> */}



                            </form>
                            <div className="pd-20 card-box mb-30">
                                <div className="clearfix">
                                    <div className="pull-left">
                                        <h4 className="text-blue h4">List of Reservation &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <a className="btn btn-secondary" href="#" role="button" data-toggle="modal" data-target="#" onClick={ ()=>
                                        
                                        Swal.fire({
                                          title: 'Check reservation status',
                                          html: 'Refreshing data in <b></b> milliseconds.',
                                          timer: 1000,
                                          timerProgressBar: true,
                                          didOpen: () => {
                                            Swal.showLoading()
                                            const b = Swal.getHtmlContainer().querySelector('b')
                                            timerInterval = setInterval(() => {
                                              b.textContent = Swal.getTimerLeft()
                                            }, 100)
                                            forceUpdate(Math.random())
                                          },
                                          willClose: () => {
                                            clearInterval(timerInterval)
                                          }
                                        }).then((result) => {
                                          /* Read more about handling dismissals below */
                                          if (result.dismiss === Swal.DismissReason.timer) {
                                            console.log('I was closed by the timer')
                                          }
                                        })
                                        }>
                                        <i class="icon-copy dw dw-refresh1"></i> Refresh
                                            </a>&nbsp;&nbsp;
                                            <a className="btn btn-secondary" href="#" role="button" data-toggle="modal" data-target="#timeset" >
                                                <i class="icon-copy dw dw-time-management"></i> configure delays
                                            </a> </h4>
                                    </div>
                                </div>
                                <table className="data-table table nowrap">
                                    <thead>
                                        <tr>
                                            <th className="table-plus datatable-nosort">Id room</th>
                                            <th>Name</th>
                                            <th>Cin</th>
                                            <th>Phone</th>
                                            <th>Notification</th>
                                            <th>Date</th>
                                            <th>Created_at</th>
                                            <th>Ticket status</th>
                                            <th>Client status</th>
                                            <th className="datatable-nosort">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {dispaly_Roomdata}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        {/* horizontal Basic Forms End */}
                    </div>

                    <Footer />
                </div>
            </div>
        </div>




    );
}

export default AddReservation;