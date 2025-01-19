import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useParams, useNavigate, Buttons } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import swal from "sweetalert";
import Footer from "../superadmin/Footer";
import LeftSidebar from "../admin/LeftSidebar";
import Navbar from "../superadmin/Navbar";
import ReactDOM from "react-dom";
import jsPDF from 'jspdf';
import QRious from 'qrious';
import 'jspdf-autotable';



function ProfilAdmin(props) {

    const navigate = useNavigate();
    const [userlist, setUserlist] = useState([]);//categorylist
    const [paymenetlist, setPayementlist] = useState([]);
    const [errorlist, setError] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [currentuser, setcurrentUser] = useState([]);
    const [idupdate, setidupdate] = useState([]);
    const [activeupdate, setactiveupdate] = useState([]);
    const [job, setJobs] = useState([]);
    const [roomid, setroomJobs] = useState([]);
    const [jobid, setJobsid] = useState([]);
    const [jobEmail, setJobEmail] = useState([]);
    const [ViewCategory, setCategory] = useState([]);
    const [pdf, setPdf] = useState(null);
    const [showFile, setShowFile] = useState(false);
    const [fileUrl, setFileUrl] = useState([]);
    const [Money, setTotalMoney] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [file, setFile] = useState([]);
    const [numeroTransaction, setnumeroTransaction] = useState();
    const [adreesLine, setadreesLine] = useState();
    const [adminArea, setadminArea] = useState();
    const [createDateTime, setcreateDateTime] = useState();
    const [refresh, forceUpdate] = useState();


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

    const handleOnlineStatusChange = () => {
        setIsOnline(navigator.onLine);
    };

    useEffect(() => {
        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);

        return () => {
            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };
    }, []);




    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        return randomString;
    }
    function generateRandomNumbers(length) {
        const characters = '0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        return randomString;
    }

    const currency = "EUR";

    const [roomInput, setRoom] = useState({
        sender_id: '',
        service_id: '',
        description: '',
    });

    const [payementInput, setPayement] = useState({
        adresse: '',
        date: '',
        code: '',
        nb_services: '',
    });

    const handlePayementInput = (e) => {
        e.persist();
        setPayement({ ...payementInput, [e.target.name]: e.target.value });
    }
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
    const handlePdf = (e) => {
        setPdf(e.target.files[0]);
    }

    const [count, setCount] = useState(0);

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleIncrement = () => {
        setCount(count + 1);
    };

    useEffect(() => {
        setCurrentCount(count);
    }, [count]);

    const calculateTotal = () => {
        return count * 200;
    };

    const totalInEuro = calculateTotal() / 3.2; // Fetch the total in a variable


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
                //setCheckboxes(response.data.jobs);
                //console.log("rooooom id");
                //console.log(response.data.jobs[0].room.id);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('/api/allPayements')
            .then(response => {
                setPayementlist(response.data.payements);
                console.log(response.data.payements);
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

        setLoading(false);
    }, [refresh]);

    const handleJobClick = (id) => {

        axios.get(`/api/jobbyid/${id}`)
            .then(response => {
                setJobsid(response.data.job)
                setJobEmail(response.data.job.user.email)
                setidupdate(id);
                setactiveupdate(response.data.job.active);
                //setCheckboxes(response.data.job);
                setroomJobs(response.data.job.room.id)
                //console.log(response.data.job.room.id);
                //console.log(allcheckbox);
                //console.log(response.data.job);
                setFileUrl(`http://localhost:8000/${response.data.job.file}`);
                forceUpdate(Math.random());
            })
            .catch(error => {
                console.log(error);
            });
    }

    const ChangePassword = (e) => {
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
                navigate('/ProfilAdmin');
                setError([]);
                forceUpdate(Math.random());
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


    
    const sendemailJob = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', jobEmail);

        axios.post(`/api/sendemailJob`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(res => {
            if (res.data.status === 200) {
                setError([]);
                forceUpdate(Math.random());
            } else if (res.data.status === 422) {
                console.log("validation fails")
            }
        });

    };


    const updateService = (e) => {
        e.preventDefault();

        const formData = new FormData();
        //formData.append('active', allcheckbox.active ? '1' : '0');
        formData.append('room_id', roomid);
        formData.append('sender_id', jobid.sender_id);
        formData.append('reciver_id', jobid.reciver_id);
        formData.append('description', jobid.description);
        formData.append('file', jobid.file);
        formData.append('active', allcheckbox.active ? '1' : '0');
        formData.append('gnot', allcheckbox.gnot ? '0' : '1');
        formData.append('anot', jobid.anot);

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/update-job/${idupdate}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => {
                if (res.data.status === 200) {
                    console.log("check boxex");
                    console.log(allcheckbox);
                    swal("Succes", res.data.message, "success");
                    setError([]);
                    //navigate('/ViewEmployees');
                    sendemailJob(e);
                    forceUpdate(Math.random());
                }
                else if (res.data.status === 422) {
                    console.log("files are mendontry");
                    swal("All Fields are mendentory", "", "error");
                    setError(res.data.errors);
                }
                else if (res.data.status === 404) {
                    console.log("problme");
                    swal("Error", res.data.message, "error");
                }
            });
        });
    }

    function generateCodeInvoice(dd,nn,aa,ma) {
        const doc = new jsPDF({
            unit: 'mm',
            //format: [150, 150] // Set the A4 paper size
        });

        doc.setFontSize(15);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 255);
        // Add the header to the invoice
        doc.text(`PayPal`, 22, 20, 'center');
        //doc.text(`PaypPal payement`, 41, 15, 'center');
        doc.setTextColor(0, 0, 0);

        doc.setFontSize(9);
        doc.text(`Date paiement : ${dd}`, 168, 17, 'center');
        doc.text(`Nº de transaction : ${nn}`, 175, 23, 'center');

        //Acheteure
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal', 'bold');
        doc.text(`Acheteur`, 15, 45);
        doc.setFont('helvetica', 'normal');
        doc.text(`${currentuser.name}`, 15, 50);
        doc.text(`${currentuser.email}`, 15, 55);
        //Adreese
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal', 'bold');
        doc.text(`Adresse de livraison : `, 15, 65);
        doc.setTextColor(0, 128, 0);
        doc.text(`confirmée`, 52, 65);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.text(`${aa} ,${ma}`, 15, 70);
        //insstruction
        doc.setFont('helvetica', 'normal', 'bold');
        doc.text(`Instructions au marchand`, 115, 45);
        doc.setFont('helvetica', 'normal');
        doc.text(`L'acheteur n'a pas saisi d'instructions.`, 115, 50);
        //Demarche
        doc.setFont('helvetica', 'normal', 'bold');
        doc.text(`Informations de livraison`, 115, 65);
        doc.setFont('helvetica', 'normal');
        doc.text(`Vous n'avez pas saisi de détails concernant l'expédition\n et la livraison.`, 115, 70);


        const data = [
            { description: "", unitPrice: `$${totalInEuro} USD`, quantity: 1, amount: `$${totalInEuro} USD` },
            { description: "", unitPrice: "", quantity: "Sous-total\nTotal\n", amount:`$${totalInEuro} USD\n$${totalInEuro} USD\n`},
            { description: "", unitPrice: "", quantity: "Paiement", amount: `$${totalInEuro} USD` },
            { description: "Paiement envoyé à superadmin@business.com" },
        ];

        doc.autoTable({
            head: [['Description', 'Prix unitaire', 'Qte services', 'Montant']],
            body: data.map(({ description, unitPrice, quantity, amount }) => [description, unitPrice, quantity, amount]),
            startY: 90, // Specify the starting position of the table
        });


        // Generate the QR code image
        const qr = new QRious({
            value: `https://developer.paypal.com/dashboard/notifications`, // The URL you want to encode
            size: 80 // The size of the QR code image   
        });
        const qrImgData = qr.toDataURL(); // Convert the QR code to a data URL

        // Add the QR code image to the invoice
        doc.addImage(qrImgData, 'JPEG', 75, 155, 60, 60);

        doc.text(`? Des questions ? Accédez à l'Aide à l'adresse : www.paypal.com/fr/help.`, 15, 230);

        doc.text(`Veuillez ne pas répondre à cet email. Les messages reçus à cette adresse ne sont pas lus et ne reçoivent donc\n aucune réponse. Pour obtenir de l'aide, connectez-vous à votre compte PayPal et cliquez sur Aide en haut à droite\n de chaque page PayPal.`, 15, 240);

        doc.text(`Pour recevoir des notifications par email en texte brut plutôt qu'au format HTML, connectez-vous à votre compte\n PayPal et accédez à vos Préférences pour mettre vos paramètres à jour.`, 15, 260);

        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(`E-SAFF APP`, 183, 285, 'center');
        // Save the document
        doc.save(`payement.pdf`);
        setFile(doc.output('blob')[0]);
        console.log(file);
    }



    const payer = (e, payement_mode) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user_id', currentuser.id);
        formData.append('adresse', payementInput.adresse);
        formData.append('date', payementInput.date);
        formData.append('code', payementInput.code);
        formData.append('payement_mode', payement_mode);
        formData.append('money', totalInEuro);
        formData.append('nb_services', count);
        formData.append('active_plus', 0);
        //generateCodeInvoice();

        const payement_id = generateRandomString(8);
        formData.append('payement_id', payement_id);
        formData.append('file', file);


        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/payer`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => {
                if (res.data.status === 200) {
                    //var myModal = new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
                    //myModal.show()
                    //generateCodeInvoice();
                    swal("Succes", res.data.message, "success");
                    forceUpdate(Math.random());
                }
                else if (res.data.status === 422) {
                    swal("All Fields are mendentory", "", "error");
                    setError(res.data.errors);
                }
            });
        });
    }

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
                    forceUpdate(Math.random());
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
    var dispaly_payement = "";
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
        var UsetStatus = '';
        var badgeClass = '';
        var mode = ''
        dispaly_Categorydata = job.map((item) => {
            if (item.active == '0') {
                UsetStatus = 'Still waiting';
                badgeClass = 'badge badge-secondary';
            }
            else if (item.active == '1') {
                UsetStatus = 'Already accepted';
                badgeClass = 'badge badge-success';
            }
            return (

                <ul>
                    <li>

                        <div className="task-type">Name : {item.user.name}</div>
                        <div className="task-type">Email : {item.user.email}</div>
                        <div className="task-type">Phone : {item.user.phone}</div>
                        <div className={`badge ${badgeClass}`}>{UsetStatus}</div> &thinsp;
                        <Link onClick={() => handleJobClick(item.id)} data-toggle="modal" data-target="#task-add" className="badge badge-primary">
                            <i className="ion-plus-round" />
                            More details
                        </Link>

                    </li>
                </ul>
            )
        });


        dispaly_payement = paymenetlist.map((item) => {
            if (item.payement_mode == 'Code') {
                mode = 'DT';
            }
            else {
                mode = 'USD';
            }
            return (
                <ul>
                    <li>
                        <div className="date">{item.payement_mode}</div>
                        <div className="task-name"><i className="ion-android-alarm-clock" />{item.tracking_no}</div>
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
                                                    <a className="nav-link active" data-toggle="tab" href="#timeline" role="tab">Payment history</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="tab" href="#tasks" role="tab">Employee request</a>
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
                                                                <h5>Historique </h5>
                                                            </div>
                                                            <div className="profile-timeline-list">
                                                                {dispaly_payement}
                                                            </div>

                                                            {/* <button className="btn btn-success" id="reset-settings">Reset Settings</button> */}

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
                                                                    <h5>Workers request </h5>
                                                                </div>

                                                            </div>
                                                            <div className="profile-task-list pb-30">
                                                                {dispaly_Categorydata}

                                                            </div>
                                                            {/* Open Task End */}

                                                            {/* add task popup start */}
                                                            <div className="modal fade customscroll" id="task-add" tabIndex={-1} role="dialog">
                                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title" id="exampleModalLongTitle">Details </h5>
                                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" data-toggle="tooltip" data-placement="bottom" title data-original-title="Close Modal">
                                                                                <span aria-hidden="true">×</span>
                                                                            </button>
                                                                        </div>
                                                                        <div className="modal-body pd-0">
                                                                            <div className="task-list-form">


                                                                                <ul>
                                                                                    <li>

                                                                                        <form onSubmit={updateService}>

                                                                                            <div className="form-group row">
                                                                                                <label className="col-md-4">Description </label>
                                                                                                <div className="col-md-8">
                                                                                                    <p>{jobid.description}</p>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="form-group row mb-0">
                                                                                                <label className="col-md-4">Due Date</label>
                                                                                                <div className="col-md-8">
                                                                                                    <p>{jobid.created_at}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <br></br>

                                                                                            <div className="form-group row mb-0">
                                                                                                <label className="col-md-4">File</label>
                                                                                                <div className="col-md-8">
                                                                                                    {fileUrl ? (
                                                                                                        <a href={fileUrl} target="_blank" rel="noopener noreferrer">Open File</a>
                                                                                                    ) : (
                                                                                                        <p>No file available</p>
                                                                                                    )}
                                                                                                </div>
                                                                                            </div>

                                                                                            <br></br>

                                                                                            <div className="form-group row mb-0">
                                                                                                <label className="col-md-4">Accept</label>
                                                                                                <div className="col-md-8">

                                                                                                    <div className="custom-control custom-checkbox mb-5">
                                                                                                        <input name="active" onChange={handleCheckbox} defaultChecked={allcheckbox.active === 1 ? true : false} type="checkbox" className="custom-control-input" id="task-1" />
                                                                                                        <label className="custom-control-label" htmlFor="task-1" />Yes
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>


                                                                                            <br></br>

                                                                                            <div className="form-group row mb-0">
                                                                                                <label className="col-md-4">Notification</label>
                                                                                                <div className="col-md-8">

                                                                                                    <div className="custom-control custom-checkbox mb-5">
                                                                                                        <input name="gnot" onChange={handleCheckbox} defaultChecked={allcheckbox.gnot === 1 ? true : false} type="checkbox" className="custom-control-input" id="task-2" />
                                                                                                        <label className="custom-control-label" htmlFor="task-2" />Never show me again (Refuse)
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="modal-footer">
                                                                                                <button type="submit" className="btn btn-success" >submit</button>
                                                                                                <button type="button" className="btn btn-danger" data-dismiss="modal">cancel</button>
                                                                                            </div>
                                                                                        </form>

                                                                                    </li>
                                                                                </ul>


                                                                            </div>

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
                                                        <form >
                                                            <ul className="profile-edit-list row">

                                                               {/*  */}

                                                               <li className="weight-500 col-md-6">
                                                                    <h4 className="text-blue h5 mb-20">Update Profil</h4>
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
                                                                        <input className="btn btn-primary" onClick={(e) => UpdateInformation(e)} defaultValue="Save & Update Profil" />
                                                                    </div>
                                                                </li>                                      

                                                               {/*  */}


                                                                <li className="weight-500 col-md-6">
                                                                    <h4 className="text-blue h5 mb-20"><i class="icon-copy fi-credit-card"></i> Payement </h4>
                                                                    <div className="form-group">
                                                                        <label>Adress</label>
                                                                        <input name="adresse" onChange={handlePayementInput} value={payementInput.adresse} className="form-control form-control-lg" type="text" placeholder="Your adress" />
                                                                    </div>
                                                                    <p class="text-danger">{errorlist.adresse}</p>
                                                                    <div className="form-group">
                                                                        <label>date</label>
                                                                        <input name="date" onChange={handlePayementInput} value={payementInput.date} className="form-control form-control-lg" type="datetime-local" />
                                                                    </div>
                                                                    <p class="text-danger">{errorlist.date}</p>
                                                                    <div className="form-group">
                                                                        <label>Code</label>
                                                                        <input name="code" onChange={handlePayementInput} value={payementInput.code} className="form-control form-control-lg" type="password" placeholder="Your payment code" />
                                                                    </div>
                                                                    <p class="text-danger">{errorlist.code}</p>

                                                                    <div className="form-group">
                                                                        <label>number of Queues</label>
                                                                        <div className="input-group">
                                                                            <button type="button" onClick={() => handleDecrement()} className="btn btn-primary">-</button>
                                                                            <div className="form-control text-center">{count}</div>
                                                                            <button type="button" onClick={() => handleIncrement()} className="btn btn-primary">+</button>
                                                                        </div>
                                                                    </div>
                                                                    <p class="text-danger">{errorlist.nb_services}</p>


                                                                    <div className="form-group">
                                                                        <label class="text-danger">Total: {calculateTotal()} dt / {totalInEuro}  $</label>
                                                                    </div>





                                                                    <div className="form-group mb-0">
                                                                        {navigator.onLine ? (
                                                                            <button type="button" className="btn btn-primary" defaultValue="Update Information" onClick={(e) => payer(e, 'Code')}>Submit payment</button>
                                                                        ) : (
                                                                            <button type="button" className="btn btn-secondary" disabled>Code payment (check connexion)</button>
                                                                        )}
                                                                    </div>

                                                                    <br></br>
                                                                    <div className="form-group mb-0">
                                                                        {navigator.onLine ? (
                                                                            count === 0 ? (
                                                                                <button type="button" className="btn btn-warning" onClick={() => swal("You must pick your numbers of queues before you pay", "", "warning")}><i class="icon-copy fi-paypal"></i> Paypal payment  </button>
                                                                            ) : (
                                                                                <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#exampleModal"><i class="icon-copy fi-paypal"></i> Paypal payment  </button>
                                                                            )
                                                                        ) : (
                                                                            <button type="button" className="btn btn-secondary" disabled><i class="icon-copy fi-paypal"></i> Paypal payment (check connexion) </button>
                                                                        )}
                                                                    </div>


                                                                    {/* <div className="form-group mb-0">
                                                                        <button type="button" className="btn btn-primary" defaultValue="Update Information" onClick={() => generateCodeInvoice()}>Invoice</button>
                                                                    </div> */}

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
                                                                        <input onClick={(e) => ChangePassword(e)} className="btn btn-primary" defaultValue="Save & Update Password" />
                                                                    </div>
                                                                    <br></br><br></br><br></br><br></br>
                                                                    <p>How to pay : if you wanna pay with code you need to fill the field adess date code and number of services  </p>
                                                                    <p>if you wanna pay with paypal you need only to choose the numbers of services </p>
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

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Paypal</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <PayPalScriptProvider options={{ "client-id": "AepwlIa_rb0xBVizJsvcyNT8qg3Zomea-b9pRoSqGDj_dP20JR4jnK60YHU7vciCPvgLOl4D5zx8c4-Z" }}>
                                <PayPalButtons
                                    forceReRender={[count, totalInEuro]}
                                    createOrder={(data, actions) => {
                                        console.log("count")
                                        console.log(count);
                                        console.log(totalInEuro);
                                        //var amount = totalInEuro;
                                        return actions.order
                                            .create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            //currency_code: currency,
                                                            value: totalInEuro, // Use count and set a default value if count is 0
                                                        },
                                                    },
                                                ],
                                            })
                                    }}
                                    onApprove={function (data, actions) {
                                        return actions.order.capture().then(function (details) {
                                            // Your code here after capture the order
                                            console.log(details);
                                            console.log('nmureo de transaction');
                                            console.log(details.id);
                                           // setnumeroTransaction(details.id);

                                            console.log('address_line_1');
                                            console.log(details.purchase_units[0].shipping.address.address_line_1);
                                            //setadreesLine(details.purchase_units[0].shipping.address.address_line_1);

                                            console.log('admin area 2');
                                            console.log(details.purchase_units[0].shipping.address.admin_area_2);
                                            //setadminArea(details.purchase_units[0].shipping.address.admin_area_2);

                                            console.log('date');
                                            console.log(details.create_time);
                                            //setcreateDateTime(details.create_time);

                                            console.log('currentCount');
                                            console.log(currentCount);
                                            //5)51wE=q
                                            const formData = new FormData();
                                            formData.append('user_id', currentuser.id);
                                            formData.append('adresse', details.payer.address.country_code);
                                            formData.append('date', '2023-05-08 10:50:39');

                                            const code = generateRandomNumbers(12);
                                            formData.append('code', code);
                                            formData.append('payement_id', details.id);
                                            formData.append('payement_mode', 'Paypal');
                                            formData.append('money', totalInEuro);
                                            formData.append('nb_services', count);
                                            formData.append('active_plus', 1);
                                            axios.get('/sanctum/csrf-cookie').then(response => {
                                                axios.post(`/api/payer`, formData, {
                                                    headers: {
                                                        "Content-Type": "multipart/form-data",
                                                    },
                                                }).then(res => {
                                                    if (res.data.status === 200) {
                                                        //var myModal = new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
                                                        //myModal.show()
                                                        generateCodeInvoice(details.create_time,details.id,details.purchase_units[0].shipping.address.address_line_1,details.purchase_units[0].shipping.address.admin_area_2);
                                                        swal("Succes", res.data.message, "success");
                                                    }
                                                    else {
                                                        swal("Probleme", "", "error");
                                                        //setError(res.data.errors);
                                                    }
                                                });
                                            });
                                        });
                                    }}
                                />
                            </PayPalScriptProvider>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel payment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );

}

export default ProfilAdmin;