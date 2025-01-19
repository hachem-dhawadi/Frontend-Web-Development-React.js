import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../../../layouts/superadmin/Footer";
import LeftSidebar from "../../../layouts/superadmin/LeftSidebar";
import Navbar from "../../../layouts/superadmin/Navbar";
import Geolocation from 'geolocation';

function EditService(props) {

    const navigate = useNavigate();
    const [userlist, setUserlist] = useState([]);//categorylist
    const [categorylist, setCategorylist] = useState([]);//categorylist
    const [errorlist, setError] = useState([]);
    const { id } = useParams();
    const[loading,setLoading] =useState(true);

    const [serviceInput, setService] = useState({
        category_id: '',
        user_id:'',
        name: '',
        location: '',
        adresse: '',
        description: '',
    });

    const [picture, setPicture] = useState([]);
    const [allcheckbox, setCheckboxes] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setService({ ...serviceInput, [e.target.name]: e.target.value });
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
    const handleButtonClick = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const formattedLocation = `${latitude},${longitude}`;
            const url = `https://www.google.com/maps?q=${formattedLocation}`;
            window.open(url, '_blank');
          }, (error) => {
            console.error('Error retrieving current position:', error);
          });
        } else {
          console.error('Geolocation is not supported by your browser.');
        }
      };

    useEffect(() => {

        document.title = "Edit Service";

        
        axios.get(`/api/allcategories`).then(res => {
            if (res.data.status === 200) {
                setCategorylist(res.data.categories);
                console.log(res.data.categories);
            }

        });
        axios.get(`/api/allusers`).then(res => {
            if (res.data.status === 200) {
                setUserlist(res.data.users);
            }
        });

        axios.get('/sanctum/csrf-cookie').then(response => {
            
        //const service_id = props.match.params.id
        axios.get(`/api/edit-service/${id}`).then(res=>{
            if(res.data.status === 200)
            {
              //console.log(res.data.service);
              setService(res.data.service);
              setCheckboxes(res.data.service);
            }
            else if(res.data.status === 404)
            {   
                swal("Error",res.data.message,"error");
                //navigate('/servicenotfound');
            }
            setLoading(false);
        });
      });
    }, []);

    const updateService  = (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('image',picture.image );
        formData.append('category_id', serviceInput.category_id);
        formData.append('user_id',serviceInput.user_id );
        formData.append('name',serviceInput.name );
        formData.append('location', serviceInput.location);
        formData.append('adresse',serviceInput.adresse );
        formData.append('description',serviceInput.description );
        formData.append('active',allcheckbox.active ? '1':'0');

        axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(`/api/update-service/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then(res=>{
            if(res.data.status === 200)
            {   
                //console.log(allcheckbox);
                swal("Succes",res.data.message,"success");
                setError([]);
                navigate('/viewservices');
            }
            else if(res.data.status === 422)
            {
                swal("All Fields are mendentory","","error");
                setError(res.data.errors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
            }
        });
    });
    }

    if(loading)
    {
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
                                            <li className="breadcrumb-item active" aria-current="page">Edit service</li>
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
                                    <h4 className="text-blue h4">Edit Service</h4>
                                </div>
                            </div>
                            <form onSubmit={updateService}>
                                <br />
                                <div class="form-group row">
                                    <label class="col-sm-12 col-md-2 col-form-label">Select Categotry to the service</label>
                                    <div class="col-sm-12 col-md-10">
                                        <select name="category_id" onChange={handleInput} value={serviceInput.category_id} class="custom-select col-12">
                                            <option>Choose...</option>
                                            {categorylist.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-12 col-md-2 col-form-label">Select User to  service</label>
                                    <div class="col-sm-12 col-md-10">
                                        <select name="user_id" onChange={handleInput} value={serviceInput.user_id} class="custom-select col-12">
                                            <option>Choose...</option>
                                            {userlist.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-12 col-md-2 col-form-label">Select Location to  service</label>
                                    <div class="col-sm-12 col-md-10">
                                    <select name="location" className="custom-select col-12" title="Select role" value={serviceInput.location} onChange={handleLocationChange}>
                                        <option selected="">Located in.......</option>
                                        <option value="Ariana">Ariana</option>
                                        <option value="Béja">Béja</option>
                                        <option value="Ben Arous">Ben Arous</option>
                                        <option value="Bizerte">Bizerte</option>
                                        <option value="Gabès">Gabès</option>
                                        <option value="Gafsa">Gafsa</option>
                                        <option value="Jendouba">Jendouba</option>
                                        <option value="Kairouan">Kairouan</option>
                                        <option value="Kasserine">Kasserine</option>
                                        <option value="Kébili">Kébili</option>
                                        <option value="Kef">Kef</option>
                                        <option value="Mahdia">Mahdia</option>
                                        <option value="Manouba">Manouba</option>
                                        <option value="Médenine">Médenine</option>
                                        <option value="Monastir">Monastir</option>
                                        <option value="Nabeul">Nabeul</option>
                                        <option value="Sfax">Sfax</option>
                                        <option value="Sidi Bouzid">Sidi Bouzid</option>
                                        <option value="Siliana">Siliana</option>
                                        <option value="Sousse">Sousse</option>
                                        <option value="Tataouine">Tataouine</option>
                                        <option value="Tozeur">Tozeur</option>
                                        <option value="Tunis">Tunis</option>
                                        <option value="Zaghouan">Zaghouan</option>
                                    </select>
                                    </div>
                                </div>

        

                                <div className="form-group">
                                    <label>Service name</label>
                                    <input name="name" onChange={handleInput} value={serviceInput.name} className="form-control" type="text" placeholder="Service medical,Sportif....." />
                                </div>
                                <p class="text-danger">{errorlist.name}</p>

   

                                <div className="form-group">
                                    <label>Service adresse</label>
                                    <input name="adresse" onChange={handleInput} value={serviceInput.adresse} className="form-control" type="text" placeholder="Avenue de Paris Tunis Tunisia....." />
                                    <Link onClick={ ()=>handleButtonClick()}>
                                    <i className="icon-copy dw dw-pin-1" />
                                    You can use GoogleMap to set a correct location for the service
                                </Link>
                                </div>
                                <p class="text-danger">{errorlist.adresse}</p>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={serviceInput.description} className="form-control" placeholder="Enter Details..."/>
                                </div>
                                <p class="text-danger">{errorlist.description}</p>

                                <div className="form-group">
                                    <label >Service image</label>
                                    <div className="custom-file">
                                    <img src={`http://localhost:8000/${serviceInput.image}`} width={70} height={70}/>
                                        <div className="form-control selectpicker">
                                            <input type="file" name="image" onChange={handleImage}  ClassName="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <br/>
                                <p class="text-danger">{errorlist.image}</p>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <label className="weight-600">Service status</label>
                                            <div className="custom-control custom-checkbox mb-5">
                                                <input name="active" onChange={handleCheckbox} defaultChecked={allcheckbox.active === 1 ? true:false} type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">Activate Service</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                            
                                <button type="submit" class="btn btn-primary btn-block btn-lg">Submit</button>
                            </form>

                        </div>
                        {/* horizontal Basic Forms End */}
                    </div>

                    <Footer />
                </div>
            </div>
        </div>



    );
}

export default EditService;